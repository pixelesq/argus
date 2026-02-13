import type { LinkData } from '../types';

export function extractLinks(): LinkData[] {
  const links: LinkData[] = [];
  const elements = document.querySelectorAll<HTMLAnchorElement>('a[href]');
  const currentHost = location.hostname;

  elements.forEach((el) => {
    const href = el.getAttribute('href') ?? '';
    const rel = el.getAttribute('rel') ?? '';

    let isExternal = false;
    try {
      const url = new URL(href, location.href);
      isExternal = url.hostname !== currentHost;
    } catch {
      // invalid URL, treat as internal
    }

    links.push({
      href,
      text: el.textContent?.trim() ?? '',
      isExternal,
      isNofollow: rel.includes('nofollow'),
      isNoopener: rel.includes('noopener'),
    });
  });

  return links;
}
