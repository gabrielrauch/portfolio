<script lang="ts">
  import { page } from "$app/stores";
  import { Code, Terminal } from "lucide-svelte";
  import ThemeToggle from "./ThemeToggle.svelte";
  import { config } from "$lib/config";

  $: currentPath = $page.url.pathname;

  function openResume() {
    window.open(config.social.resumeUrl, "_blank");
  }

  function smoothScrollTo(targetId: string) {
    const element = document.getElementById(targetId.replace("#", ""));
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
</script>

<nav
  class="glass sticky top-0 z-10 w-full border-b border-gray-200 dark:border-gray-700"
>
  <div class="container flex h-14 items-center justify-between">
    <div class="flex items-center gap-2 text-lg font-bold">
      <Terminal class="h-5 w-5" />
      <span>{config.personal.branding}</span>
    </div>

    <div class="hidden space-x-6 text-sm md:flex">
      <a
        href="/"
        data-sveltekit-preload-data="hover"
        class="hover:text-primary transition-colors {currentPath === '/'
          ? 'text-primary font-semibold'
          : ''}"
      >
        ~/home
      </a>
      <button
        class="hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors {currentPath ===
        '/'
          ? ''
          : 'opacity-70'}"
        on:click={() => smoothScrollTo("skills")}
        disabled={currentPath !== "/"}
      >
        ~/skills
      </button>
      <button
        class="hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors {currentPath ===
        '/'
          ? ''
          : 'opacity-70'}"
        on:click={() => smoothScrollTo("about")}
        disabled={currentPath !== "/"}
      >
        ~/about
      </button>
      <button
        class="hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors {currentPath ===
        '/'
          ? ''
          : 'opacity-70'}"
        on:click={() => smoothScrollTo("contact")}
        disabled={currentPath !== "/"}
      >
        ~/contact
      </button>
      <a
        href="/blog"
        data-sveltekit-preload-data="hover"
        class="hover:text-primary transition-colors {currentPath.startsWith(
          '/blog'
        )
          ? 'text-primary font-semibold'
          : ''}"
      >
        ~/blog
      </a>
    </div>

    <div class="flex items-center gap-2">
      <ThemeToggle />
      <button
        class="focus-visible:ring-ring border-input hover:bg-accent hover:text-accent-foreground glass hidden h-9 items-center justify-center rounded-md border px-3 font-mono text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 md:inline-flex"
        on:click={openResume}
      >
        <Code class="mr-2 h-4 w-4" />
        resume.pdf
      </button>
    </div>
  </div>
</nav>
