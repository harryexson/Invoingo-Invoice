from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import subprocess,json,sys
R=Path(__file__).resolve().parents[2];out=R/'launch-video/dist';ff=R/'.local-tools/video-bin/ffmpeg.exe';probe=R/'.local-tools/video-bin/ffprobe.exe'
src=out/(sys.argv[1] if len(sys.argv)>1 else 'invoingo-launch-draft.mp4')
times=list(range(0,45,3))+[44.966]
font=ImageFont.truetype(str(R/'landing/assets/inter-600.ttf'),17)
sheet=Image.new('RGB',(1600,1024),'#e8ebe6');draw=ImageDraw.Draw(sheet)
for i,t in enumerate(times):
 dest=out/f'qa-{i:02}.jpg'
 subprocess.run([str(ff),'-y','-v','error','-ss',str(t),'-i',str(src),'-frames:v','1','-vf','scale=400:225',str(dest)],check=True)
 tile=Image.open(dest).convert('RGB');x=(i%4)*400;y=(i//4)*256;sheet.paste(tile,(x,y));draw.text((x+12,y+232),f'{t:05.2f}s',font=font,fill='#163300')
sheet.save(out/(src.stem+'-contact.jpg'),quality=94)
data=json.loads(subprocess.check_output([str(probe),'-v','error','-show_streams','-show_format','-of','json',str(src)]))
video=next(s for s in data['streams'] if s['codec_type']=='video');audio=next(s for s in data['streams'] if s['codec_type']=='audio')
report={'file':str(src),'duration':float(data['format']['duration']),'width':video['width'],'height':video['height'],'frameRate':video['r_frame_rate'],'frames':video.get('nb_frames'),'audioCodec':audio['codec_name'],'audioSampleRate':audio['sample_rate'],'audioChannels':audio['channels']}
(out/(src.stem+'-verification.json')).write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
assert report['duration']==45.0
assert report['frameRate']=='30/1'
assert report['frames']=='1350'
