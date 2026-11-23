# GTA 6 meme — make.fun gta6-meme-x-01

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/Mahgal/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/Mahgal/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

An original GTA 6 meme for make.fun's "Post a GTA 6 meme on X" bounty ($500 in USDC): a neon Vice City street, the make.fun ghost in shades, a pink sports car, and a controller — "GTA 6 IS FINALLY OUT" / "MY SLEEP SCHEDULE: WASTED".

The meme goes out on X from [@Borjigin_Mahgal](https://x.com/Borjigin_Mahgal) with the text in `post.txt` (scheduled 20:30 CST, 2026-11-23; the meme is the post's first and only media).

## Run it

Node 22, standard library only — nothing to install, no network.

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

This copies `assets/gta6-meme.png` into the output directory, writes `post.json` beside it (image size, SHA-256, and the exact post text), and prints the same metadata to stdout. Re-running produces byte-identical files and identical stdout.

## What is in this repo

- `assets/gta6-meme.png` — the meme image (2048×1152 PNG).
- `post.txt` — the exact X post text, including the play code `makefun-croquet-lynx-cactus`.
- `main.ts` — the deterministic entrypoint described above.

## Referral code

`6d6dq8sh` — https://make.fun/r/6d6dq8sh

---

<sub>Entered on [make.fun](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>
