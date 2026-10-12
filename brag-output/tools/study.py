from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import subprocess
R=Path(__file__).resolve().parents[2]; out=R/'brag-output/reference'
ff=R/'.local-tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
src=out/'muse-reference.mp4'
font=ImageFont.truetype(str(R/'landing/assets/inter-400.ttf'),12)
def sheets(label,w,h,cols,rows,filter):
 p=subprocess.Popen([str(ff),'-v','error','-i',str(src),'-vf',filter+f',scale={w}:{h}','-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE)
 n=0;page=0;im=None
 while True:
  raw=p.stdout.read(w*h*3)
  if len(raw)!=w*h*3:break
  k=n%(cols*rows)
  if k==0:im=Image.new('RGB',(w*cols,(h+19)*rows),'#20241f');d=ImageDraw.Draw(im)
  x=k%cols*w;y=k//cols*(h+19);im.paste(Image.frombytes('RGB',(w,h),raw),(x,y))
  d.text((x+3,y+h+2),str(n) if label=='all' else f'{n}s',font=font,fill='white')
  n+=1
  if n%(cols*rows)==0:im.save(out/f'{label}-{page:02d}.jpg',quality=88);page+=1
 if n%(cols*rows):im.save(out/f'{label}-{page:02d}.jpg',quality=88)
 p.wait();print(label,n,'frames',page+1,'sheets')
sheets('overview',320,180,5,6,'fps=1')
sheets('all',144,81,12,10,'null')
