import type { Env, RequestContext, User } from "../types";
import { extractTokenFromHeader, verifyToken } from "../utils/jwt";

export async function authenticateUser(
  request: Request,
  env: Env,
): Promise<RequestContext> {
  const authHeader = request.headers.get("Authorization");
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    return {};
  }

  const decoded = await verifyToken(token, env.JWT_SECRET);
  if (!decoded) {
    return {};
  }

  try {
    const stmt = env.DB.prepare(
      "SELECT * FROM users WHERE id = ? AND email = ?",
    );
    const user = await stmt.bind(decoded.userId, decoded.email).first<User>();

    if (!user) {
      return {};
    }

    return { user };
  } catch (error) {
    console.error("Database error during authentication:", error);
    return {};
  }
}

export function requireAuth(context: RequestContext): User {
  if (!context.user) {
    throw new Error("Authentication required");
  }
  return context.user;
}

export function requireAdmin(context: RequestContext): User {
  const user = requireAuth(context);
  if (user.role !== "admin") {
    throw new Error("Admin privileges required");
  }
  return user;
}

export function createResponse(
  data: unknown,
  status: number = 200,
  headers: HeadersInit = {},
): Response {
  const defaultHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    ...headers,
  };

  return new Response(JSON.stringify(data), {
    status,
    headers: defaultHeaders,
  });
}

export function createErrorResponse(
  message: string,
  status: number = 400,
  headers: HeadersInit = {},
): Response {
  return createResponse(
    {
      success: false,
      error: message,
    },
    status,
    headers,
  );
}
