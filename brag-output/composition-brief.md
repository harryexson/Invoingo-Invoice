# Hyperframes composition brief
Create Invoingo's 20-second 1920×1080 30fps launch film in composition/index.html using the storyboard in brag-plan.md. Render locally to brag.mp4, choose a settled poster to brag.jpg, bake poster at frame zero and supply share-copy.txt.

Tone: polished, energetic product showreel. Reference motion principles: floating cards, continuous visual anchors, changes in camera scale, phrase-by-phrase type, inline icons, readable holds and emphatic confirmations. Original Invoingo visuals only.

Use local Inter fonts and local GSAP. Register a paused seek-safe timeline under window.__timelines.invoingo. All scenes and media have explicit timing. The six scenes show the actual invoice → send/track → payment-record flow with a reports coda. Follow the exact identity and fictional values in the plan.

Audio: original 120 BPM score and synthesized UI accents, generated in tools/score.py and stored in composition/assets/score.wav. Per-frame RMS extracted directly from the generated PCM supports a very subtle halo intensity treatment. Major transitions are beat-locked. No narration. No outside service, publishing, user secrets or live payment/email operations required.

Validate using Hyperframes check with contrast enabled, inspect scene snapshots, render high quality with one worker on this low-memory Windows machine. Verify 20-second H.264/AAC output, 600 frames, stereo audio and full decoding. Deliver inline MP4, poster, composition source and share caption.
