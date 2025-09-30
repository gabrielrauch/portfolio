import { browser } from "$app/environment";
import { addToast } from "$lib/stores/toast";

export interface ShareData {
  title: string;
  text?: string;
  url: string;
  hashtags?: string[];
}

export async function shareContent(data: ShareData): Promise<boolean> {
  if (!browser) return false;

  if (navigator.share) {
    try {
      await navigator.share({
        title: data.title,
        text: data.text || data.title,
        url: data.url,
      });
      return true;
    } catch (err) {
      console.log("share cancelled or failed:", err);
      return false;
    }
  }

  return await copyToClipboard(data.url);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (!browser || !navigator.clipboard) return false;

  try {
    await navigator.clipboard.writeText(text);
    addToast({
      message: "link copied to clipboard!",
      type: "success",
    });
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    addToast({
      message: "Failed to copy link",
      type: "error",
    });
    return false;
  }
}

export function shareOnSocialMedia(
  platform: "twitter" | "linkedin" | "facebook",
  data: ShareData,
) {
  if (!browser) return;

  let url: string;

  switch (platform) {
    case "twitter":
      url = createTwitterShareUrl(data);
      break;
    case "linkedin":
      url = createLinkedInShareUrl(data);
      break;
    case "facebook":
      url = createFacebookShareUrl(data);
      break;
    default:
      return;
  }

  window.open(url, "_blank", "width=550,height=420");
}

function createTwitterShareUrl(data: ShareData): string {
  const url = new URL("https://twitter.com/intent/tweet");
  url.searchParams.set("text", data.text || data.title);
  url.searchParams.set("url", data.url);

  if (data.hashtags && data.hashtags.length > 0) {
    url.searchParams.set("hashtags", data.hashtags.join(","));
  }

  return url.toString();
}

function createLinkedInShareUrl(data: ShareData): string {
  const url = new URL("https://www.linkedin.com/sharing/share-offsite/");
  url.searchParams.set("url", data.url);
  return url.toString();
}

function createFacebookShareUrl(data: ShareData): string {
  const url = new URL("https://www.facebook.com/sharer/sharer.php");
  url.searchParams.set("u", data.url);
  return url.toString();
}

export function hasNativeShare(): boolean {
  return browser && "share" in navigator;
}

export function getCurrentUrl(): string {
  return browser ? window.location.href : "";
}

export function getShareUrls(data: ShareData) {
  return {
    twitter: createTwitterShareUrl(data),
    linkedin: createLinkedInShareUrl(data),
    facebook: createFacebookShareUrl(data),
  };
}
