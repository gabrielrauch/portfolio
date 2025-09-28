<script lang="ts">
  import BlogPost from "$lib/components/blog/BlogPost.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<BlogPost post={data.post} />
