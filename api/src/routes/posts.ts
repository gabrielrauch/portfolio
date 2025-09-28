import {
  authenticateUser,
  createErrorResponse,
  createResponse,
  requireAdmin,
} from "../middleware/auth";
import type {
  CreatePostRequest,
  Env,
  Post,
  PostWithAuthor,
  UpdatePostRequest,
} from "../types";
import {
  extractExcerpt,
  formatDate,
  generateSlug,
  getCacheKey,
  validatePagination,
} from "../utils/helpers";

export async function handleGetPosts(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    const url = new URL(request.url);
    const { page, limit, offset } = validatePagination(
      url.searchParams.get("page") || undefined,
      url.searchParams.get("limit") || undefined,
    );

    const cacheKey = getCacheKey("posts", `page_${page}_limit_${limit}`);
    const cached = await env.CACHE.get(cacheKey);

    if (cached) {
      return createResponse(JSON.parse(cached));
    }

    const postsStmt = env.DB.prepare(`
      SELECT
        p.id, p.title, p.slug, p.excerpt, p.featured_image,
        p.published_at, p.updated_at, p.created_at,
        u.name as author_name, u.email as author_email
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.status = 'published' AND p.published_at IS NOT NULL
      ORDER BY p.published_at DESC
      LIMIT ? OFFSET ?
    `);

    const posts = await postsStmt.bind(limit, offset).all<PostWithAuthor>();

    const countStmt = env.DB.prepare(`
      SELECT COUNT(*) as total
      FROM posts
      WHERE status = 'published' AND published_at IS NOT NULL
    `);
    const countResult = await countStmt.first<{ total: number }>();
    const total = countResult?.total || 0;

    const response = {
      success: true,
      data: posts.results || [],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    await env.CACHE.put(cacheKey, JSON.stringify(response), {
      expirationTtl: 300,
    });

    return createResponse(response);
  } catch (error) {
    console.error("Get posts error:", error);
    return createErrorResponse("Internal server error", 500);
  }
}

export async function handleGetPost(
  request: Request,
  env: Env,
  slug: string,
): Promise<Response> {
  try {
    const cacheKey = getCacheKey("post", slug);
    const cached = await env.CACHE.get(cacheKey);

    if (cached) {
      return createResponse(JSON.parse(cached));
    }

    const stmt = env.DB.prepare(`
      SELECT
        p.id, p.title, p.slug, p.content, p.excerpt, p.featured_image,
        p.published_at, p.updated_at, p.created_at,
        u.name as author_name, u.email as author_email
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.slug = ? AND p.status = 'published' AND p.published_at IS NOT NULL
    `);

    const post = await stmt.bind(slug).first<PostWithAuthor>();

    if (!post) {
      return createErrorResponse("Post not found", 404);
    }

    const response = {
      success: true,
      data: post,
    };

    await env.CACHE.put(cacheKey, JSON.stringify(response), {
      expirationTtl: 600,
    });

    return createResponse(response);
  } catch (error) {
    console.error("Get post error:", error);
    return createErrorResponse("Internal server error", 500);
  }
}

export async function handleCreatePost(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    const context = await authenticateUser(request, env);
    const user = requireAdmin(context);

    const body = (await request.json()) as CreatePostRequest;
    const { title, content, excerpt, featured_image, status = "draft" } = body;

    if (!title || !content) {
      return createErrorResponse("Title and content are required", 400);
    }

    const slug = generateSlug(title);
    const finalExcerpt = excerpt || extractExcerpt(content);
    const published_at = status === "published" ? formatDate(new Date()) : null;

    const existingPost = await env.DB.prepare(
      "SELECT id FROM posts WHERE slug = ?",
    )
      .bind(slug)
      .first();

    if (existingPost) {
      return createErrorResponse("A post with this title already exists", 409);
    }

    const stmt = env.DB.prepare(`
      INSERT INTO posts (title, slug, content, excerpt, featured_image, author_id, published_at, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = await stmt
      .bind(
        title,
        slug,
        content,
        finalExcerpt,
        featured_image || null,
        user.id,
        published_at,
        status,
      )
      .run();

    if (!result.success) {
      return createErrorResponse("Failed to create post", 500);
    }

    await env.CACHE.delete(getCacheKey("posts", "page_1_limit_10"));

    return createResponse(
      {
        success: true,
        data: {
          id: result.meta.last_row_id,
          slug,
          message: "Post created successfully",
        },
      },
      201,
    );
  } catch (error) {
    console.error("Create post error:", error);
    if (error instanceof Error && error.message.includes("required")) {
      return createErrorResponse(error.message, 401);
    }
    return createErrorResponse("Internal server error", 500);
  }
}

export async function handleUpdatePost(
  request: Request,
  env: Env,
  id: string,
): Promise<Response> {
  try {
    const context = await authenticateUser(request, env);
    requireAdmin(context);

    const postId = parseInt(id, 10);
    if (isNaN(postId)) {
      return createErrorResponse("Invalid post ID", 400);
    }

    const body = (await request.json()) as UpdatePostRequest;
    const { title, content, excerpt, featured_image, status } = body;

    const existingPost = await env.DB.prepare(
      "SELECT * FROM posts WHERE id = ?",
    )
      .bind(postId)
      .first<Post>();

    if (!existingPost) {
      return createErrorResponse("Post not found", 404);
    }

    const updates: string[] = [];
    const values: unknown[] = [];

    if (title !== undefined) {
      const newSlug = generateSlug(title);
      if (newSlug !== existingPost.slug) {
        const conflictingPost = await env.DB.prepare(
          "SELECT id FROM posts WHERE slug = ? AND id != ?",
        )
          .bind(newSlug, postId)
          .first();

        if (conflictingPost) {
          return createErrorResponse(
            "A post with this title already exists",
            409,
          );
        }

        updates.push("slug = ?");
        values.push(newSlug);
      }
      updates.push("title = ?");
      values.push(title);
    }

    if (content !== undefined) {
      updates.push("content = ?");
      values.push(content);

      if (excerpt === undefined) {
        updates.push("excerpt = ?");
        values.push(extractExcerpt(content));
      }
    }

    if (excerpt !== undefined) {
      updates.push("excerpt = ?");
      values.push(excerpt);
    }

    if (featured_image !== undefined) {
      updates.push("featured_image = ?");
      values.push(featured_image);
    }

    if (status !== undefined) {
      updates.push("status = ?");
      values.push(status);

      if (status === "published" && !existingPost.published_at) {
        updates.push("published_at = ?");
        values.push(formatDate(new Date()));
      } else if (status === "draft") {
        updates.push("published_at = ?");
        values.push(null);
      }
    }

    if (updates.length === 0) {
      return createErrorResponse("No fields to update", 400);
    }

    updates.push("updated_at = ?");
    values.push(formatDate(new Date()));

    const stmt = env.DB.prepare(`
      UPDATE posts
      SET ${updates.join(", ")}
      WHERE id = ?
    `);

    const result = await stmt.bind(...values, postId).run();

    if (!result.success) {
      return createErrorResponse("Failed to update post", 500);
    }

    await env.CACHE.delete(getCacheKey("post", existingPost.slug));
    await env.CACHE.delete(getCacheKey("posts", "page_1_limit_10"));

    return createResponse({
      success: true,
      message: "Post updated successfully",
    });
  } catch (error) {
    console.error("Update post error:", error);
    if (error instanceof Error && error.message.includes("required")) {
      return createErrorResponse(error.message, 401);
    }
    return createErrorResponse("Internal server error", 500);
  }
}

export async function handleDeletePost(
  request: Request,
  env: Env,
  id: string,
): Promise<Response> {
  try {
    const context = await authenticateUser(request, env);
    requireAdmin(context);

    const postId = parseInt(id, 10);
    if (isNaN(postId)) {
      return createErrorResponse("Invalid post ID", 400);
    }

    const existingPost = await env.DB.prepare(
      "SELECT slug FROM posts WHERE id = ?",
    )
      .bind(postId)
      .first<{ slug: string }>();

    if (!existingPost) {
      return createErrorResponse("Post not found", 404);
    }

    const stmt = env.DB.prepare("DELETE FROM posts WHERE id = ?");
    const result = await stmt.bind(postId).run();

    if (!result.success) {
      return createErrorResponse("Failed to delete post", 500);
    }

    await env.CACHE.delete(getCacheKey("post", existingPost.slug));
    await env.CACHE.delete(getCacheKey("posts", "page_1_limit_10"));

    return createResponse({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);
    if (error instanceof Error && error.message.includes("required")) {
      return createErrorResponse(error.message, 401);
    }
    return createErrorResponse("Internal server error", 500);
  }
}

export async function handleGetAllPosts(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    const context = await authenticateUser(request, env);
    requireAdmin(context);

    const url = new URL(request.url);
    const { page, limit, offset } = validatePagination(
      url.searchParams.get("page") || undefined,
      url.searchParams.get("limit") || undefined,
    );

    const postsStmt = env.DB.prepare(`
      SELECT
        p.id, p.title, p.slug, p.excerpt, p.featured_image, p.status,
        p.published_at, p.updated_at, p.created_at,
        u.name as author_name, u.email as author_email
      FROM posts p
      JOIN users u ON p.author_id = u.id
      ORDER BY p.updated_at DESC
      LIMIT ? OFFSET ?
    `);

    const posts = await postsStmt
      .bind(limit, offset)
      .all<PostWithAuthor & { status: string }>();

    const countStmt = env.DB.prepare("SELECT COUNT(*) as total FROM posts");
    const countResult = await countStmt.first<{ total: number }>();
    const total = countResult?.total || 0;

    const response = {
      success: true,
      data: posts.results || [],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    return createResponse(response);
  } catch (error) {
    console.error("Get all posts error:", error);
    if (error instanceof Error && error.message.includes("required")) {
      return createErrorResponse(error.message, 401);
    }
    return createErrorResponse("Internal server error", 500);
  }
}
