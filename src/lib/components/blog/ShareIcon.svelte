<script lang="ts">
  import { browser } from "$app/environment";
  import { shareContent } from "$lib/utils/share";
  import { Share } from "lucide-svelte";

  interface Props {
    title: string;
    slug: string;
    className?: string;
  }

  let { title, slug, className = "" }: Props = $props();

  const postUrl = $derived(
    browser ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`
  );

  async function handleShare(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    await shareContent({
      title,
      text: `Check out this post: ${title}`,
      url: postUrl,
      hashtags: ["blog", "tech"],
    });
  }
</script>

<button
  class="inline-flex items-center justify-center p-2 rounded-md hover:bg-muted transition-colors {className}"
  onclick={handleShare}
  title="share this post"
>
  <Share class="h-4 w-4" />
</button>
