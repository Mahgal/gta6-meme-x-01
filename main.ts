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
// PNG signature: 8 bytes 89 50 4E 47 0D 0A 1A 0A. Fail loudly if the asset is not a PNG.
const PNG_SIGNATURE: Buffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (image.length < 24 || !image.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error('gta6-meme.png is not a PNG: bad signature');
}
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
// Verify the copy: read it back and confirm its SHA-256 matches the source.
const copiedHash: string = createHash('sha256').update(readFileSync(join(OUT, IMAGE_NAME))).digest('hex');
if (copiedHash !== sha256) {
  throw new Error(`copy verification failed for ${IMAGE_NAME}: hash mismatch`);
}
const metadataJson: string = JSON.stringify(metadata, null, 2) + '\n';
writeFileSync(join(OUT, 'post.json'), metadataJson);
process.stdout.write(metadataJson);
