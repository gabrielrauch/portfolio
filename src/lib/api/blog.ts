const API_BASE_URL = "https://portfolio-blog-api.gabrielrauchdev.workers.dev";

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featured_image?: string;
  published_at: string;
  updated_at: string;
  created_at: string;
  author_name: string;
  author_email: string;
}

export interface BlogPostsResponse {
  success: boolean;
  data: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BlogPostResponse {
  success: boolean;
  data: BlogPost;
}

class BlogAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getPosts(
    page: number = 1,
    limit: number = 10,
  ): Promise<BlogPostsResponse> {
    return this.request<BlogPostsResponse>(
      `/posts?page=${page}&limit=${limit}`,
    );
  }

  async getPost(slug: string): Promise<BlogPostResponse> {
    return this.request<BlogPostResponse>(`/posts/${slug}`);
  }

  async createPost(
    post: {
      title: string;
      content: string;
      excerpt?: string;
      featured_image?: string;
      status?: "draft" | "published";
    },
    token: string,
  ): Promise<{
    success: boolean;
    data: { id: number; slug: string; message: string };
  }> {
    return this.request("/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
  }

  async updatePost(
    id: number,
    post: {
      title?: string;
      content?: string;
      excerpt?: string;
      featured_image?: string;
      status?: "draft" | "published" | "archived";
    },
    token: string,
  ): Promise<{ success: boolean; message: string }> {
    return this.request(`/posts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
  }

  async deletePost(
    id: number,
    token: string,
  ): Promise<{ success: boolean; message: string }> {
    return this.request(`/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async login(
    email: string,
    password: string,
  ): Promise<{
    success: boolean;
    data: {
      token: string;
      user: {
        id: number;
        name: string;
        email: string;
        role: string;
      };
    };
  }> {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }
}

export const blogAPI = new BlogAPI();
