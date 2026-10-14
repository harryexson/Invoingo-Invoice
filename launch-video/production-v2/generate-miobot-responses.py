from pathlib import Path
import json
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
WORKSPACE = ROOT.parent
sys.path.insert(0, str(WORKSPACE / '.local-tools/launch-tts'))
temp_root = WORKSPACE / '.local-tools/voice-temp'
temp_root.mkdir(parents=True, exist_ok=True)
tempfile.tempdir = str(temp_root)

import soundfile as sf
from kokoro_onnx import Kokoro

model = WORKSPACE / '.local-tools/launch-voice-model'
engine = Kokoro(str(model / 'kokoro-v1.0.onnx'), str(model / 'voices-v1.0.bin'))
out = ROOT / 'public/intro/audio'
out.mkdir(parents=True, exist_ok=True)

responses = [
    (
        'miobot-maya-response.wav',
        "Maya Chen's invoice I N V, one zero four three, has six hundred eighty-one dollars and ninety-four cents outstanding, due October nineteenth, twenty twenty-six. The reminder is drafted for review; nothing is sent.",
        1.35,
    ),
    (
        'miobot-alex-response.wav',
        "Alex Morgan's invoice I N V, one zero four two, is paid in full: one thousand, three hundred and two dollars. Payment recorded October second, twenty twenty-six.",
        1.35,
    ),
]

manifest = []
for filename, text, speed in responses:
    samples, sample_rate = engine.create(text, voice='af_sarah', speed=speed, lang='en-us')
    sf.write(str(out / filename), samples, sample_rate, subtype='PCM_16')
    duration = len(samples) / sample_rate
    manifest.append({
        'file': filename,
        'text': text,
        'voice': 'Kokoro af_sarah',
        'speed': speed,
        'durationSeconds': round(duration, 3),
        'sampleRate': sample_rate,
        'engine': 'Kokoro 82M ONNX',
    })
    print(f'{filename}: {duration:.3f} seconds', flush=True)

manifest_path = ROOT / 'production-v2/audio/miobot-response-timing.json'
manifest_path.write_text(json.dumps(manifest, indent=2), encoding='utf-8')
