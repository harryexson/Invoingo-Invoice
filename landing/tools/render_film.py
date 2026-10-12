"""Render an original silent product film with Pillow and FFmpeg. No cloud video API."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import math, subprocess, sys

ROOT = Path(__file__).resolve().parents[1]
FFMPEG = ROOT.parent / '.local-tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
W, H, FPS, SECONDS = 1280, 720, 24, 16
FOREST, LIME, MIST, PAPER = '#163300', '#9fe870', '#e2f6d5', '#f5f7f2'
FONT = Path('C:/Windows/Fonts/arialbd.ttf')
BODY = Path('C:/Windows/Fonts/arial.ttf')
fonts = {}
def font(size, bold=True):
    key=(size,bold)
    if key not in fonts: fonts[key]=ImageFont.truetype(str(FONT if bold else BODY), size)
    return fonts[key]
def text(draw, xy, value, size, fill=FOREST, bold=True):
    draw.text(xy, value, font=font(size,bold), fill=fill, spacing=-4)
def ease(x): return 1-(1-min(1,max(0,x)))**3
def card(draw, box, radius=25, fill='white', outline=None, width=1):
    draw.rounded_rectangle(box, radius, fill=fill, outline=outline, width=width)
def phone(draw, x,y, state, progress):
    card(draw,(x,y,x+286,y+560),40,FOREST)
    card(draw,(x+8,y+8,x+278,y+552),34,'white')
    text(draw,(x+24,y+19),'9:41',11)
    card(draw,(x+105,y+15,x+180,y+34),10,FOREST)
    text(draw,(x+24,y+65),'invoingo',24)
    text(draw,(x+24,y+110),'YOUR WORK. YOUR WAY.',10)
    label=['New estimate','Invoice #1042','Payment recorded'][state]
    text(draw,(x+24,y+143),label,24)
    card(draw,(x+22,y+195,x+264,y+310),15,MIST)
    text(draw,(x+40,y+213),'BILL TO',10)
    text(draw,(x+40,y+239),'Olivia Rhye',21)
    text(draw,(x+40,y+276),'Brand identity project',11,bold=False)
    text(draw,(x+25,y+340),'Brand identity',13)
    text(draw,(x+209,y+340),'$1,200',12)
    text(draw,(x+25,y+376),'Social templates',13)
    text(draw,(x+222,y+376),'$300',12)
    draw.line((x+24,y+413,x+262,y+413),fill='#dbe2d5',width=1)
    text(draw,(x+25,y+430),'Total',14)
    text(draw,(x+153,y+423),'$1,500',27)
    card(draw,(x+22,y+481,x+264,y+525),22,LIME)
    text(draw,(x+61,y+494),['Save estimate','Share invoice','All settled'][state],15)
photo=Image.open(ROOT/'assets/maker-studio.png').convert('RGB')
cmd=[str(FFMPEG),'-y','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','fast','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart',str(ROOT/'assets/invoingo-film.mp4')]
proc=subprocess.Popen(cmd,stdin=subprocess.PIPE,stderr=subprocess.DEVNULL)
for frame in range(FPS*SECONDS):
    t=frame/FPS;scene=min(3,int(t//4));local=t%4;p=ease(local/0.8)
    image=Image.new('RGB',(W,H),[PAPER,FOREST,LIME,PAPER][scene]);draw=ImageDraw.Draw(image)
    if scene<3:
        fg= LIME if scene==1 else FOREST
        text(draw,(60,37),'i↗  invoingo',25,fg)
        text(draw,(60,160+int(35*(1-p))),['MAKE IT.','SEND IT.','GET ON\nWITH IT.'][scene],94,fg)
        descriptions=['From a good idea to a clear estimate.','Your work, ready to share.','A little less admin. A lot more living.']
        text(draw,(66,420),descriptions[scene],22,fg,False)
        text(draw,(66,625),'ESTIMATE  /  INVOICE  /  GET PAID',13,fg)
        draw.ellipse((780,65,1260,650),fill=[LIME,'#326015','#c1f2a5'][scene])
        x=850+int(100*(1-p));y=75+int(math.sin(t*1.7)*7)
        phone(draw,x,y,scene,p)
        if local>1.2:
            q=ease((local-1.2)/.6);bx=690+int(60*(1-q))
            card(draw,(bx,480,bx+290,580),18,'white',FOREST)
            text(draw,(bx+20,498),['Estimate ready','Ready to share','Payment recorded'][scene],17)
            text(draw,(bx+20,534),['Clear details. Confident start.','Email. Text. One link.','$1,500.00 · Example activity'][scene],13,bold=False)
    else:
        scale=max(W/photo.width,H/photo.height)*(1.02+local*.012)
        resized=photo.resize((int(photo.width*scale),int(photo.height*scale)),Image.Resampling.LANCZOS)
        image=resized.crop(((resized.width-W)//2,(resized.height-H)//2,(resized.width+W)//2,(resized.height+H)//2))
        overlay=Image.new('RGBA',(W,H),(0,0,0,0));od=ImageDraw.Draw(overlay)
        od.rectangle((0,0,550,H),fill=(22,51,0,215))
        image=Image.alpha_composite(image.convert('RGBA'),overlay).convert('RGB');draw=ImageDraw.Draw(image)
        text(draw,(60,48),'invoingo',32,LIME)
        text(draw,(60,205),'GOOD WORK.\nGREAT\nFINISH.',70,'white')
        text(draw,(63,555),'Your business. In your pocket.',22,LIME,False)
        text(draw,(63,660),'PRODUCT PREVIEW · ILLUSTRATIVE WORKFLOW',11,'white')
    # A four-part timeline connects the film's narrative beats.
    for n in range(4):
        x=60+n*294;draw.rectangle((x,699,x+275,702),fill='#668450')
        if t>=n*4:draw.rectangle((x,699,x+int(275*min(1,(t-n*4)/4)),702),fill='white' if scene==1 else FOREST)
    if frame==0:image.save(ROOT/'assets/film-poster.jpg',quality=92)
    proc.stdin.write(image.tobytes())
proc.stdin.close()
if proc.wait():raise SystemExit('FFmpeg rendering failed')
print('Rendered assets/invoingo-film.mp4 (16 seconds, 1280 × 720, 24 fps)')
