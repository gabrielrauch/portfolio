export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: "admin" | "user";
  created_at: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  author_id: number;
  published_at?: string;
  updated_at: string;
  created_at: string;
  status: "draft" | "published" | "archived";
}

export interface PostWithAuthor extends Post {
  author_name: string;
  author_email: string;
}

export interface Comment {
  id: number;
  post_id: number;
  author_name: string;
  author_email?: string;
  content: string;
  created_at: string;
  is_approved: boolean;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  status?: "draft" | "published";
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  excerpt?: string;
  featured_image?: string;
  status?: "draft" | "published" | "archived";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
  iss?: string;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Env {
  DB: D1Database;
  STORAGE?: R2Bucket;
  CACHE: KVNamespace;
  JWT_SECRET: string;
  ENVIRONMENT: string;
  BCRYPT_ROUNDS: string;
}

export interface RequestContext {
  user?: User;
  params?: Record<string, string>;
}
