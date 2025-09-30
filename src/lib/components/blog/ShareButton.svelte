<script lang="ts">
  import { browser } from "$app/environment";
  import {
    copyToClipboard,
    hasNativeShare,
    shareContent,
    shareOnSocialMedia,
  } from "$lib/utils/share";
  import { IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-svelte";
  import { Check, Copy, Share } from "lucide-svelte";

  interface Props {
    title: string;
    url?: string;
    text?: string;
    hashtags?: string[];
    className?: string;
    maxTextLength?: number;
  }

  let {
    title,
    url,
    text,
    hashtags = [],
    className = "",
    maxTextLength = 140,
  }: Props = $props();

  let showOptions = $state(false);
  let copied = $state(false);

  const currentUrl = $derived(url || (browser ? window.location.href : ""));

  const truncatedText = $derived(() => {
    const textToTruncate = text || title;
    if (textToTruncate.length <= maxTextLength) {
      return textToTruncate;
    }
    return textToTruncate.slice(0, maxTextLength - 3) + "...";
  });

  const shareText = $derived(() => truncatedText());

  async function handleNativeShare() {
    await shareContent({
      title,
      text: shareText(),
      url: currentUrl,
      hashtags,
    });
  }

  async function handleCopyToClipboard() {
    const success = await copyToClipboard(currentUrl);
    if (success) {
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    }
  }

  function handleSocialShare(platform: "twitter" | "linkedin" | "facebook") {
    shareOnSocialMedia(platform, {
      title,
      text: shareText(),
      url: currentUrl,
      hashtags,
    });
  }

  function shareOnTwitter() {
    handleSocialShare("twitter");
  }

  function shareOnLinkedIn() {
    handleSocialShare("linkedin");
  }

  const hasNative = $derived(hasNativeShare());
</script>

<div class="relative {className}">
  <button
    class="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
    onclick={() => {
      if (hasNative) {
        handleNativeShare();
      } else {
        showOptions = !showOptions;
      }
    }}
  >
    <Share class="h-4 w-4" />
    share
  </button>

  {#if showOptions && !hasNative}
    <div
      class="absolute bottom-full mb-2 right-0 bg-background border border-border rounded-lg shadow-lg p-2 min-w-48 z-10"
    >
      <div class="text-xs text-muted-foreground mb-2 px-2">Share this post</div>

      <button
        class="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
        onclick={handleCopyToClipboard}
      >
        {#if copied}
          <Check class="h-4 w-4 text-green-500" />
          <span class="text-green-500">link copied!</span>
        {:else}
          <Copy class="h-4 w-4" />
          <span>copy link</span>
        {/if}
      </button>

      <div class="border-t border-border my-2"></div>

      <button
        class="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
        onclick={shareOnTwitter}
      >
        <IconBrandTwitter class="h-4 w-4 text-blue-400" />
        <span>share on twitter</span>
      </button>

      <button
        class="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
        onclick={shareOnLinkedIn}
      >
        <IconBrandLinkedin class="h-4 w-4 text-blue-600" />
        <span>share on linkedin</span>
      </button>
    </div>
  {/if}
</div>

{#if showOptions && browser}
  <button
    type="button"
    class="fixed inset-0 z-0"
    aria-label="Close share options"
    tabindex="0"
    onclick={() => (showOptions = false)}
    onkeydown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        showOptions = false;
      }
    }}
    style="background: transparent; border: none; padding: 0; margin: 0;"
  ></button>
{/if}
