from pathlib import Path
import sys,json,tempfile
ROOT=Path(__file__).resolve().parents[2]
task_temp=ROOT/'.local-tools/voice-temp';task_temp.mkdir(parents=True,exist_ok=True)
tempfile.tempdir=str(task_temp)
sys.path.insert(0,str(ROOT/'.local-tools/launch-tts'))
import soundfile as sf
from kokoro_onnx import Kokoro
model=ROOT/'.local-tools/launch-voice-model'
engine=Kokoro(str(model/'kokoro-v1.0.onnx'),str(model/'voices-v1.0.bin'))
out=ROOT/'launch-video/public/audio'
# Brand pronunciations are written phonetically in spoken copy only.
lines=[
 ('user-1.wav','Where is my invoice for Alex Morgan?','am_michael',1.05),
 ('mio-1.wav','Alex’s invoice is paid in full.','af_sarah',1.1),
 ('cheryl-tight.wav','Meet In voingo. Your invoice maker on the go. And now, Mee oh Bot helps keep your work moving.','af_heart',1.1),
 ('user-2.wav','Draft a reminder for the first one.','am_michael',1.12),
 ('mio-2.wav','Here’s a draft. Nothing has been sent.','af_sarah',1.1),
 ('user-3.wav','Make it friendlier.','am_michael',1.05),
 ('mio-3.wav','Ready for your review.','af_sarah',1.05),
 ('mio-paid.wav','Alex Morgan’s payment is recorded. One thousand, three hundred and two dollars.','af_sarah',1.12),
]
manifest=[]
for name,text,voice,speed in lines:
 samples,sr=engine.create(text,voice=voice,speed=speed,lang='en-us')
 sf.write(str(out/name),samples,sr,subtype='PCM_16')
 duration=len(samples)/sr;print(name,round(duration,3),voice,flush=True)
 manifest.append(dict(file=name,text=text,voice=voice,duration=duration,sampleRate=sr,engine='Kokoro 82M ONNX'))
(out/'voices.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
