"""Original 20-second Invoingo motion film, rendered with local Inter fonts."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import math, subprocess

ROOT = Path(__file__).resolve().parents[1]
FFMPEG = ROOT.parent / '.local-tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
W,H,FPS,SECONDS = 1280,720,24,20
FOREST,LIME,MIST,FOG = '#163300','#9fe870','#e2f6d5','#e8ebe6'
photo = Image.open(ROOT/'assets/workday-editorial.png').convert('RGB')
fonts = {}
def font(size,bold=True):
    key=(size,bold)
    if key not in fonts: fonts[key]=ImageFont.truetype(str(ROOT/'assets'/('inter-900.ttf' if bold else 'inter-400.ttf')),size)
    return fonts[key]
def text(draw,xy,value,size,fill=FOREST,bold=True):
    draw.text(xy,value,font=font(size,bold),fill=fill,spacing=-5)
def ease(value): return 1-(1-min(1,max(0,value)))**3
def card(draw,box,fill='white',radius=22,outline=None): draw.rounded_rectangle(box,radius,fill=fill,outline=outline,width=1)
def star(draw,cx,cy,radius,angle,color):
    for n in range(8):
        a=angle+n*math.pi/4
        draw.line((cx-math.cos(a)*radius,cy-math.sin(a)*radius,cx+math.cos(a)*radius,cy+math.sin(a)*radius),fill=color,width=5)
def device(draw,x,y,scene,local):
    card(draw,(x+12,y+18,x+316,y+595),'#ccd5c5' if scene!=1 else '#326015')
    card(draw,(x,y,x+302,y+576),FOREST,42)
    card(draw,(x+7,y+7,x+295,y+569),'white',36)
    text(draw,(x+23,y+20),'9:41',11)
    card(draw,(x+109,y+14,x+192,y+34),FOREST,14)
    text(draw,(x+24,y+60),'invoingo.',26)
    text(draw,(x+24,y+111),['New estimate','Invoice #0024','Payment record'][scene],25)
    card(draw,(x+24,y+161,x+278,y+257),MIST,17)
    text(draw,(x+40,y+177),'PREPARED FOR',9,bold=False)
    text(draw,(x+40,y+199),'Olivia Studio',21)
    text(draw,(x+40,y+234),'Brand identity project',10,bold=False)
    for n,(name,amount) in enumerate([('Brand identity','$1,200'),('Social templates','$300')]):
        yy=y+285+n*58+int((1-ease((local-.15-n*.12)/.5))*12)
        text(draw,(x+25,yy),name,13,bold=False)
        text(draw,(x+208,yy),amount,13)
        draw.line((x+25,yy+31,x+277,yy+31),fill='#dce2d8',width=1)
    text(draw,(x+25,y+414),'Total',13,bold=False)
    text(draw,(x+150,y+406),'$1,500',28)
    card(draw,(x+24,y+477,x+278,y+523),LIME if scene==2 else FOREST,24)
    text(draw,(x+48,y+491),['Save estimate','Share invoice','Payment recorded'][scene],14,FOREST if scene==2 else LIME)
    card(draw,(x+111,y+552,x+194,y+556),FOREST,3)

def render(scene,local):
    bg=[FOG,FOREST,LIME,FOREST,FOG][scene]
    fg=LIME if scene in (1,3) else FOREST
    image=Image.new('RGB',(W,H),bg);draw=ImageDraw.Draw(image)
    p=ease(local/.9)
    if scene==4:
        scale=max(W/photo.width,H/photo.height)*(1.03+local*.012)
        resized=photo.resize((int(photo.width*scale),int(photo.height*scale)),Image.Resampling.LANCZOS)
        image=resized.crop(((resized.width-W)//2,(resized.height-H)//2,(resized.width+W)//2,(resized.height+H)//2))
        overlay=Image.new('RGBA',(W,H));od=ImageDraw.Draw(overlay)
        od.rectangle((0,0,605,H),fill=(22,51,0,236))
        image=Image.alpha_composite(image.convert('RGBA'),overlay).convert('RGB');draw=ImageDraw.Draw(image)
        text(draw,(55,44),'invoingo.',32,LIME)
        text(draw,(55,198+int(25*(1-p))),'GOOD WORK.\nGREAT FINISH.',66,LIME)
        text(draw,(59,435),'Your business. In your pocket.',23,'white',False)
        card(draw,(57,526,330,583),LIME,30)
        text(draw,(80,543),'EXPLORE THE APP  →',16)
        text(draw,(59,639),'iOS / ANDROID · WEB PREVIEW',11,LIME,False)
    else:
        text(draw,(56,40),'invoingo.',29,fg)
        text(draw,(58,142+int(30*(1-p))),['MAKE IT.','SEND IT.','GET PAID.','SEE IT\nCLEAR.'][scene],89,fg)
        descriptions=['A clear estimate. A confident start.','One invoice. Ready for wherever you work.','Less chasing. A clearer balance.','Your whole business, in one good place.']
        text(draw,(61,378 if scene!=3 else 390),descriptions[scene],20,fg,False)
        text(draw,(62,628),['01 / ESTIMATES','02 / INVOICE & SHARE','03 / PAYMENTS','04 / REPORTS & EXPENSES'][scene],12,fg,False)
        star(draw,615,80,36,local*.25,fg)
        if scene<3:
            ring='#326015' if scene==1 else MIST if scene==2 else LIME
            draw.ellipse((776,48,1260,646),fill=ring)
            x=858+int(95*(1-p));y=64+int(math.sin(local*1.6)*6)
            device(draw,x,y,scene,local)
            if local>.9:
                q=ease((local-.9)/.6);bx=683+int(45*(1-q));by=488
                card(draw,(bx,by,bx+300,by+101),'white',18)
                card(draw,(bx+17,by+22,bx+61,by+66),LIME,23)
                text(draw,(bx+30,by+33),'✓',19)
                text(draw,(bx+76,by+23),['Estimate ready','Invoice ready to share','Payment recorded'][scene],15)
                text(draw,(bx+76,by+51),['A good first impression.','Email · Text · Link · QR','$1,500.00 · Example'][scene],11,bold=False)
        else:
            x=726+int(70*(1-p));y=132
            card(draw,(x+12,y+15,x+470,y+456),'#326015',28)
            card(draw,(x,y,x+458,y+440),'white',28)
            text(draw,(x+28,y+29),'YOUR BUSINESS OVERVIEW',11)
            text(draw,(x+27,y+74),'$8,450',51)
            text(draw,(x+29,y+137),'Recorded income · Example month',12,bold=False)
            heights=[.38,.62,.47,.84,.69,1]
            for n,h in enumerate(heights):
                amount=ease((local-.4-n*.09)/.7)*h*155
                card(draw,(x+29+n*66,y+341-amount,x+72+n*66,y+341),FOREST if n%2 else LIME,5)
            text(draw,(x+28,y+370),'Income. Expenses. A clearer next move.',12,bold=False)
    for n in range(5):
        x=58+n*235
        draw.rectangle((x,696,x+215,699),fill='#668450')
        if n<scene:draw.rectangle((x,696,x+215,699),fill=LIME if scene in (1,3,4) else FOREST)
        if n==scene:draw.rectangle((x,696,x+int(215*min(1,local/4)),699),fill=LIME if scene in (1,3,4) else FOREST)
    return image

command=[str(FFMPEG),'-y','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(ROOT/'assets/invoingo-film.mp4')]
proc=subprocess.Popen(command,stdin=subprocess.PIPE,stderr=subprocess.DEVNULL)
for frame in range(FPS*SECONDS):
    t=frame/FPS;scene=min(4,int(t//4));local=t%4
    image=render(scene,local)
    if scene<4 and local>3.7:image=Image.blend(image,render(scene+1,0),(local-3.7)/.3)
    if frame==FPS:image.save(ROOT/'assets/film-poster.jpg',quality=93)
    proc.stdin.write(image.tobytes())
proc.stdin.close()
if proc.wait():raise SystemExit('FFmpeg rendering failed')
print('Rendered 20-second campaign film with Inter typography and five animated scenes.')
