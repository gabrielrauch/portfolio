<script lang="ts">
  import { themeStore } from "$lib/stores/theme";
  import { onMount } from "svelte";

  let isOpen = false;
  let isDark = false;
  let dropdownElement: HTMLDivElement;
  let buttonElement: HTMLButtonElement;

  onMount(() => {
    isDark = document.documentElement.classList.contains("dark");
  });

  function toggleTheme(theme: "light" | "dark" | "system") {
    themeStore.setTheme(theme);
    isOpen = false;
    setTimeout(() => {
      if (typeof window !== "undefined") {
        isDark = document.documentElement.classList.contains("dark");
      }
    }, 10);
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      isOpen &&
      dropdownElement &&
      buttonElement &&
      !dropdownElement.contains(event.target as Node) &&
      !buttonElement.contains(event.target as Node)
    ) {
      isOpen = false;
    }
  }

  function handleEscape(event: KeyboardEvent) {
    if (event.key === "Escape" && isOpen) {
      isOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  });
</script>

<div class="relative">
  <button
    bind:this={buttonElement}
    class="theme-toggle-button focus-visible:ring-ring border-input hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-9 items-center justify-center rounded-md border px-0 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
    on:click={() => (isOpen = !isOpen)}
    aria-expanded={isOpen}
    aria-haspopup="true"
  >
    <span
      class="text-lg transition-all duration-300 {isDark
        ? 'rotate-90 scale-0'
        : 'rotate-0 scale-100'}"
    >
      ☀️
    </span>
    <span
      class="absolute text-lg transition-all duration-300 {isDark
        ? 'rotate-0 scale-100'
        : '-rotate-90 scale-0'}"
    >
      🌙
    </span>
    <span class="sr-only">Toggle theme</span>
  </button>

  {#if isOpen}
    <div
      bind:this={dropdownElement}
      class="bg-popover text-popover-foreground absolute right-0 z-50 mt-2 w-56 rounded-md border p-1 shadow-lg animate-in slide-in-from-top-2 duration-200"
    >
      <button
        class="theme-option relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors duration-150 {isDark
          ? 'hover:bg-gray-950'
          : 'hover:bg-gray-100'}"
        on:click={() => toggleTheme("light")}
      >
        <span class="mr-3 text-base">☀️</span>
        <span class="font-medium">Light</span>
      </button>
      <button
        class="theme-option relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors duration-150 {isDark
          ? 'hover:bg-gray-950'
          : 'hover:bg-gray-100'}"
        on:click={() => toggleTheme("dark")}
      >
        <span class="mr-3 text-base">🌙</span>
        <span class="font-medium">Dark</span>
      </button>
      <button
        class="theme-option relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors duration-150 {isDark
          ? 'hover:bg-gray-950'
          : 'hover:bg-gray-100'}"
        on:click={() => toggleTheme("system")}
      >
        <span class="mr-3 text-base">💻</span>
        <span class="font-medium">System</span>
      </button>
    </div>
  {/if}
</div>
