import jwt from "@tsndr/cloudflare-worker-jwt";
import type { JWTPayload, User } from "../types";

export async function generateToken(
  user: User,
  secret: string,
): Promise<string> {
  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    iss: "portfolio-blog-api",
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
  };

  return await jwt.sign(payload, secret);
}

export async function verifyToken(
  token: string,
  secret: string,
): Promise<JWTPayload | null> {
  try {
    const decoded = (await jwt.verify(token, secret)) as unknown as {
      header: object;
      payload: JWTPayload;
    };

    if (!decoded || !decoded.payload) {
      return null;
    }

    const payload = decoded.payload as JWTPayload;

    if (payload.iss && payload.iss !== "portfolio-blog-api") {
      return null;
    }

    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export function extractTokenFromHeader(
  authHeader: string | null,
): string | null {
  if (!authHeader) return null;

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return null;
  }

  return parts[1];
}
