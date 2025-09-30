<script lang="ts">
  import { removeToast, toasts } from "$lib/stores/toast";
  import Toast from "./Toast.svelte";
</script>

<div class="fixed bottom-4 right-4 z-50 space-y-2">
  {#each $toasts as toast (toast.id)}
    <Toast
      message={toast.message}
      type={toast.type}
      duration={toast.duration}
      show={true}
      onClose={() => removeToast(toast.id)}
    />
  {/each}
</div>
