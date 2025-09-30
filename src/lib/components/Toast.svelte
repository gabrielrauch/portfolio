<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    message: string;
    type?: "success" | "error" | "info";
    duration?: number;
    show: boolean;
    onClose?: () => void;
  }

  let {
    message,
    type = "success",
    duration = 3000,
    show,
    onClose,
  }: Props = $props();

  let visible = $state(false);
  let timeoutId: ReturnType<typeof setTimeout>;

  $effect(() => {
    if (show) {
      setTimeout(() => {
        visible = true;
      }, 10);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        visible = false;
        setTimeout(() => {
          onClose?.();
        }, 300)
      }, duration);
    }
  });

  onMount(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  });

  function handleClose() {
    visible = false;
    setTimeout(() => {
      onClose?.();
    }, 300);
  }

  const typeClasses = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
  };
</script>

{#if show}
  <div
    class="transform transition-all duration-300 ease-in-out {visible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-2 opacity-0'}"
  >
    <div
      class="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg {typeClasses[
        type
      ]}"
    >
      {#if type === "success"}
        <svg
          class="h-5 w-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      {:else if type === "error"}
        <svg
          class="h-5 w-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      {:else}
        <svg
          class="h-5 w-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      {/if}

      <span class="text-sm font-medium">{message}</span>

      <button
        onclick={handleClose}
        class="ml-2 hover:opacity-70 transition-opacity"
        aria-label="Close notification"
      >
        <svg
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  </div>
{/if}
