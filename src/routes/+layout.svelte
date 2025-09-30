<script lang="ts">
  import ToastContainer from "$lib/components/ToastContainer.svelte";
  import { themeStore } from "$lib/stores/theme";
  import { onMount } from "svelte";
  import "../app.css";

  let { children } = $props();

  onMount(() => {
    themeStore.init();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      themeStore.init();
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  });
</script>

{@render children?.()}

<ToastContainer />
