/**
 * Regenerates every icon in public/ from the outlined J and its accent
 * period in scripts/brand-mark.mjs.
 *
 *   npm run icons
 *
 * Three shapes, because the platforms mask differently:
 *  - favicon.svg      rounded badge, drawn as-is in the tab strip
 *  - apple-touch-icon iOS applies its own squircle, so ship full-bleed ink
 *  - icon-192/512     Android maskable; J pulled well inside the safe circle
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';
import { MARK_PATH, MARK_STROKE, DOT, MARK_SHIFT, badgeViewBox, INK, PAPER, ACCENT_ON_INK } from './brand-mark.mjs';

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

/**
 * The badge is a rect covering exactly the viewBox, so the J keeps the same
 * optical margin at every fill. Emitting width/height would pin the file to
 * one size, so only sharp's input gets them — favicon.svg stays
 * resolution-free and scales to whatever box it lands in.
 *
 * @param {object} opts
 * @param {number} [opts.fill]    share of the badge the J occupies
 * @param {number} [opts.radius]  corner radius as a fraction of the badge
 * @param {boolean} [opts.a11y]   emit title/role (tab favicon only)
 * @param {number} [opts.px]      intrinsic size, for sharp's rasterizer only
 */
const svg = ({ fill = 1, radius = 0, a11y = false, px }) => {
  const [x, y, side] = badgeViewBox(fill).split(' ').map(Number);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${side} ${side}"${
    px ? ` width="${px}" height="${px}"` : ''
  }${a11y ? ' role="img" aria-label="Joshua Briley"' : ''}>
${a11y ? '  <title>Joshua Briley</title>\n' : ''}  <rect x="${x}" y="${y}" width="${side}" height="${side}"${
    radius ? ` rx="${(side * radius).toFixed(2)}"` : ''
  } fill="${INK}"/>
  <g transform="translate(${MARK_SHIFT} 0)">
    <path d="${MARK_PATH}" fill="${PAPER}" stroke="${PAPER}" stroke-width="${MARK_STROKE}" stroke-linejoin="round"/>
    <circle cx="${DOT.cx}" cy="${DOT.cy}" r="${DOT.r}" fill="${ACCENT_ON_INK}"/>
  </g>
</svg>
`;
};

// Tab favicon. The J fills 86% of the badge, which leaves it clearly inside
// the corners without shrinking to a speck at 16px.
const TAB = { fill: 0.86, radius: 0.18 };

const png = (opts, size, name) =>
  sharp(Buffer.from(svg({ ...opts, px: 512 })))
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(join(PUBLIC, name))
    .then(() => console.log(`  public/${name}  ${size}x${size}`));

await writeFile(join(PUBLIC, 'favicon.svg'), svg({ ...TAB, a11y: true }));
console.log('  public/favicon.svg');

// Raster fallback for the tab strip: Safari and Firefox still prefer a PNG at
// small sizes, where they downsample it better than they rasterize the SVG.
await png(TAB, 32, 'favicon-32.png');

// iOS masks to its own squircle, so no radius of our own.
await png({ fill: 0.7 }, 180, 'apple-touch-icon.png');

// Android maskable: anything outside the centred 80% circle can be cropped.
await png({ fill: 0.55 }, 192, 'icon-192.png');
await png({ fill: 0.55 }, 512, 'icon-512.png');

await writeFile(
  join(PUBLIC, 'site.webmanifest'),
  JSON.stringify(
    {
      name: 'Joshua Briley',
      short_name: 'Joshua Briley',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      ],
      theme_color: INK,
      background_color: PAPER,
      display: 'standalone',
      start_url: '/',
    },
    null,
    2,
  ) + '\n',
);
console.log('  public/site.webmanifest');
