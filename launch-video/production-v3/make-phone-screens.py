from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/intro-v3/screens'
OUT.mkdir(parents=True, exist_ok=True)
FONT = Path('C:/Windows/Fonts/arial.ttf')
FONT_BOLD = Path('C:/Windows/Fonts/arialbd.ttf')

def f(size, bold=False):
    return ImageFont.truetype(str(FONT_BOLD if bold else FONT), size)

def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)

def text(draw, pos, value, size, color='#2b2540', bold=False):
    draw.text(pos, value, font=f(size, bold), fill=color)

def wrapped(draw, value, font, max_width):
    words = value.split()
    lines, current = [], ''
    for word in words:
        candidate = f'{current} {word}'.strip()
        if draw.textbbox((0,0), candidate, font=font)[2] > max_width and current:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines

def phone_base(title, subtitle):
    im = Image.new('RGB', (1920,1080), '#f0eef6')
    d = ImageDraw.Draw(im)
    d.text((140,98), 'QUICKSEND  /  QBOT', font=f(24,True), fill='#62558b')
    title_lines = wrapped(d, title, f(34,True), 500)
    for i, line in enumerate(title_lines[:2]):
        d.text((140,804+i*44), line, font=f(34,True), fill='#241744')
    d.text((140,902), subtitle, font=f(21), fill='#625b71')
    # Phone shadow and body
    shadow = Image.new('RGBA', im.size, (0,0,0,0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle((694,30,1226,1048), radius=72, fill=(32,22,58,75))
    im = Image.alpha_composite(im.convert('RGBA'), shadow.filter(ImageFilter.GaussianBlur(28)))
    d = ImageDraw.Draw(im)
    rounded(d,(700,20,1220,1040),70,'#121116')
    rounded(d,(714,34,1206,1026),58,'#ffffff')
    # Status bar / app header
    text(d,(746,58),'9:41',23,'#231a3d',True)
    text(d,(1090,58),'●●●  ▰',20,'#231a3d',True)
    rounded(d,(902,48,1018,74),16,'#111116')
    rounded(d,(738,94,790,146),15,'#7b5cff')
    text(d,(750,102),'Q',31,'#ffffff',True)
    text(d,(806,94),'Qbot',29,'#241744',True)
    text(d,(807,128),'● Knows all 43 of your invoices',15,'#797285')
    text(d,(1125,105),'◖))',20,'#625b71',True)
    d.line((730,162,1190,162),fill='#eeebf2',width=2)
    rounded(d,(744,921,1178,968),23,'#f6f4f8')
    text(d,(764,936),'Ask Qbot anything...',16,'#8d8698')
    d.ellipse((1139,935,1154,950), fill='#7b5cff')
    d.line((730,978,1190,978),fill='#efedf2',width=2)
    for x, label in [(758,'Invoices'),(838,'Estimates'),(932,'Qbot'),(1022,'Clients'),(1110,'Account')]:
        text(d,(x,986),'•',18,'#7b5cff' if label=='Qbot' else '#777184',True)
        text(d,(x-12,1007),label,13,'#7b5cff' if label=='Qbot' else '#777184',label=='Qbot')
    return im, d

def bubble(d, y, value, user=False, height=None):
    x0,x1 = ((846,1170) if user else (744,1178))
    fill = '#28184f' if user else '#f4f3f7'
    color = '#ffffff' if user else '#2b2540'
    font=f(21)
    lines=wrapped(d,value,font,x1-x0-32)
    h=height or max(68, 28 + len(lines)*30)
    rounded(d,(x0,y,x1,y+h),24,fill)
    ty=y+17
    for line in lines:
        text(d,(x0+16,ty),line,21,color)
        ty+=30
    return y+h

def overview():
    im,d=phone_base('A clear picture of what needs attention.','Invoice balances and follow-up status, in Qbot.')
    y=185
    y=bubble(d,y,'Which invoices need attention? Prepare a friendly reminder for Tom Becker.',True,114)+18
    y=bubble(d,y,"You're owed $4,171.94 across 4 invoices. Two are overdue, totaling $2,150.00.",False,116)+15
    rounded(d,(744,y,1178,y+104),18,'#ffffff','#e5e1eb',2)
    rounded(d,(762,y+20,815,y+73),27,'#f2efff')
    text(d,(775,y+31),'TB',18,'#6a55c1',True)
    text(d,(830,y+18),'Tom Becker',22,'#28223a',True)
    text(d,(830,y+51),'INV-0039 · Overdue · Opened twice',15,'#797285')
    text(d,(1025,y+29),'$1,150.00',19,'#28223a',True)
    y+=122
    bubble(d,y,"I've drafted a friendly reminder for your review. I won't send anything until you approve.",False,132)
    return im

def paid():
    im,d=phone_base('Payment updates, at a glance.','A confirmed payment is easy to verify.')
    y=190
    y=bubble(d,y,'Did Nair Dental pay?',True,72)+22
    y=bubble(d,y,'Yes. INV-0041 is paid: $2,860.50 by card. Payout Sep 30.',False,116)+24
    rounded(d,(744,y,1178,y+302),24,'#ffffff','#e7e3ed',2)
    text(d,(774,y+24),'PAID',18,'#168462',True)
    text(d,(774,y+65),'Nair Dental',29,'#28223a',True)
    text(d,(774,y+109),'Invoice INV-0041 · Card',19,'#797285')
    text(d,(774,y+171),'$2,860.50',42,'#241744',True)
    d.line((774,y+230,1148,y+230),fill='#eeeaf3',width=2)
    text(d,(774,y+253),'Payout Sep 30',18,'#6d667a')
    return im

def draft():
    im,d=phone_base('A reminder ready for your review.','Qbot prepares the message; you approve it.')
    y=187
    y=bubble(d,y,"Here's the draft. I won't send anything until you say so.",False,93)+17
    rounded(d,(744,y,1178,y+474),24,'#ffffff','#e7e3ed',2)
    text(d,(770,y+23),'To Tom Becker · tom.becker@outlook.com',16,'#6d667a')
    d.line((770,y+59,1152,y+59),fill='#eeeaf3',width=2)
    body='Hi Tom, a friendly reminder that invoice INV-0039 for $1,150.00 is overdue. You can pay online at pay.quicksend.app. Thanks, Sam'
    yy=y+80
    for line in wrapped(d,body,f(20),370):
        text(d,(770,yy),line,20,'#332c44')
        yy+=32
    rounded(d,(770,y+333,1008,y+389),28,'#c5b7ff')
    text(d,(796,y+349),'Send reminder',18,'#28184f',True)
    rounded(d,(1024,y+333,1148,y+389),28,'#ffffff','#aaa2b3',2)
    text(d,(1055,y+349),'Edit',18,'#332c44',True)
    text(d,(770,y+420),'Draft · awaiting your approval',16,'#8b8496')
    return im

for name, maker in [('overview',overview),('paid',paid),('draft',draft)]:
    maker().convert('RGB').save(OUT/f'{name}.png', optimize=True)
    print(OUT/f'{name}.png')
