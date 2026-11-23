// gta6-meme-x-01: entry for make.fun's "Post a GTA 6 meme on X".
// Deterministic, standard library only, no network: copies the meme image
// into MAKEFUN_OUTPUT_DIR and writes the post metadata beside it.
// Run: MAKEFUN_OUTPUT_DIR=out node main.ts
// Re-running produces byte-identical files and identical stdout.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT: string = dirname(fileURLToPath(import.meta.url));
const OUT: string = process.env.MAKEFUN_OUTPUT_DIR ?? 'out';

const IMAGE_NAME = 'gta6-meme.png';
const imagePath: string = join(ROOT, 'assets', IMAGE_NAME);
const image: Buffer = readFileSync(imagePath);
// PNG IHDR: width = bytes 16..19, height = bytes 20..23, big-endian.
const width: number = image.readUInt32BE(16);
const height: number = image.readUInt32BE(20);
const sha256: string = createHash('sha256').update(image).digest('hex');
const postText: string = readFileSync(join(ROOT, 'post.txt'), 'utf8');

const metadata = {
  competition: 'gta6-meme-x-01',
  title: 'GTA 6 meme',
  image: {
    file: IMAGE_NAME,
    width,
    height,
    bytes: image.length,
    sha256,
  },
  post: postText,
  play_code: 'makefun-croquet-lynx-cactus',
  bounty: 'https://make.fun/bounty/gta6-meme-x-01',
  account: '@Borjigin_Mahgal',
};

mkdirSync(OUT, { recursive: true });
copyFileSync(imagePath, join(OUT, IMAGE_NAME));
const metadataJson: string = JSON.stringify(metadata, null, 2) + '\n';
writeFileSync(join(OUT, 'post.json'), metadataJson);
process.stdout.write(metadataJson);
