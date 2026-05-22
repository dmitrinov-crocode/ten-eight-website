import { useLayoutEffect } from 'react';

interface HeadOptions {
  title: string;
  description: string;
  canonical: string;
}

/**
 * Imperatively syncs <title>, <meta name="description">, and
 * <link rel="canonical"> with the document head.
 *
 * Why not React 19's built-in head-hoisting (rendering <title> etc. inside
 * JSX)? When the prerendered static HTML already contains these tags
 * (placed by react-snap or hand-authored in public/index.html), React 19
 * appends a SECOND copy at runtime — its dedup only spans React-owned
 * elements, not static-HTML originals. The result was 2 titles, 2
 * canonicals, 2 descriptions in the live DOM (flagged by SEO auditors).
 *
 * This hook instead UPDATES the existing tags in place (or creates one if
 * absent). It runs in useLayoutEffect so react-snap, which serializes the
 * DOM after a single idle tick, captures the post-update state cleanly.
 */
export function useDocumentHead({ title, description, canonical }: HeadOptions): void {
  useLayoutEffect(() => {
    if (typeof document === 'undefined') return;

    if (document.title !== title) document.title = title;

    upsertMeta('description', description);
    upsertLink('canonical', canonical);
  }, [title, description, canonical]);
}

function upsertMeta(name: string, content: string): void {
  // Collapse any pre-existing duplicates first — keep the first, drop the rest,
  // then update its content.
  const nodes = document.head.querySelectorAll<HTMLMetaElement>(`meta[name="${name}"]`);
  for (let i = 1; i < nodes.length; i++) nodes[i].remove();

  let node = nodes[0];
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute('name', name);
    document.head.appendChild(node);
  }
  if (node.getAttribute('content') !== content) {
    node.setAttribute('content', content);
  }
}

function upsertLink(rel: string, href: string): void {
  const nodes = document.head.querySelectorAll<HTMLLinkElement>(`link[rel="${rel}"]`);
  for (let i = 1; i < nodes.length; i++) nodes[i].remove();

  let node = nodes[0];
  if (!node) {
    node = document.createElement('link');
    node.setAttribute('rel', rel);
    document.head.appendChild(node);
  }
  if (node.getAttribute('href') !== href) {
    node.setAttribute('href', href);
  }
}
