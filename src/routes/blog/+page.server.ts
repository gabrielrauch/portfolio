import { blogAPI } from "$lib/api/blog";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  try {
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = 12;

    const response = await blogAPI.getPosts(page, limit);

    return {
      posts: response.data,
      pagination: response.pagination,
      currentPage: page,
    };
  } catch (error) {
    console.error("Failed to load blog posts:", error);

    return {
      posts: [],
      pagination: {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
      },
      currentPage: 1,
      error: "Failed to load blog posts. Please try again later.",
    };
  }
};
