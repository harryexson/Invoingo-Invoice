from pathlib import Path
import json
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
WORKSPACE = ROOT.parent
sys.path.insert(0, str(WORKSPACE / '.local-tools/launch-tts'))
tempfile.tempdir = str(WORKSPACE / '.local-tools/voice-temp')

import soundfile as sf
from kokoro_onnx import Kokoro

model = WORKSPACE / '.local-tools/launch-voice-model'
engine = Kokoro(str(model / 'kokoro-v1.0.onnx'), str(model / 'voices-v1.0.bin'))
out = ROOT / 'public/intro-v3/audio'
out.mkdir(parents=True, exist_ok=True)

lines = [
    ('cheryl-intro.wav', "Hi, I'm Cheryl Clark. Here's how I use QuickSend and Qbot to stay on top of invoices from my phone.", 'af_heart', 1.13),
    ('cheryl-question.wav', "Qbot, which invoices need attention? Prepare a friendly reminder for Tom Becker, and leave it for me to review.", 'af_heart', 1.13),
    ('qbot-overview.wav', "You're owed four thousand, one hundred seventy-one dollars and ninety-four cents across four invoices. Two are overdue, totaling two thousand, one hundred fifty dollars. Tom Becker's invoice I N V zero zero three nine for one thousand, one hundred fifty dollars is overdue and has been opened twice. I drafted a friendly reminder for your review. I won't send anything until you approve.", 'af_sarah', 1.2),
    ('qbot-paid.wav', "Nair Dental's invoice I N V zero zero four one is paid: two thousand, eight hundred sixty dollars and fifty cents by card. The payout was September thirtieth.", 'af_sarah', 1.2),
    ('qbot-draft.wav', "The draft is ready for you to review. You can edit it, or approve it when you're ready.", 'af_sarah', 1.2),
    ('cheryl-close.wav', "QuickSend. Clear invoice updates and follow-ups, right on your phone.", 'af_heart', 1.13),
]

manifest = []
for filename, text, voice, speed in lines:
    samples, sample_rate = engine.create(text, voice=voice, speed=speed, lang='en-us')
    sf.write(str(out / filename), samples, sample_rate, subtype='PCM_16')
    entry = {
        'file': filename,
        'text': text,
        'voice': f'Kokoro {voice}',
        'speed': speed,
        'durationSeconds': round(len(samples) / sample_rate, 3),
        'sampleRate': sample_rate,
        'engine': 'Kokoro 82M ONNX',
    }
    manifest.append(entry)
    print(f"{filename}: {entry['durationSeconds']:.2f}s", flush=True)

(out / 'timing.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
