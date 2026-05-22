/**
 * Post-react-snap step. Surgical fixes applied to every snapshot:
 *
 *   1) Drop the duplicate, blocking google-fonts <link rel="stylesheet">
 *      that react-snap leaks out of the <noscript> fallback during its
 *      headless snapshot. The non-blocking preload+media-swap pair is kept
 *      and the <noscript> fallback is recreated from scratch.
 *
 *   2) De-duplicate <title>, <meta name="description">, and
 *      <link rel="canonical"> in <head>. React 19 hoists JSX-declared
 *      head elements, but the react-snap snapshot sometimes captures two
 *      copies (timing-dependent: /privacy/ saw 2 in our build, /terms/
 *      saw 1). Keep the LAST occurrence — that's the page-specific one
 *      inserted by the component, not anything left over from rendering.
 *
 * NOTE: this script used to inline build/static/css/main.*.css into a
 * <style> block. That hurt the SEO text-to-code ratio (~40 KB of CSS
 * inflated HTML to ~44 KB with only ~1.8 KB of text → 4%). The CSS is
 * now served as an external stylesheet again.
 */
const fs = require('fs');
const path = require('path');

const buildDir = path.resolve('build');
const fontHref =
  'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap';

function findHtmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'static') continue;
      out.push(...findHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

function dedupBlockingFonts(html) {
  const blockingFont = new RegExp(
    `<link\\s+rel="stylesheet"\\s+href="${fontHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s*/?>`,
    'g'
  );
  const removed = (html.match(blockingFont) || []).length;
  if (removed) html = html.replace(blockingFont, '');

  if (!/<noscript>[\s\S]*fonts\.googleapis/i.test(html)) {
    html = html.replace(
      /<\/head>/,
      `<noscript><link rel="stylesheet" href="${fontHref}"/></noscript></head>`
    );
  }
  return { html, removed };
}

/**
 * Keep only the last occurrence of each pattern inside <head>. Returns the
 * patched html and the number of duplicate tags removed across all patterns.
 */
function keepLastInHead(html, patterns) {
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) return { html, removed: 0 };
  let head = headMatch[1];
  let removed = 0;

  for (const pattern of patterns) {
    const matches = [...head.matchAll(pattern)];
    if (matches.length <= 1) continue;
    // Drop every match except the last one, in-place, by replacing each
    // earlier match with the empty string. Walk backwards so prior indices
    // stay valid.
    for (let i = matches.length - 2; i >= 0; i--) {
      const m = matches[i];
      head = head.slice(0, m.index) + head.slice(m.index + m[0].length);
      removed++;
    }
  }

  return {
    html: html.slice(0, headMatch.index) + `<head>${head}</head>` + html.slice(headMatch.index + headMatch[0].length),
    removed,
  };
}

const headPatterns = [
  /<title[^>]*>[\s\S]*?<\/title>/gi,
  /<link[^>]*rel="canonical"[^>]*>/gi,
  /<meta[^>]*name="description"[^>]*>/gi,
];

const files = findHtmlFiles(buildDir);
for (const file of files) {
  const rel = path.relative(buildDir, file);
  let html = fs.readFileSync(file, 'utf8');
  const origSize = html.length;

  const fonts = dedupBlockingFonts(html);
  html = fonts.html;

  const dedup = keepLastInHead(html, headPatterns);
  html = dedup.html;

  fs.writeFileSync(file, html);
  const notes = [];
  if (fonts.removed) notes.push(`-${fonts.removed} blocking font`);
  if (dedup.removed) notes.push(`-${dedup.removed} dup head tag`);
  console.log(
    `${rel}: ${(origSize / 1024).toFixed(1)} KB -> ${(html.length / 1024).toFixed(1)} KB${notes.length ? ' (' + notes.join(', ') + ')' : ''}`
  );
}
