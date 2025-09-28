export function calculateReadTime(content: string): string {
  if (!content) return "1 min read";

  const plainText = content
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const words = plainText.split(" ").filter((word) => word.length > 0).length;
  const wordsPerMinute = 225;
  const minutes = Math.ceil(words / wordsPerMinute);

  if (minutes < 1) return "1 min read";
  if (minutes === 1) return "1 min read";
  return `${minutes} min read`;
}

export function formatRelativeDate(date: string | Date): string {
  const now = new Date();
  const postDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  if (diffInSeconds < 60) return "now";
  
  const minutes = Math.floor(diffInSeconds / 60);
  if (diffInSeconds < 3600) {
    return minutes === 1 ? "1 min ago" : `${minutes} min ago`;
  }
  
  const hours = Math.floor(diffInSeconds / 3600);
  if (diffInSeconds < 86400) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }
  
  const days = Math.floor(diffInSeconds / 86400);
  if (diffInSeconds < 2592000) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }
  
  const months = Math.floor(diffInSeconds / 2592000);
  if (diffInSeconds < 31536000) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
  
  const years = Math.floor(diffInSeconds / 31536000);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

export function formatFullDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function truncateExcerpt(text: string, maxLength: number = 200): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\w*$/, "") + "...";
}
