# Invoingo launch film

Final deliverable: `brag.mp4` — 20 seconds, 1920×1080, 30fps, 600 frames, H.264 video and stereo 48 kHz AAC audio. `brag.jpg` is the chosen settled final identity frame, also baked into frame zero. `share-copy.txt` is the launch caption.

The film adapts the Muse reference's motion principles with original Invoingo graphics, fictional product data and an original locally synthesized soundtrack. No reference footage or audio is included in the film. The reference download is ignored by Git.

`composition/index.html` and `composition/motion.js` are the editable Hyperframes source. `tools/score.py` creates the original soundtrack. `tools/hf.cjs` runs the installed local Hyperframes CLI. Local render command, from the project root:

```text
node brag-output/tools/hf.cjs render brag-output/composition --output brag-output/brag.mp4 --fps 30 --quality high --workers 1 --no-browser-gpu --low-memory-mode
node brag-output/tools/deliver.cjs
```

Hyperframes check passed with zero errors, all 77 text checks meeting WCAG AA, and seven non-blocking composition-organization warnings. Final full-file decoding and media metadata verification passed; all 600 output frames were reviewed in chronological contact sheets. A one-frame scene-boundary flash was corrected before delivery. `verification.json` records final media metadata.

Run `npm run landing`, then open `http://127.0.0.1:4185/launch.html` to play or download. The landing page's existing film player also uses this new film. App-store availability remains in development, and payment/delivery scenes are illustrative.
