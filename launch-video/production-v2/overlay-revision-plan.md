# Invoingo intro revision and integration

The 15-second standalone take was too short for the requested office movement and its prompt invited an overly long pause. Replace it with the revised Kling 3.0 take described in `intro-generation-prompt.txt`: one continuous 15-second 720p shot with Cheryl walking in, sitting down, and speaking the complete introduction at the end. The Higgsfield Generate button currently quotes **30 credits** for Kling 3.0, 15 seconds, 16:9, 720p. The prior 15-second Kling 3.0 configuration at 4K quoted 90 credits. This is a lower-cost resolution setting; the previous short clip was also Kling 3.0.

## Edit against the existing launch film

Use `dist/invoingo-launch-45s.mp4` as the source layer and retain its contact-sheet visual language (`dist/invoingo-launch-45s-contact.jpg`). The integrated cut is 57 seconds at 30 fps (1710 frames):

| Final time | Source | Treatment |
| --- | --- | --- |
| 00:00–00:12 | Existing launch film, source 00:00–00:12 | Keep the original opening, MioBot question, app screens and Cheryl title card. |
| 00:12–00:27 | New `public/intro/videos/introduction.mp4` | Insert the continuous entrance, sit-down and spoken introduction. The generated image follows the latest supplied identity and office references. |
| 00:27–00:57 | Existing launch film, source 00:15–00:45 | Resume at the actual invoice, MioBot reminder review, recorded payment and end card. This removes the former short presenter take at source 00:12–00:15 and preserves the actual product footage and demo records. |

The final cut retains the earlier app/MioBot sections and contact-sheet look while giving the presenter a complete physical introduction. Original app records remain the verified demo data: Maya Chen INV-1043, USD 781.94, Partial; Alex Morgan INV-1042, USD 1,302, Paid; and Maya Chen INV-1041, USD 705.25, Draft. Reminder stays a reviewable draft; do not imply that email or payment was sent during production.

## Readiness

The credit quote is checked and remains subject to the Generate button's displayed total at submission. No new generation was submitted in preparing this revision. Higgsfield's asset picker currently exposes the earlier office/character uploads but not the newly supplied portrait, triptych and office reference files; the browser runtime does not expose local file selection. Use the exact new references before generation so Cheryl's green-suit identity and office match the approved references. Do not fall back to the superseded charcoal-suit seated source.
