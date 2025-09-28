export interface DashboardPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  status: "draft" | "published" | "archived";
  author_id: number;
  author_name: string;
  author_email: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor";
}

export interface DashboardData {
  posts: DashboardPost[];
  user: DashboardUser;
  error?: string;
}
