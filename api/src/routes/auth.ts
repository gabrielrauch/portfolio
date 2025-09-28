import { createErrorResponse, createResponse } from "../middleware/auth";
import type { Env, LoginRequest, User } from "../types";
import { isValidEmail, sanitizeInput } from "../utils/helpers";
import { generateToken } from "../utils/jwt";
import { comparePassword } from "../utils/password";

export async function handleLogin(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    const body = (await request.json()) as LoginRequest;
    const { email, password } = body;

    if (!email || !password) {
      return createErrorResponse("Email and password are required", 400);
    }

    if (!isValidEmail(email)) {
      return createErrorResponse("Invalid email format", 400);
    }

    const sanitizedEmail = sanitizeInput(email);

    const stmt = env.DB.prepare("SELECT * FROM users WHERE email = ?");
    const user = await stmt.bind(sanitizedEmail).first<User>();

    if (!user) {
      return createErrorResponse("Invalid credentials", 401);
    }

    const isValidPassword = await comparePassword(password, user.password_hash);
    if (!isValidPassword) {
      return createErrorResponse("Invalid credentials", 401);
    }

    const token = await generateToken(user, env.JWT_SECRET);

    return createResponse({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return createErrorResponse("Internal server error", 500);
  }
}

export async function handleGetProfile(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    const { authenticateUser } = await import("../middleware/auth");
    const context = await authenticateUser(request, env);

    if (!context.user) {
      return createErrorResponse("Authentication required", 401);
    }

    const { password_hash: _unused, ...userProfile } = context.user;
    void _unused;

    return createResponse({
      success: true,
      data: userProfile,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return createErrorResponse("Internal server error", 500);
  }
}
