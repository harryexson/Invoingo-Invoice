from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import subprocess,sys
R=Path(__file__).resolve().parents[2]
base=R/(sys.argv[1] if len(sys.argv)>1 else 'brag-output')
out=base/'review';out.mkdir(exist_ok=True)
ff=R/'.local-tools/video-bin/ffmpeg.exe';src=base/'brag.mp4'
font=ImageFont.truetype(str(R/'landing/assets/inter-400.ttf'),12)
def sheet(prefix,w,h,cols,rows,filter):
 p=subprocess.Popen([str(ff),'-v','error','-i',str(src),'-vf',filter+f',scale={w}:{h}','-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE)
 n=0;page=0
 while True:
  raw=p.stdout.read(w*h*3)
  if len(raw)!=w*h*3:break
  k=n%(cols*rows)
  if k==0:im=Image.new('RGB',(w*cols,(h+20)*rows),'#163300');d=ImageDraw.Draw(im)
  x=k%cols*w;y=k//cols*(h+20);im.paste(Image.frombytes('RGB',(w,h),raw),(x,y));d.text((x+3,y+h+2),str(n) if prefix=='all' else f'{n*.5:.1f}s',font=font,fill='#9fe870')
  n+=1
  if n%(cols*rows)==0:im.save(out/f'{prefix}-{page:02d}.jpg',quality=90);page+=1
 if n%(cols*rows):im.save(out/f'{prefix}-{page:02d}.jpg',quality=90)
 p.wait();print(prefix,n,'frames inspected')
sheet('overview',384,216,5,8,'fps=2')
sheet('all',144,81,12,10,'null')
