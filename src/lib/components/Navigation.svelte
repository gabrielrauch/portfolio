<script lang="ts">
  import { Code, Terminal } from "lucide-svelte";
  import ThemeToggle from "./ThemeToggle.svelte";

  function openResume() {
    window.open(
      "https://drive.google.com/file/d/1iJe38G4H4gP-T9vTW2zc7EYd1Lk0sngP/view?usp=sharing",
      "_blank"
    );
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
      <span>gabrielrauch.sh</span>
    </div>

    <div class="hidden space-x-6 text-sm md:flex">
      <button
        class="hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors"
        on:click={() => smoothScrollTo("home")}
      >
        ~/home
      </button>
      <button
        class="hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors"
        on:click={() => smoothScrollTo("skills")}
      >
        ~/skills
      </button>
      <button
        class="hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors"
        on:click={() => smoothScrollTo("about")}
      >
        ~/about
      </button>
      <button
        class="hover:text-primary cursor-pointer border-none bg-transparent p-0 text-inherit transition-colors"
        on:click={() => smoothScrollTo("contact")}
      >
        ~/contact
      </button>
      <span
        class="text-muted-foreground cursor-not-allowed opacity-50"
        title="Coming Soon"
      >
        ~/blog
      </span>
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
