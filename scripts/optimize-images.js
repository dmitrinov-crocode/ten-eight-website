/**
 * One-off / repeatable image optimizer.
 *
 * Resizes the raster images actually referenced by the app down to ~2x their
 * real CSS display size and re-encodes them as palette-quantized PNGs,
 * overwriting the files in place. Same filenames + same PNG format means
 * no markup changes and no <picture> fallbacks are needed.
 *
 * Run with: node scripts/optimize-images.js
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// width cap = ~2x the largest place each image is rendered (see *.css).
// withoutEnlargement keeps already-small sources untouched (just re-encoded).
// `palette: false` keeps full truecolor (for photographic mockups where 256-color
// quantization causes visible banding). Note the webp variants below are encoded
// FROM the on-disk PNG, so a clean PNG also means a clean webp.
const targets = [
  { file: 'public/image/hero-desktop.png', width: 1412, palette: false }, // hero composite, 706px slot @2x
  { file: 'public/image/hero-mobile.png', width: 1124, palette: false }, // hero composite, ~374px slot @3x (high-DPR phones)
  { file: 'public/image/fighter.png', width: 1300 }, // highlights, wrapper 645px
  { file: 'public/image/fighter-1.png', width: 1100 }, // showcase desktop slide
  { file: 'public/image/fighter-2.png', width: 1100 },
  { file: 'public/image/fighter-3.png', width: 1100 },
  { file: 'public/image/fighter-1-mobile.png', width: 608 }, // 304px slot @2x
  { file: 'public/image/fighter-2-mobile.png', width: 608 },
  { file: 'public/image/fighter-3-mobile.png', width: 608 },
];

// SVGs that are tiny on screen but embed a full-res base64 PNG.
// We shrink the embedded raster and keep the .svg filename + structure,
// so no markup changes are needed.
const svgEmbedTargets = [
  { file: 'public/image/avatar-1.svg', width: 96 }, // shown at 32px
  { file: 'public/image/avatar-2.svg', width: 96 },
  { file: 'public/image/avatar-3.svg', width: 96 },
];

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

(async () => {
  let before = 0;
  let after = 0;

  for (const { file, width } of svgEmbedTargets) {
    const abs = path.resolve(file);
    let svg = fs.readFileSync(abs, 'utf8');
    const orig = Buffer.byteLength(svg);
    const m = svg.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/);
    if (m) {
      const png = await sharp(Buffer.from(m[1], 'base64'))
        .resize({ width, withoutEnlargement: true })
        .png({ palette: true, quality: 80, effort: 10 })
        .toBuffer();
      svg = svg.replace(m[0], `data:image/png;base64,${png.toString('base64')}`);
    }
    if (Buffer.byteLength(svg) < orig) fs.writeFileSync(abs, svg);
    const now = fs.statSync(abs).size;
    before += orig;
    after += now;
    console.log(
      `${file.padEnd(34)} ${kb(orig).padStart(8)} -> ${kb(now).padStart(8)}  (-${(
        100 -
        (now / orig) * 100
      ).toFixed(0)}%)`
    );
  }

  // One resize per file, branched with clone() into PNG + WebP. Crucially the
  // WebP is encoded from the same truecolor pipeline, NOT from the (possibly
  // palette-quantized) PNG we just wrote — so the served WebP never inherits
  // 256-color banding on photographic targets (e.g. the hero mockup gradients).
  // NOTE: the PNG is overwritten in place, so on a *second* run the source is
  // already quantized; keep the hi-res originals if you need to re-optimize.
  console.log('\n--- WebP variants ---');
  let webpPng = 0;
  let webpOut = 0;
  for (const { file, width, palette = true } of targets) {
    const abs = path.resolve(file);
    const orig = fs.statSync(abs).size;
    const resized = sharp(abs).resize({ width, withoutEnlargement: true });

    const pngBuf = await resized
      .clone()
      .png({ palette: true, quality: 80, effort: 10, compressionLevel: 9 })
      .toBuffer();
    // Only write if we actually made it smaller.
    if (pngBuf.length < orig) fs.writeFileSync(abs, pngBuf);
    const nowPng = fs.statSync(abs).size;
    before += orig;
    after += nowPng;
    console.log(
      `${file.padEnd(34)} ${kb(orig).padStart(8)} -> ${kb(nowPng).padStart(8)}  (-${(
        100 -
        (nowPng / orig) * 100
      ).toFixed(0)}%)`
    );

    // full-color (photographic) targets get a higher webp quality.
    const webpBuf = await resized
      .clone()
      .webp({ quality: palette ? 78 : 86, effort: 6, alphaQuality: 90 })
      .toBuffer();
    const absWebp = abs.replace(/\.png$/i, '.webp');
    fs.writeFileSync(absWebp, webpBuf);
    webpPng += nowPng;
    webpOut += webpBuf.length;
    console.log(
      `${path.relative(process.cwd(), absWebp).padEnd(34)} ${kb(nowPng).padStart(8)} (png) -> ${kb(
        webpBuf.length
      ).padStart(8)} (webp)  (-${(100 - (webpBuf.length / nowPng) * 100).toFixed(0)}%)`
    );
  }
  console.log(
    `\nWebP TOTAL: PNG ${kb(webpPng)} -> WebP ${kb(webpOut)}  (-${(
      100 -
      (webpOut / webpPng) * 100
    ).toFixed(0)}%)`
  );

  console.log(
    `\nTOTAL ${kb(before)} -> ${kb(after)}  saved ${kb(before - after)} (-${(
      100 -
      (after / before) * 100
    ).toFixed(0)}%)`
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
