from pathlib import Path
import sys, tempfile
root=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(root/'.local-tools/launch-tts'))
tempfile.tempdir=str(root/'.local-tools/voice-temp')
import soundfile as sf
from kokoro_onnx import Kokoro
model=root/'.local-tools/launch-voice-model'
engine=Kokoro(str(model/'kokoro-v1.0.onnx'),str(model/'voices-v1.0.bin'))
samples,rate=engine.create('Your reminder draft is ready for review.',voice='af_sarah',speed=1.06,lang='en-us')
sf.write(str(root/'launch-video/public/intro/audio/v4/miobot-proof-response.wav'),samples,rate,subtype='PCM_16')
print(f'Proof response: {len(samples)/rate:.3f} seconds')
