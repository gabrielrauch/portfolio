<script lang="ts">
  import type { BlogPost } from "$lib/api/blog";
  import {
    calculateReadTime,
    formatFullDate,
    formatRelativeDate,
  } from "$lib/utils/blog";
  import { marked } from "marked";
  import { onMount } from "svelte";

  interface Props {
    post: BlogPost;
  }

  let { post }: Props = $props();
  let contentHtml = $state("");

  onMount(async () => {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    contentHtml = await marked.parse(post.content || "");
  });
</script>

<svelte:head>
  <title>{post.title} - rauch's blog</title>
  <meta
    name="description"
    content={post.excerpt || `Read ${post.title} on my blog`}
  />
  <meta property="og:title" content={post.title} />
  <meta
    property="og:description"
    content={post.excerpt || `Read ${post.title} on my blog`}
  />
  {#if post.featured_image}
    <meta property="og:image" content={post.featured_image} />
  {/if}
  <meta property="og:type" content="article" />
  <meta property="article:published_time" content={post.published_at} />
  <meta property="article:modified_time" content={post.updated_at} />
  <meta property="article:author" content={post.author_name} />
</svelte:head>

<article class="max-w-4xl mx-auto px-4 py-8">
  <!-- Breadcrumb -->
  <nav class="mb-8">
    <ol class="flex items-center gap-2 text-sm text-muted-foreground">
      <li>
        <a
          href="/"
          data-sveltekit-preload-data="hover"
          class="hover:text-primary transition-colors">home</a
        >
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
      <li>
        <a
          href="/blog"
          data-sveltekit-preload-data="hover"
          class="hover:text-primary transition-colors">blog</a
        >
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
      <li class="text-foreground font-medium">{post.title}</li>
    </ol>
  </nav>

  <!-- Article Header -->
  <header class="mb-8">
    {#if post.featured_image}
      <div class="aspect-video mb-8 rounded-lg overflow-hidden">
        <img
          src={post.featured_image}
          alt={post.title}
          class="w-full h-full object-cover"
        />
      </div>
    {/if}

    <div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <span class="font-mono">~/blog/{post.slug}</span>
      <span>•</span>
      <time
        datetime={post.published_at}
        title={formatFullDate(post.published_at)}
      >
        {formatRelativeDate(post.published_at)}
      </time>
      <span>•</span>
      <span>by {post.author_name}</span>
      <span>•</span>
      <span>{calculateReadTime(post.content || "")}</span>
    </div>

    <h1
      class="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4"
    >
      {post.title}
    </h1>

    {#if post.excerpt}
      <p class="text-xl text-muted-foreground leading-relaxed">
        {post.excerpt}
      </p>
    {/if}
  </header>

  <!-- Article Content -->
  <div class="prose prose-lg max-w-none">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html contentHtml}
  </div>

  <!-- Article Footer -->
  <footer class="mt-12 pt-8 border-t border-border">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div
            class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center"
          >
            <span class="text-primary font-medium">
              {post.author_name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p class="font-medium text-foreground">{post.author_name}</p>
            <p class="text-sm text-muted-foreground">Author</p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <button
          class="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
          onclick={() => {
            if (navigator.share) {
              navigator.share({ title: post.title, url: window.location.href });
            } else {
              navigator.clipboard.writeText(window.location.href);
            }
          }}
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16,6 12,2 8,6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Share
        </button>

        <a
          href="/blog"
          data-sveltekit-preload-data="hover"
          class="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
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
          back to blog
        </a>
      </div>
    </div>

    {#if post.updated_at !== post.created_at}
      <p class="text-xs text-muted-foreground mt-4">
        Last updated: {formatFullDate(post.updated_at)}
      </p>
    {/if}
  </footer>
</article>

<style>
  :global(.prose) {
    color: rgb(var(--foreground));
  }

  :global(.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6) {
    color: rgb(var(--foreground));
    font-weight: 600;
    margin-top: 2em;
    margin-bottom: 1em;
    line-height: 1.2;
  }

  :global(.prose h1) {
    font-size: 2.25rem;
    border-bottom: 2px solid rgb(var(--border));
    padding-bottom: 0.5rem;
  }

  :global(.prose h2) {
    font-size: 1.875rem;
  }

  :global(.prose h3) {
    font-size: 1.5rem;
  }

  :global(.prose p) {
    margin: 1.25em 0;
    line-height: 1.75;
  }

  :global(.prose a) {
    color: rgb(var(--primary));
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  :global(.prose a:hover) {
    color: rgb(var(--primary) / 0.8);
  }

  :global(.prose code) {
    background-color: rgb(var(--muted));
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-size: 0.875em;
    font-family: "JetBrains Mono", monospace;
  }

  :global(.prose pre) {
    background-color: rgb(var(--muted));
    border: 1px solid rgb(var(--border));
    border-radius: 0.5rem;
    padding: 1rem;
    overflow-x: auto;
    margin: 1.5em 0;
  }

  :global(.prose pre code) {
    background: none;
    padding: 0;
    border-radius: 0;
  }

  :global(.prose blockquote) {
    border-left: 4px solid rgb(var(--primary));
    padding-left: 1rem;
    margin: 1.5em 0;
    font-style: italic;
    color: rgb(var(--muted-foreground));
  }

  :global(.prose ul, .prose ol) {
    margin: 1.25em 0;
    padding-left: 1.5em;
  }

  :global(.prose li) {
    margin: 0.5em 0;
  }

  :global(.prose img) {
    border-radius: 0.5rem;
    margin: 1.5em 0;
    max-width: 100%;
    height: auto;
  }

  :global(.prose table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0;
  }

  :global(.prose th, .prose td) {
    border: 1px solid rgb(var(--border));
    padding: 0.75rem;
    text-align: left;
  }

  :global(.prose th) {
    background-color: rgb(var(--muted));
    font-weight: 600;
  }
</style>
