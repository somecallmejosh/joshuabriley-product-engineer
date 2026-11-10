/**
 * Derive every rendition of the author portrait from one master file.
 *
 *   node scripts/generate-portrait.mjs     (or: npm run images:portrait)
 *
 * Master:  src/assets/about/josh-casual.png  (1024x1024, kept out of public/ so
 *          the 2 MB original is never deployed).
 * Output:  public/images/about/josh-casual-*.{avif,webp,jpg}
 *
 * Three art-directed crops, because the photo is used at three very different
 * sizes and a single square would waste bytes or lose the face:
 *
 *   portrait  4:5, full torso — the editorial figure on /, /about, /style-guide.
 *   avatar    1:1, tight on the head — the 72-96px byline mark on blog posts.
 *   social    1:1, full frame at 1200px — the Person JSON-LD `image`. JPEG only;
 *             crawlers are not reliable about AVIF/WebP.
 *
 * Crop windows are hand-placed against the master's face (centre x≈510, eyes
 * y≈385). The master carries a small generator mark in the bottom-right corner
 * (x≈940-990, y≈940-990); every crop stays clear of it. If the master is ever re-shot, re-check them here rather than
 * trusting a face detector.
 *
 * `sharp` is not declared here as a direct dependency by accident — it is
 * declared in devDependencies precisely so this script does not rely on Astro's
 * transitive copy.
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MASTER = resolve(ROOT, 'src/assets/about/josh-casual.png');
const OUT_DIR = resolve(ROOT, 'public/images/about');

/** Encoder settings, tuned once against this photograph — a bright, low-noise
 *  interior where AVIF can go fairly low before the skin tones flatten. */
const AVIF = { quality: 52, effort: 6, chromaSubsampling: '4:2:0' };
const WEBP = { quality: 78, effort: 6 };
const JPEG = { quality: 82, mozjpeg: true, chromaSubsampling: '4:2:0' };

const RENDITIONS = [
  {
    name: 'portrait',
    // 4:5 out of the square: full height, centred on the face.
    crop: { left: 101, top: 0, width: 819, height: 1024 },
    // Rendered at ~476px max (about hero, 12-col `wide` container) — 1000w
    // covers 2x there and on phones.
    widths: [400, 640, 1000],
    formats: ['avif', 'webp', 'jpg'],
  },
  {
    name: 'avatar',
    // Head and shoulders only; anything looser is mush at 72px.
    crop: { left: 257, top: 139, width: 506, height: 506 },
    widths: [96, 192, 288],
    formats: ['avif', 'webp', 'jpg'],
  },
  {
    name: 'social',
    crop: { left: 62, top: 0, width: 900, height: 900 },
    widths: [1200],
    formats: ['jpg'],
  },
];

mkdirSync(OUT_DIR, { recursive: true });

const kb = (n) => `${(n / 1024).toFixed(1)} kB`;
let total = 0;

for (const { name, crop, widths, formats } of RENDITIONS) {
  const aspect = crop.height / crop.width;

  for (const width of widths) {
    for (const format of formats) {
      const file = resolve(OUT_DIR, `josh-casual-${name}-${width}.${format}`);
      const pipeline = sharp(MASTER)
        .extract(crop)
        .resize(width, Math.round(width * aspect), { fit: 'cover', kernel: 'lanczos3' });

      if (format === 'avif') pipeline.avif(AVIF);
      else if (format === 'webp') pipeline.webp(WEBP);
      else pipeline.jpeg(JPEG);

      const { size } = await pipeline.toFile(file);
      total += size;
      console.log(`  ${`josh-casual-${name}-${width}.${format}`.padEnd(32)} ${kb(size).padStart(9)}`);
    }
  }
}

console.log(`\n${RENDITIONS.length} crops → ${kb(total)} total in public/images/about/`);
