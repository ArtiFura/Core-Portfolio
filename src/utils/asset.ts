/**
 * Utility to resolve static asset URLs accurately across both local development
 * and production environments (e.g., GitHub Pages subpaths like /Core-Portfolio/).
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';

  // If already an absolute URL or data URL, leave untouched
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${cleanBase}${cleanPath}`;
}
