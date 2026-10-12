from pathlib import Path
import json,re
R=Path(__file__).resolve().parents[1]; voices={v['file']:v for v in json.loads((R/'public/audio/voices.json').read_text())}
cues=[('user-1.wav',8),('mio-1.wav',90),('cheryl-tight.wav',240),('user-2.wav',730),('mio-2.wav',798),('user-3.wav',885),('mio-3.wav',930),('mio-paid.wav',1010)]
def stamp(t):
 ms=round(t*1000);return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'
blocks=[]
for i,(file,frame) in enumerate(cues,1):
 v=voices[file];text=v['text'].replace('In voingo','Invoingo').replace('Mee oh Bot','MioBot')
 blocks.append(f'{i}\n{stamp(frame/30)} --> {stamp(frame/30+v["duration"])}\n{text}\n')
(R/'dist/invoingo-launch-45s.srt').write_text('\n'.join(blocks),encoding='utf-8')
vtt='WEBVTT\n\n'+re.sub(r'(\d{2}:\d{2}:\d{2}),',r'\1.','\n'.join(blocks))
(R/'dist/invoingo-launch-45s.vtt').write_text(vtt,encoding='utf-8')
