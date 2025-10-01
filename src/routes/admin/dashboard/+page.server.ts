import type { PageServerLoad } from "./$types";
import templateConfig from "../../../../template.config.json";

const API_BASE_URL = templateConfig.api?.baseUrl || "";

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get("admin_token");

  if (token) {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
