<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    calculateReadTime,
    formatRelativeDate,
    truncateExcerpt,
  } from "$lib/utils/blog";
  import type { PageData } from "./$types";

  export let data: PageData;

  function goToPage(page: number) {
    goto(`/blog?page=${page}`);
  }
</script>

<svelte:head>
  <title>Blog - Portfolio</title>
  <meta
    name="description"
    content="Read my latest thoughts, tutorials, and insights about web development, technology, and more."
  />
</svelte:head>

<main class="min-h-screen bg-background">
  <!-- Breadcrumb -->
  <nav class="py-4 border-b border-border">
    <div class="container mx-auto px-4">
      <ol class="flex items-center gap-2 text-sm text-muted-foreground">
        <li>
          <a href="/" class="hover:text-primary transition-colors">home</a>
        </li>
        <li>
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </li>
        <li class="text-foreground font-medium">blog</li>
      </ol>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="py-16 border-b border-border">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-foreground mb-6">
          <span class="font-mono text-primary">~/</span>blog
        </h1>
        <p class="text-xl text-muted-foreground leading-relaxed">
          Welcome to my blog! Here I share my thoughts on web development,
          technology trends, project insights, and lessons learned along the
          way.
        </p>
      </div>
    </div>
  </section>

  <!-- Blog Posts -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      {#if data.error}
        <div class="max-w-2xl mx-auto text-center">
          <div class="text-6xl mb-4">⚠️</div>
          <h2 class="text-2xl font-semibold text-foreground mb-2">
            Oops! Something went wrong
          </h2>
          <p class="text-muted-foreground mb-6">{data.error}</p>
          <button
            onclick={() => window.location.reload()}
            class="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      {:else if data.posts.length === 0}
        <div class="max-w-2xl mx-auto text-center">
          <div class="text-6xl mb-4">📝</div>
          <h2 class="text-2xl font-semibold text-foreground mb-2">
            No posts yet
          </h2>
          <p class="text-muted-foreground mb-6">
            I'm working on some great content. Check back soon for new posts!
          </p>
          <a
            href="/"
            class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M19 12H5m7-7-7 7 7 7" />
            </svg>
            back to home
          </a>
        </div>
      {:else}
        <!-- Posts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {#each data.posts as post (post.slug)}
            <article
              class="group glass border-border hover:border-primary/50 transition-all duration-300 rounded-lg overflow-hidden"
            >
              {#if post.featured_image}
                <div class="aspect-video overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              {/if}

              <div class="p-6">
                <div
                  class="flex items-center gap-2 text-sm text-muted-foreground mb-3"
                >
                  <span class="font-mono">~/blog</span>
                  <span>•</span>
                  <time datetime={post.published_at}>
                    {formatRelativeDate(post.published_at)}
                  </time>
                  <span>•</span>
                  <span>by {post.author_name}</span>
                </div>

                <h3
                  class="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors"
                >
                  <a href="/blog/{post.slug}" class="block">
                    {post.title}
                  </a>
                </h3>

                {#if post.excerpt}
                  <p class="text-muted-foreground mb-4 leading-relaxed">
                    {truncateExcerpt(post.excerpt)}
                  </p>
                {/if}

                <div class="flex items-center justify-between">
                  <a
                    href="/blog/{post.slug}"
                    class="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Read more
                    <svg
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </a>

                  <div
                    class="flex items-center gap-1 text-xs text-muted-foreground"
                  >
                    <svg
                      class="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>{calculateReadTime(post.content || "")}</span>
                  </div>
                </div>
              </div>
            </article>
          {/each}
        </div>

        <!-- Pagination -->
        {#if data.pagination.totalPages > 1}
          <div class="flex items-center justify-center gap-2">
            <button
              onclick={() => goToPage(data.currentPage - 1)}
              disabled={data.currentPage <= 1}
              aria-label="Previous page"
              class="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {#each Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1) as page (page)}
              {#if page === data.currentPage}
                <button
                  class="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
                  disabled
                >
                  {page}
                </button>
              {:else if Math.abs(page - data.currentPage) <= 2 || page === 1 || page === data.pagination.totalPages}
                <button
                  onclick={() => goToPage(page)}
                  class="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  {page}
                </button>
              {:else if Math.abs(page - data.currentPage) === 3}
                <span class="px-2 py-2 text-muted-foreground">...</span>
              {/if}
            {/each}
            <button
              onclick={() => goToPage(data.currentPage + 1)}
              disabled={data.currentPage >= data.pagination.totalPages}
              aria-label="Next page"
              class="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <p class="text-center text-sm text-muted-foreground mt-4">
            Page {data.currentPage} of {data.pagination.totalPages}
            ({data.pagination.total} total posts)
          </p>
        {/if}
      {/if}
    </div>
  </section>
</main>

<style>
  .glass {
    background: rgba(var(--card), 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(var(--border), 0.2);
  }
</style>
