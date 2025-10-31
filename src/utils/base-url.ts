const baseUrl = import.meta.env.BASE_URL ?? '/';

export function withBase(path = ''): string {
  if (!path || path === '/') {
    return baseUrl;
  }

  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!normalizedBase || normalizedBase === '') {
    return normalizedPath;
  }

  return `${normalizedBase}${normalizedPath}`;
}
