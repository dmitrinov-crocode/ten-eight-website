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
const targets = [
  { file: 'public/image/hero-mobile.png', width: 1412 }, // shared hero composite, rendered ~706px on desktop
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

  for (const { file, width } of targets) {
    const abs = path.resolve(file);
    const orig = fs.statSync(abs).size;
    const buf = await sharp(abs)
      .resize({ width, withoutEnlargement: true })
      .png({ palette: true, quality: 80, effort: 10, compressionLevel: 9 })
      .toBuffer();
    // Only write if we actually made it smaller.
    if (buf.length < orig) fs.writeFileSync(abs, buf);
    const now = fs.statSync(abs).size;
    before += orig;
    after += now;
    const pct = (100 - (now / orig) * 100).toFixed(0);
    console.log(`${file.padEnd(34)} ${kb(orig).padStart(8)} -> ${kb(now).padStart(8)}  (-${pct}%)`);
  }
  // Emit .webp next to each referenced PNG so components can serve it via
  // <picture><source type="image/webp"> ... <img src=".png" ... /></picture>.
  console.log('\n--- WebP variants ---');
  let webpPng = 0;
  let webpOut = 0;
  for (const { file, width } of targets) {
    const absPng = path.resolve(file);
    const absWebp = absPng.replace(/\.png$/i, '.webp');
    const pngSize = fs.statSync(absPng).size;
    const buf = await sharp(absPng)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6, alphaQuality: 90 })
      .toBuffer();
    fs.writeFileSync(absWebp, buf);
    webpPng += pngSize;
    webpOut += buf.length;
    console.log(
      `${path.relative(process.cwd(), absWebp).padEnd(34)} ${kb(pngSize).padStart(8)} (png) -> ${kb(
        buf.length
      ).padStart(8)} (webp)  (-${(100 - (buf.length / pngSize) * 100).toFixed(0)}%)`
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
