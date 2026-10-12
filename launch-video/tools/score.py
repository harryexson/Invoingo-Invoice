"""Original 45-second score and sound design. No external music or samples."""
from pathlib import Path
import numpy as np, wave, json
OUT=Path(__file__).resolve().parents[1]/'public/audio';OUT.mkdir(parents=True,exist_ok=True)
SR=48000;N=45*SR;rng=np.random.default_rng(81026)
music=np.zeros((N,2));sfx=np.zeros((N,2))
def add(target,signal,start,gain=1,pan=0):
    i=round(start*SR)
    if i<0 or i>=N:return
    a=np.asarray(signal)[:N-i]*gain
    target[i:i+len(a),0]+=a*np.sqrt((1-pan)/2)
    target[i:i+len(a),1]+=a*np.sqrt((1+pan)/2)
def note(m,d=1,kind='keys'):
    t=np.arange(round(d*SR))/SR;f=440*2**((m-69)/12)
    if kind=='pad':s=(np.sin(2*np.pi*f*t)+.25*np.sin(2*np.pi*f*1.004*t)+.14*np.sin(2*np.pi*f*2*t))*np.minimum(t/.18,1)*np.minimum((d-t)/.4,1)
    elif kind=='bass':s=(np.sin(2*np.pi*f*t)+.16*np.sin(2*np.pi*f*2*t))*np.minimum(t/.015,1)*np.exp(-t*4)*np.minimum((d-t)/.05,1)
    else:s=(np.sin(2*np.pi*f*t+.8*np.sin(2*np.pi*2*f*t)*np.exp(-t*13))+.1*np.sin(2*np.pi*3*f*t))*np.minimum(t/.007,1)*np.exp(-t*5)*np.minimum((d-t)/.08,1)
    return s
# A distinct F-minor / Ab-major palette with a syncopated, light R&B pulse.
chords=[[65,68,72,75],[61,65,68,72],[68,72,75,79],[63,67,70,74]];beat=60/112;bar=beat*4
for n in range(22):
    start=8+(n-4)*bar;c=chords[n%4]
    if start<0:continue
    for j,m in enumerate(c):add(music,note(m,bar+.5,'pad'),start,.043,(j-1.5)*.4)
    for k in [0,1.5,2.5,3.25]:
        for j,m in enumerate(c):add(music,note(m+12,.85),start+k*beat+j*.025,.037,(j-1.5)*.3)
    if start>=8 and start<39:
        for k in [0,.75,2,2.75]:add(music,note(c[0]-24,.5,'bass'),start+k*beat,.23)
        for k in [0,2]:
            t=np.arange(int(.28*SR))/SR;phase=np.cumsum(46+90*np.exp(-t*38))/SR*2*np.pi
            add(music,np.sin(phase)*np.exp(-t*19),start+k*beat,.25)
        for k in [1,3]:
            t=np.arange(int(.12*SR))/SR;noise=rng.normal(size=len(t));noise-=np.roll(noise,1)
            add(music,noise*np.exp(-t*50),start+k*beat,.033,.1)
        for k in np.arange(0,4,.5):
            t=np.arange(int(.04*SR))/SR;noise=rng.normal(size=len(t));noise-=np.roll(noise,1)
            add(music,noise*np.exp(-t*110),start+k*beat,.01,-.25 if k%1 else .25)
# Opening: short, spacious notes. Beat lands exactly on the eight-second reveal.
for t,m in [(0,77),(1.1,80),(3.0,75),(4.3,72),(6,77)]:add(music,note(m,1.4),t,.08,.1)
for at in [2.1,5.2,8,14,21,26.3,30.5,33,39]:
    t=np.arange(int(.33*SR))/SR;n=rng.normal(size=len(t));n=np.convolve(n,np.ones(18)/18,mode='same')
    add(sfx,n*np.sin(np.pi*t/.33)**2,at,.14,-.2)
for at in [0.2,2.1,5.2,15,17,23.5,26.3,29,30.5,34.2]:
    t=np.arange(int(.08*SR))/SR;add(sfx,np.sin(2*np.pi*(900*t+280*t*t))*np.exp(-t*70),at,.1)
for base in [34.2,39.7]:
    for j,m in enumerate([77,80,84]):add(sfx,note(m,1.5),base+j*.12,.13,(j-1)*.3)
# Built-in voice ducking, smooth ramps, original score ends at 45 seconds.
clock=np.arange(N)/SR;duck=np.ones(N)
for start,end in [(0,2),(2.1,4.5),(8,14),(15,18),(24.2,32.3),(33.5,38.8)]:
    envelope=np.minimum(np.clip((clock-start)/.12,0,1),np.clip((end-clock)/.2,0,1))
    duck*=1-.45*envelope
music*=duck[:,None];music*=np.minimum(clock/.03,1)[:,None]*np.clip((45-clock)/2.2,0,1)[:,None]
for filename,track in [('original-score.wav',music),('sound-design.wav',sfx)]:
    peak=float(np.max(np.abs(track)));track=np.tanh(track)*min(1,.72/max(peak,.001))
    with wave.open(str(OUT/filename),'wb') as f:f.setnchannels(2);f.setsampwidth(2);f.setframerate(SR);f.writeframes((track*32767).astype('<i2').tobytes())
    print(filename,45,'seconds', 'peak',round(float(np.max(np.abs(track))),3))
