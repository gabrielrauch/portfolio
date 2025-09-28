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

  if (diffInSeconds < 60) return "agora";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} min atrás`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} h atrás`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} dias atrás`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} meses atrás`;
  return `${Math.floor(diffInSeconds / 31536000)} anos atrás`;
}

export function formatFullDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function truncateExcerpt(text: string, maxLength: number = 200): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\w*$/, "") + "...";
}
