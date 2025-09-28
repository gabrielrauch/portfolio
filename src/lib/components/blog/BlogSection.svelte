<script lang="ts">
  import type { BlogPost } from "$lib/api/blog";
  import {
    calculateReadTime,
    formatRelativeDate,
    truncateExcerpt,
  } from "$lib/utils/blog";

  interface Props {
    posts: BlogPost[];
  }

  let { posts }: Props = $props();
</script>

<section class="py-16" id="blog">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Latest <span class="text-primary">Blog Posts</span>
      </h2>
      <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
        Thoughts, tutorials, and insights about web development, technology, and
        more.
      </p>
    </div>

    {#if posts.length === 0}
      <div class="text-center py-12">
        <div class="text-6xl mb-4">📝</div>
        <h3 class="text-xl font-medium text-foreground mb-2">No posts yet</h3>
        <p class="text-muted-foreground">Check back soon for new content!</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each posts as post (post.slug)}
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

      <div class="text-center mt-12">
        <a
          href="/blog"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          View all posts
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
      </div>
    {/if}
  </div>
</section>

<style>
  .glass {
    background: rgba(var(--card), 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(var(--border), 0.2);
  }
</style>
