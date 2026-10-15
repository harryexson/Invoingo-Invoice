from pathlib import Path
import json, sys, tempfile

root = Path(__file__).resolve().parent
workspace = root.parents[1]
sys.path.insert(0, str(workspace / '.local-tools/launch-tts'))
tempfile.tempdir = str(workspace / '.local-tools/voice-temp')
import soundfile as sf
from kokoro_onnx import Kokoro

model = workspace / '.local-tools/launch-voice-model'
engine = Kokoro(str(model / 'kokoro-v1.0.onnx'), str(model / 'voices-v1.0.bin'))
lines = [
    ('cheryl-introduction.wav', 'Today, we\'re introducing MioBot, the AI assistant inside Invoingo. It helps you create invoices, keep track of payments, and follow up without the busywork.', 'af_heart'),
    ('cheryl-business.wav', 'Running a business is hard enough without chasing invoices. Just ask MioBot what\'s been sent, what\'s been opened, and what\'s overdue.', 'af_heart'),
    ('cheryl-question.wav', 'Mio, what needs a follow-up?', 'af_heart'),
    ('miobot-maya.wav', 'Maya Chen\'s I N V one zero four three is partially paid, with six hundred eighty-one dollars and ninety-four cents remaining. Your reminder draft is ready for review; nothing was sent.', 'af_sarah'),
    ('cheryl-reminder.wav', 'When a payment is late, MioBot can prepare a friendly follow-up. You review it and tap Send.', 'af_heart'),
    ('miobot-alex.wav', 'Alex Morgan\'s I N V one zero four two is paid in full: one thousand, three hundred and two dollars.', 'af_sarah'),
    ('cheryl-paid-update.wav', 'And when your customer pays, Invoingo keeps you in the loop.', 'af_heart'),
    ('cheryl-less-time.wav', 'Less time on invoices. More time growing your business.', 'af_heart'),
]

out = root / 'audio'
out.mkdir(exist_ok=True)
public_out = workspace / 'launch-video' / 'public' / 'intro' / 'audio' / 'v4'
public_out.mkdir(parents=True, exist_ok=True)
report = []
for filename, text, voice in lines:
    samples, rate = engine.create(text, voice=voice, speed=1.06, lang='en-us')
    duration = len(samples) / rate
    sf.write(str(out / filename), samples, rate, subtype='PCM_16')
    sf.write(str(public_out / filename), samples, rate, subtype='PCM_16')
    report.append({'file': filename, 'voice': voice, 'durationSeconds': round(duration, 3), 'text': text})
    print(f'{filename}: {duration:.3f}s ({voice})', flush=True)
(out / 'timing.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
