from pathlib import Path
import json, sys, tempfile
ROOT = Path(__file__).resolve().parents[1]
WORKSPACE = ROOT.parent
sys.path.insert(0, str(WORKSPACE / '.local-tools/launch-tts'))
tempfile.tempdir = str(WORKSPACE / '.local-tools/voice-temp')
import soundfile as sf
from kokoro_onnx import Kokoro
model = WORKSPACE / '.local-tools/launch-voice-model'
engine = Kokoro(str(model/'kokoro-v1.0.onnx'), str(model/'voices-v1.0.bin'))
plan = json.loads((Path(__file__).parent/'production-plan.json').read_text(encoding='utf-8'))
out = Path(__file__).parent/'audio'
out.mkdir(exist_ok=True)
report = []
for shot in plan['shots']:
    if 'audio' not in shot:
        continue
    samples, sr = engine.create(shot['spokenScript'], voice='af_heart', speed=1.06, lang='en-us')
    seconds = len(samples)/sr
    sf.write(str(out/shot['audio']), samples, sr, subtype='PCM_16')
    cue = {'file':shot['audio'], 'start':shot['start'], 'duration':round(seconds,3), 'slot':shot['duration'], 'fits':seconds <= shot['duration']-.2, 'voice':'Kokoro af_heart', 'script':shot['script']}
    report.append(cue)
    print(cue['file'], cue['duration'], 'seconds', 'fits' if cue['fits'] else 'TOO LONG', flush=True)
(out/'timing.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
if not all(c['fits'] for c in report):
    raise SystemExit('Narration timing requires repair before production.')
