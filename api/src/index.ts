import { createErrorResponse } from "./middleware/auth";
import type { Env } from "./types";

import { handleGetProfile, handleLogin } from "./routes/auth";
import {
  handleCreatePost,
  handleDeletePost,
  handleGetAllPosts,
  handleGetPost,
  handleGetPosts,
  handleUpdatePost,
} from "./routes/posts";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const { method } = request;

    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    try {
      if (pathname === "/" || pathname === "/health") {
        return new Response(
          JSON.stringify({
            success: true,
            message: "Portfolio Blog API is running",
            timestamp: new Date().toISOString(),
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      if (pathname === "/auth/login" && method === "POST") {
        return await handleLogin(request, env);
      }

      if (pathname === "/auth/profile" && method === "GET") {
        return await handleGetProfile(request, env);
      }

      if (pathname === "/posts/admin" && method === "GET") {
        return await handleGetAllPosts(request, env);
      }

      if (pathname === "/posts") {
        switch (method) {
          case "GET":
            return await handleGetPosts(request, env);
          case "POST":
            return await handleCreatePost(request, env);
          default:
            return createErrorResponse("Method not allowed", 405);
        }
      }

      const postMatch = pathname.match(/^\/posts\/(.+)$/);
      if (postMatch) {
        const param = postMatch[1];

        if (/^\d+$/.test(param)) {
          switch (method) {
            case "PUT":
              return await handleUpdatePost(request, env, param);
            case "DELETE":
              return await handleDeletePost(request, env, param);
            default:
              return createErrorResponse("Method not allowed", 405);
          }
        } else {
          if (method === "GET") {
            return await handleGetPost(request, env, param);
          } else {
            return createErrorResponse("Method not allowed", 405);
          }
        }
      }

      if (pathname.startsWith("/posts/") && pathname.includes("/comments")) {
        return createErrorResponse("Comments feature coming soon", 501);
      }

      if (pathname === "/upload" && method === "POST") {
        return createErrorResponse("File upload feature coming soon", 501);
      }

      return createErrorResponse("Route not found", 404);
    } catch (error) {
      console.error("Worker error:", error);
      return createErrorResponse("Internal server error", 500);
    }
  },
};

export async function scheduled(
  event: ScheduledEvent,
  _env: Env,
): Promise<void> {
  try {
    console.log("Running scheduled cleanup task:", event.scheduledTime);
    void _env;
  } catch (error) {
    console.error("Scheduled task error:", error);
  }
}
