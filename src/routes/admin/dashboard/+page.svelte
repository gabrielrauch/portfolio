<script lang="ts">
  import { goto } from "$app/navigation";
  import { calculateReadTime } from "$lib/utils/blog";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  let { data }: { data: PageData } = $props();

  const API_BASE_URL = "https://portfolio-blog-api.gabrielrauchdev.workers.dev";

  let showCreateModal = $state(false);
  let newPost = $state({
    title: "",
    content: "",
    excerpt: "",
    status: "draft" as "draft" | "published",
  });

  let posts = $state(data.posts || []);
  let user = $state(data.user || {});
  let loading = $state(false);
  let error = $state(data.error || "");

  onMount(() => {
    const token = localStorage.getItem("admin_token");

    if (
      !token ||
      token === "[object Object]" ||
      token === "null" ||
      token === "undefined"
    ) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      document.cookie = "admin_token=; path=/; max-age=0";
      document.cookie = "admin_user=; path=/; max-age=0";
      goto("/admin");
      return;
    }

    const userStr = localStorage.getItem("admin_user");
    if (userStr) {
      user = JSON.parse(userStr);
    }

    if (!data.hasToken) {
      loadPosts();
    }
  });

  async function loadPosts() {
    loading = true;
    error = "";

    try {
      const token = localStorage.getItem("admin_token");
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/posts/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        posts = data.data || [];
      } else {
        error = "Failed to load posts";
      }
    } catch {
      error = "Failed to load posts";
    } finally {
      loading = false;
    }
  }
  function logout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    goto("/admin");
  }

  async function createPost() {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        showCreateModal = false;
        newPost = { title: "", content: "", excerpt: "", status: "draft" };
        await loadPosts();
      } else {
        alert("Failed to create post");
      }
    } catch {
      alert("Error creating post");
    }
  }

  async function deletePost(postId: number) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const token = localStorage.getItem("admin_token");
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await loadPosts();
      } else {
        alert("Failed to delete post");
      }
    } catch {
      alert("Error deleting post");
    }
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "published":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "draft":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "archived":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  }
</script>

<svelte:head>
  <title>Admin Dashboard - Portfolio Blog</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="min-h-screen bg-background">
  <header class="border-b border-border bg-card/50 backdrop-blur">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-foreground">
            <span class="font-mono text-primary">~/</span>admin/dashboard
          </h1>
          <p class="text-sm text-muted-foreground">
            Welcome back, {user?.name || "Admin"}
          </p>
        </div>

        <div class="flex items-center gap-4">
          <a
            href="/"
            class="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
          >
            View Site
          </a>
          <button
            onclick={() => (showCreateModal = true)}
            class="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            New Post
          </button>
          <button
            onclick={logout}
            class="px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>

  <div class="container mx-auto px-4 py-8">
    {#if error}
      <div class="p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-6">
        <p class="text-red-400">{error}</p>
      </div>
    {/if}

    {#if loading}
      <div class="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-6">
        <p class="text-blue-400">Loading dashboard...</p>
      </div>
    {/if}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="glass border border-border rounded-lg p-6">
        <h3 class="text-lg font-semibold text-foreground mb-2">Total Posts</h3>
        <p class="text-3xl font-bold text-primary">{posts?.length || 0}</p>
      </div>

      <div class="glass border border-border rounded-lg p-6">
        <h3 class="text-lg font-semibold text-foreground mb-2">Published</h3>
        <p class="text-3xl font-bold text-green-400">
          {posts?.filter((p: { status: string }) => p.status === "published")
            .length || 0}
        </p>
      </div>

      <div class="glass border border-border rounded-lg p-6">
        <h3 class="text-lg font-semibold text-foreground mb-2">Drafts</h3>
        <p class="text-3xl font-bold text-yellow-400">
          {posts?.filter((p: { status: string }) => p.status === "draft")
            .length || 0}
        </p>
      </div>
    </div>

    <div class="glass border border-border rounded-lg overflow-hidden">
      <div class="p-6 border-b border-border">
        <h2 class="text-xl font-semibold text-foreground">All Posts</h2>
        <p class="text-sm text-muted-foreground mt-1">Manage your blog posts</p>
      </div>

      {#if !posts || posts.length === 0}
        <div class="p-8 text-center">
          <div class="text-6xl mb-4">📝</div>
          <h3 class="text-lg font-medium text-foreground mb-2">No posts yet</h3>
          <p class="text-muted-foreground mb-4">
            Create your first blog post to get started.
          </p>
          <button
            onclick={() => (showCreateModal = true)}
            class="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Create First Post
          </button>
        </div>
      {:else}
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-muted/50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-sm font-medium text-foreground"
                  >Title</th
                >
                <th
                  class="px-6 py-3 text-left text-sm font-medium text-foreground"
                  >Status</th
                >
                <th
                  class="px-6 py-3 text-left text-sm font-medium text-foreground"
                  >Created</th
                >
                <th
                  class="px-6 py-3 text-left text-sm font-medium text-foreground"
                  >Updated</th
                >
                <th
                  class="px-6 py-3 text-left text-sm font-medium text-foreground"
                  >Read Time</th
                >
                <th
                  class="px-6 py-3 text-right text-sm font-medium text-foreground"
                  >Actions</th
                >
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              {#each posts as post (post.id)}
                <tr class="hover:bg-muted/30 transition-colors">
                  <td class="px-6 py-4">
                    <div>
                      <div class="font-medium text-foreground">
                        {post.title}
                      </div>
                      {#if post.excerpt}
                        <div
                          class="text-sm text-muted-foreground truncate max-w-xs"
                        >
                          {post.excerpt}
                        </div>
                      {/if}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border {getStatusBadge(
                        post.status
                      )}"
                    >
                      {post.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-muted-foreground">
                    {formatDate(post.created_at)}
                  </td>
                  <td class="px-6 py-4 text-sm text-muted-foreground">
                    {formatDate(post.updated_at)}
                  </td>
                  <td class="px-6 py-4 text-sm text-muted-foreground">
                    {calculateReadTime(post.content || "")}
                  </td>
                  <td class="px-6 py-4 text-right space-x-2">
                    {#if post.status === "published"}
                      <a
                        href="/blog/{post.slug}"
                        target="_blank"
                        class="inline-flex items-center px-3 py-1 text-xs border border-border rounded hover:bg-muted transition-colors"
                      >
                        View
                      </a>
                    {/if}
                    <button
                      class="inline-flex items-center px-3 py-1 text-xs border border-border rounded hover:bg-muted transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onclick={() => deletePost(post.id)}
                      class="inline-flex items-center px-3 py-1 text-xs text-red-400 border border-red-500/30 rounded hover:bg-red-500/10 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </div>
</main>

{#if showCreateModal}
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
  >
    <div
      class="bg-gray-100 border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
    >
      <div class="p-6 border-b border-border">
        <h3 class="text-lg font-semibold text-foreground">Create New Post</h3>
      </div>

      <div class="p-6 space-y-4">
        <div>
          <label for="new-post-title" class="block text-sm font-medium text-foreground mb-2"
            >Title</label
          >
          <input
            id="new-post-title"
            type="text"
            bind:value={newPost.title}
            class="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter post title..."
          />
        </div>

        <div>
          <label for="new-post-excerpt" class="block text-sm font-medium text-foreground mb-2"
            >Excerpt (Optional)</label
          >
          <textarea
            id="new-post-excerpt"
            bind:value={newPost.excerpt}
            rows="3"
            class="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Brief description of the post..."
          ></textarea>
        </div>

        <div>
          <label for="new-post-content" class="block text-sm font-medium text-foreground mb-2"
            >Content (Markdown)</label
          >
          <textarea
            id="new-post-content"
            bind:value={newPost.content}
            rows="12"
            class="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
            placeholder="Write your post content in Markdown...

# Example Heading
This is a paragraph with **bold** and *italic* text.

## Code Example
```javascript
console.log('Hello, world!');
```"
          ></textarea>
        </div>

        <div>
          <label for="new-post-status" class="block text-sm font-medium text-foreground mb-2"
            >Status</label
          >
          <select
            id="new-post-status"
            bind:value={newPost.status}
            class="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div class="p-6 border-t border-border flex justify-end gap-3">
        <button
          onclick={() => (showCreateModal = false)}
          class="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
        >
          Cancel
        </button>
        <button
          onclick={createPost}
          disabled={!newPost.title || !newPost.content}
          class="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Post
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .glass {
    background: rgba(var(--card), 0.8);
    backdrop-filter: blur(10px);
  }
</style>
