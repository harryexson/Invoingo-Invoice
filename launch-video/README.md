# Invoingo cinematic product film

Remotion project: 1920 × 1080, 30 fps, 1,350 frames, exactly 45 seconds.

## Creative decisions

The product is the hero. The film moves from a large invoice question to the actual MioBot UI, a fictional product presenter, the real invoice list, a contextual reminder draft and a recorded payment. The six scene boundaries are 0, 8, 14, 21, 33 and 39 seconds. The brand holds at the end. There is no generic stock footage or borrowed reference music.

The scene labels were adapted for accuracy. This build has invoice lookup, balances, saved conversations, reminder drafts and approved provider sending. It does not justify a blanket unattended “autopilot” promise. No email or payment was triggered during filming. Financial information is explicitly fictional application preview data, not real customer records.

## Source of truth

`src/data/invoingoData.ts` contains the shared records. October 8 browser verification showed Maya Chen INV-1043 total $781.94 with $681.94 remaining; Alex Morgan INV-1042 paid $1,302.00; Maya Chen INV-1041 draft $705.25. The first client name is permitted by the brief's exception because it independently exists in Invoingo. Dates were checked against the application's source records. Screenshot sources are preserved unchanged in `public/screens/*-full.jpg`; Remotion crops the phone from those full-page captures. Fresh captures were made for the invoice list, MioBot conversation, reminder draft and paid screen. The partial invoice remains due October 19, so the script does not call it overdue.

Typography uses the application's bundled Inter fonts. The centralized forest, lime, mist, fog, border and muted colors match `mobile.css`. MioBot retains its actual lime square and star mark. It has no face in the app; its animation uses a restrained spring landing and rotation rather than inventing eyes.

## Audio and presenter

The user approved a fictional AI presenter. `public/cheryl.png` was created with the built-in image generator, then copied into this project. It is a still portrait animated with camera movement, not a lip-synced avatar clip. Prompt: fictional warm, confident Black woman in her late 30s, short natural curls, forest jacket and cream shirt, right-half composition, soft off-white studio and lime architectural panel, no text or props.

Three distinct neural voices were generated locally with [Kokoro ONNX](https://github.com/thewh1teagle/kokoro-onnx): Cheryl `af_heart`, MioBot `af_sarah`, user `am_michael`. The engine is MIT licensed; [model weights](https://huggingface.co/hexgrad/Kokoro-82M) are Apache 2.0. No person's voice was cloned. Voice files and measured durations are listed in `public/audio/voices.json`. Temporary Windows voice drafts remain available but are not used by the final composition.

`tools/score.py` composes the original 112 BPM music and synchronized sound effects. The strongest opening beat lands at eight seconds. It uses synthesized pads, keys, bass and drums, a unique F-minor/Ab-major progression, soft pops, transitions and confirmation chimes. It uses no Epidemic Sound audio or melody. The score has voice ducking and a clean final fade.

References: [Rene film](https://whatships.com/videos/rene/) for conversation-first framing and restrained product presentation; [Drama instrumental](https://www.epidemicsound.com/music/tracks/5ec11d18-dd39-4034-8666-b866656a1b1a/) as a general music mood reference. No footage, logos or audio were copied.

## Rebuild

```powershell
cd launch-video
npm ci
npm run studio
npm run draft
npm run render
npm run poster
```

Remotion and CLI versions are pinned to 4.0.534. The package lock is included for reproducibility. Chromium and local voice models are cached under ignored dependency directories and are not project media deliverables.

`tools/qa.py` creates a labeled sixteen-frame contact sheet, including the final frame at 44.966 seconds, and checks duration, resolution, frame count, frame rate and audio. Rendering is frame driven: there are no CSS transitions or time-dependent animation loops.

## Submission status

This film demonstrates the current web/mobile preview. It does not claim app-store availability, production cloud sync, real payments in the demo, live AI interpretation or automatic collections. Store subscription wiring and submission assets are separate unfinished work from the earlier request.

The final audio-only finishing pass trims AAC padding to exactly 45.000 seconds and targets -16 LUFS / -1.5 dBTP. It preserves every Remotion-rendered video frame. SRT and WebVTT subtitles accompany the movie.
