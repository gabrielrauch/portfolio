import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get("admin_token");

  if (token) {
    try {
      const response = await fetch(
        "https://portfolio-blog-api.gabrielrauchdev.workers.dev/posts/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();

        return {
          posts: data.data || [],
          user: JSON.parse(cookies.get("admin_user") || "{}"),
          hasToken: true,
        };
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  }

  return {
    posts: [],
    user: {},
    hasToken: false,
    error: "Authentication required",
  };
};
