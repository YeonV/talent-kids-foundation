// Helper to get the basePath from next.config.ts at build time
// This will be inlined by the bundler
export const BASE_PATH = process.env.__NEXT_ROUTER_BASEPATH || '';

// Helper function to prefix paths with basePath
export function withBasePath(path: string): string {
  if (!path) return path;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${BASE_PATH}${path}`;
}
