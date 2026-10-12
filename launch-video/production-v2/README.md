# Invoingo professional introduction — production status

The current visual authority is documented in REFERENCE-GUIDE.md. The user-supplied portrait, three-angle character sheet, and office image are preserved under reference-inputs/. The office image matches Higgsfield office asset 729f92bb-747a-4e60-99fd-31892b167421. The older identity upload and seated keyframe describe a different appearance and must not be used for new shots.

The latest user revision is to integrate new Cheryl footage into the existing launch film while retaining its real app and MioBot scenes. The planned 57-second cut keeps source time 00:00–00:12, inserts one 15-second entrance/sit/introduction take, then resumes the source at 00:15 through its 00:45 end. The detailed cut map and corrected no-sigh prompt are `overlay-revision-plan.md` and `intro-generation-prompt.txt`. The earlier standalone 60-second composition remains available as an alternate plan.

## Provider status — October 9, 2026

For the integrated take, Higgsfield's live Generate button showed Kling 3.0, 15 seconds, 16:9, 720p, Audio on at 30 credits. The previous take was also Kling 3.0, but at 1080p and used the superseded outfit; the new prompt removes the invitation to pause, explicitly excludes sighs, and includes the requested walk-in and sit-down. At the live 4K setting the same Kling form showed 90 credits. The newer 720p configuration is the lower-cost choice, and the 1920×1080 Remotion render will upscale the inserted clip. The final integrated composition is registered as `InvoingoIntroIntegrated` at 57 seconds / 1710 frames.

The corrected Kling prompt and 30-credit quote are staged in Higgsfield. The new portrait and triptych are local only: the asset picker/dropzone did not open a file chooser through this browser session. No generation was submitted and no new job ID exists. Do not submit without the new identity references attached. The user approved additional credits for the finished video up to 60 seconds and confirmed that the full cut must retain the earlier film's MioBot UI.

The prior 15-second Kling 3.0 result visible in provider history used the superseded outfit and identity reference. It is not accepted footage and must not be reused as the presenter source. Do not resubmit any unknown outcome.

The integrated render gate requires `public/intro/videos/introduction.mp4` plus the preserved source copy `public/intro/videos/invoingo-launch-base.mp4`. The source copy matches the original `dist/invoingo-launch-45s.mp4` by SHA-256. TypeScript passes; the integrated draft currently blocks as expected because the new generated clip has not been created. After generation, inspect actual motion, mouth synchronization, speech, app UI, verified demo records, and sound before final rendering. Do not replace localhost film assets until the 1920×1080 export passes review.

Fictional app data used in the demo: Maya Chen INV-1043, USD 781.94, Partial, due 2026-10-19; Alex Morgan INV-1042, USD 1,302.00, Paid, due 2026-10-02; Maya Chen INV-1041, USD 705.25, Draft, due 2026-10-20. Reminder drafts are reviewed; no external email or payment has been triggered.
