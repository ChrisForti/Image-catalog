/**
 * Convert a relative image URL to an absolute URL using the backend URL
 */
export function getImageUrl(path: string | undefined): string {
  if (!path) return "";

  // If already absolute URL, return as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // In production (GitHub Pages), use the full backend URL
  if (import.meta.env.VITE_API_URL) {
    return `${import.meta.env.VITE_API_URL}${path}`;
  }

  // In development, use relative path (proxied)
  return path;
}
