"""Original Invoingo score. No sampled or externally licensed audio."""
from pathlib import Path
import numpy as np, wave, json
ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'composition/assets'
SR=48000; SECONDS=20; N=SR*SECONDS
rng=np.random.default_rng(1707); mix=np.zeros((N,2),np.float64)
def add(s,start,gain=1,pan=0):
 i=int(start*SR)
 if i>=N:return
 s=np.asarray(s)[:N-i]*gain
 mix[i:i+len(s),0]+=s*np.sqrt((1-pan)/2)
 mix[i:i+len(s),1]+=s*np.sqrt((1+pan)/2)
def note(m,d=.4,kind='pluck'):
 t=np.arange(int(d*SR))/SR; f=440*2**((m-69)/12)
 if kind=='pad':
  env=np.minimum(t/.12,1)*np.minimum((d-t)/.38,1)
  s=(np.sin(2*np.pi*f*t)+.22*np.sin(2*np.pi*f*2*t)+.12*np.sin(2*np.pi*f*1.003*t))*env
 elif kind=='bass':
  env=np.minimum(t/.008,1)*np.exp(-t*5)*np.minimum((d-t)/.045,1)
  s=(np.sin(2*np.pi*f*t)+.25*np.sin(2*np.pi*f*2*t))*env
 else:
  env=(1-np.exp(-t*180))*np.exp(-t*7)*np.minimum((d-t)/.06,1)
  s=(np.sin(2*np.pi*f*t+1.6*np.sin(2*np.pi*f*2*t)*np.exp(-t*16))+.15*np.sin(2*np.pi*f*3*t))*env
 return s
chords=[[62,66,69,73],[59,62,66,69],[55,59,62,66],[57,61,64,69]]
for bar in range(10):
 chord=chords[bar%4] if bar<9 else chords[0]
 start=bar*2
 for j,m in enumerate(chord):add(note(m,2.6,'pad'),start,.042,(-1 if j%2 else 1)*.65)
 for k in range(8):
  m=chord[[0,2,1,3,2,1,3,2][k]]+12
  volume=.09 if bar<8 else .07
  s=note(m,.65)
  add(s,start+k*.25,volume,(-.4 if k%2 else .4))
  add(s,start+k*.25+.1875,volume*.2,.6)
 for k in [0,.75,1,1.5]:add(note(chord[0]-24,.42,'bass'),start+k,.24)
for beat in range(38):
 start=beat*.5
 t=np.arange(int(.23*SR))/SR
 freq=48+100*np.exp(-t*32);phase=np.cumsum(freq)/SR*2*np.pi
 kick=np.sin(phase)*np.exp(-t*19)+rng.normal(0,1,len(t))*.025*np.exp(-t*180)
 add(kick,start,.38)
 if beat%2:
  t=np.arange(int(.17*SR))/SR;n=rng.normal(0,1,len(t));n=np.convolve(n,[.2,-.4,.2],mode='same')
  add(n*np.exp(-t*34),start,.13)
 for offset in [0,.25]:
  t=np.arange(int(.045*SR))/SR;n=rng.normal(0,1,len(t));n=n-np.roll(n,1)
  add(n*np.exp(-t*95),start+offset,.018,(-.35 if offset else .35))
# Airy motion sweeps: band-limited noise, shaped to the camera acceleration.
for moment in [2.5,7,10.5,14,17]:
 t=np.arange(int(.42*SR))/SR;n=rng.normal(0,1,len(t));n=np.convolve(n,np.ones(13)/13,mode='same')
 env=np.sin(np.pi*t/.42)**2
 add(n*env,moment-.25,.16,-.3)
 add(n*env,moment-.22,.12,.3)
# Soft clicks exactly at item / timeline arrivals.
for moment in [3.5,4,5.5,8,8.5,9]:
 t=np.arange(int(.07*SR))/SR
 add(np.sin(2*np.pi*(1100*t+180*t*t))*np.exp(-t*85),moment,.11,.05)
# Payment resolution and final sonic signature.
for base in [11.0,17.25]:
 for j,m in enumerate([74,78,81]):
  add(note(m,1.5),base+j*.13,.17,(j-1)*.25)
# Gentle stereo delays/reverb; restrained sidechain on the tonal bed.
dry=mix.copy()
for delay,gain in [(.083,.07),(.167,.045),(.333,.03)]:
 d=int(delay*SR);mix[d:]+=dry[:-d,::-1]*gain
fade=np.minimum(np.arange(N)/SR/.025,1)*np.clip((SECONDS-np.arange(N)/SR)/1.2,0,1)
mix*=fade[:,None];mix=np.tanh(mix*1.2)
mix*=.86/max(.001,np.max(np.abs(mix)))
pcm=(mix*32767).astype('<i2')
OUT.mkdir(parents=True,exist_ok=True)
with wave.open(str(OUT/'score.wav'),'wb') as f:
 f.setnchannels(2);f.setsampwidth(2);f.setframerate(SR);f.writeframes(pcm.tobytes())
energy=[]
for frame in range(600):
 a=int(frame*SR/30);b=int((frame+1)*SR/30);energy.append(float(np.sqrt(np.mean(mix[a:b]**2))))
peak=max(energy);energy=[round(v/peak,4) for v in energy]
(OUT/'energy.js').write_text('window.INVOINGO_ENERGY='+json.dumps(energy)+';')
(ROOT/'audio-notes.md').write_text('# Original soundtrack\n\n20 seconds, 120 BPM, D-major/B-minor harmony, stereo 48 kHz PCM. Synthesized locally using tools/score.py. No samples or borrowed music. Warm pads, glassy plucks, rounded bass, kick, clap, hats, transitions and confirmation chimes. Peak is limited to 0.86 full scale before AAC encoding. RMS envelope drives a subtle stage halo.\n')
print('Original stereo score generated:',len(pcm)/SR,'seconds; peak',round(float(np.max(np.abs(mix))),3))
