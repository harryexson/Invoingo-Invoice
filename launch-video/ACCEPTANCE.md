# Film acceptance record

## Verified during construction

- Fresh browser inspection of Invoingo's current invoice list and MioBot, October 8, 2026.
- Three existing invoice records drive the script. No old reference numbers or competitor branding are in the composition.
- Maya Chen independently exists in the application and is used under the brief's stated exception.
- No unattended-collection, automatic-email, instant-push or live-payment claim.
- Real current UI screenshots preserved in the source directory and used in the film.
- Fictional AI presenter explicitly approved by the user and disclosed on screen.
- Application colors, logo, font files and the actual MioBot mark retained.
- Half-size complete drafts rendered and sixteen-frame contact sheets inspected.
- Incorrect screenshot scaling corrected after visual QA.
- Three distinct local neural voices generated; all eight cues fit with no overlaps.
- Music and effects are composed from synthesized sound, with no reference-track sampling.
- Remotion TypeScript check passes.

## Technical final checks

The generated `dist/invoingo-launch-45s-verification.json` records final dimensions, frame rate, duration, frame count and audio tracks. Remotion assembles and renders all visual frames and mixes the scene audio. An audio-only finishing pass trims AAC encoder padding and targets -16 LUFS / -1.5 dBTP, preserving the Remotion video stream. Final contact sheets and stills are retained alongside the export.

## Scope distinctions

The application demo contains fictional preview records. They are actual records in the running app, not transactions or invoices from a real customer business. No external email was sent or payment taken. Cheryl is an animated generated portrait with neural narration; this version does not contain a lip-synced avatar video. The soundtrack is original synthesis, not a licensed Epidemic Sound recording. Remotion is used for the final composition, not the older HyperFrames project.

## Delivered export — October 8, 2026

- Master verified: 1920 × 1080, 30 fps, 1,350 frames, exactly 45.000 seconds, stereo AAC at 48 kHz.
- Measured final audio: -16.9 LUFS integrated, -1.4 dBFS true peak; eight voice cues with no overlaps.
- Sixteen-frame visual contact sheet inspected, including the last frame; automated black-frame detection found no events.
- Master, poster, contact sheet and English captions copied to root dist and landing/assets.
- Localhost launch player reports 45 seconds and 1920 × 1080, loads successfully and starts playback.
- Landing-page film dialog now uses the same new master and captions.
