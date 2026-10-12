# Invoingo launch film — revised product showcase

20-second, 1920 × 1080, 30 fps film created with the Brag skill and Hyperframes.

The composition uses screenshots of the actual landing page and mobile web preview: home, saved industry items, estimates, populated invoice editor, templates, sharing, invoice tracking, client checkout, paid confirmation, expenses and reports. iOS and Android frames present the shared preview; native apps remain in development. Payment data is fictional and the payment confirmation is an isolated local demo record, not a Stripe transaction.

Forest green, lime, heavy typography, animated device entrances, screen transitions, connecting arrows, a payment check and rotating brand star carry the visual treatment. The soundtrack and UI effects are locally synthesized originals.

Outputs: `brag.mp4`, `brag.jpg`, `verification.json`, and `review/` contact sheets. The settled send-and-track scene at 8.7 seconds is the poster and baked frame zero. MP4 uses H.264 Constrained Baseline, yuv420p and stereo AAC with fast-start metadata. The unique deployed filename is `landing/assets/invoingo-features-v2-final.mp4`.

Preview: http://127.0.0.1:4185/launch.html?v=2

Reproduce from the project root:

```powershell
node brag-output/tools/hf.cjs check brag-output/revision-2/composition
node brag-output/tools/hf.cjs render brag-output/revision-2/composition --output brag-output/revision-2/render.mp4 --fps 30 --quality high --workers 1 --no-browser-gpu --low-memory-mode
node brag-output/tools/deliver-revision.cjs
```

The earlier audio-only report could not be reproduced in the browser: the previous file also had a valid video stream. This revision introduces a fresh media filename, a visible feature poster, broader H.264 compatibility, and actual app screenshots throughout. Browser verification is recorded in `progress.md`.
