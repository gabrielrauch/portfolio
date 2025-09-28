import { blogAPI } from "$lib/api/blog";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  try {
    const { slug } = params;
    const response = await blogAPI.getPost(slug);

    if (!response.success || !response.data) {
      throw error(404, "Post not found");
    }

    return {
      post: response.data,
    };
  } catch (err) {
    console.error("Failed to load blog post:", err);

    if (
      err &&
      typeof err === "object" &&
      "status" in err &&
      err.status === 404
    ) {
      throw error(404, "Post not found");
    }

    throw error(500, "Failed to load blog post");
  }
};
