"""Export the approved Invoingo brand to deterministic store and native sizes.

Usage: python tools/prepare-brand-assets.py --source LOGO --mark TRANSPARENT_MARK
The wordmark is cropped from the supplied original; its lettering is never redrawn.
"""
import argparse
import json
import shutil
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'store-assets'
WEB = ROOT / 'landing' / 'assets'
NATIVE = ROOT / 'expo-preview' / 'assets'
RESAMPLE = Image.Resampling.LANCZOS

def save(image, relative):
    dest = OUT / relative
    dest.parent.mkdir(parents=True, exist_ok=True)
    image.save(dest, optimize=True)
    return dest

def square(mark, size, proportion=.67, background='white'):
    image = Image.new('RGBA', (size, size), background)
    logo = mark.copy()
    logo.thumbnail((round(size*proportion), round(size*proportion)), RESAMPLE)
    image.alpha_composite(logo, ((size-logo.width)//2, (size-logo.height)//2))
    return image if background == (0,0,0,0) else image.convert('RGB')

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', required=True)
    parser.add_argument('--mark', required=True)
    parser.add_argument('--icon', required=True)
    parser.add_argument('--splash-source', required=True)
    args = parser.parse_args()
    WEB.mkdir(parents=True, exist_ok=True)
    NATIVE.mkdir(parents=True, exist_ok=True)
    source = Image.open(args.source).convert('RGB')
    bounds = ImageChops.difference(source, Image.new('RGB', source.size, 'white')).convert('L').point(lambda p:255 if p>45 else 0).getbbox()
    wordmark = source.crop((bounds[0]-8, bounds[1]-8, bounds[2]+8, bounds[3]+8))
    save(source, 'brand/approved-original.png')
    save(wordmark, 'brand/invoingo-wordmark.png')
    wordmark.save(WEB / 'invoingo-wordmark.png', optimize=True)
    wordmark.save(NATIVE / 'invoingo-wordmark.png', optimize=True)
    mark = Image.open(args.mark).convert('RGBA')
    # Discard faint edge noise from the generated transparent extraction.
    alpha = mark.getchannel('A').point(lambda p:0 if p<160 else p)
    mark.putalpha(alpha)
    mark = mark.crop(alpha.getbbox())
    save(mark, 'brand/invoingo-mark.png')
    mark.save(WEB / 'invoingo-mark.png', optimize=True)
    app_icon=Image.open(args.icon).convert('RGB')
    save(app_icon,'brand/sparkle-icon-master.png')
    splash_source=Image.open(args.splash_source).convert('RGB')
    save(splash_source,'brand/approved-splash-original.png')
    # Export the supplied dark lockup without changing its lettering.
    green=splash_source.getchannel('G').point(lambda p:255 if p>115 else 0)
    box=green.getbbox()
    lockup=splash_source.crop((box[0]-20,box[1]-20,box[2]+20,box[3]+20)).convert('RGBA')
    # Feather only the empty production border; retain the supplied lettering.
    border=Image.new('L',lockup.size,255)
    draw=ImageDraw.Draw(border)
    for inset in range(20):
        draw.rectangle((inset,inset,lockup.width-1-inset,lockup.height-1-inset),outline=round(255*inset/20))
    lockup.putalpha(border)
    save(lockup,'brand/invoingo-splash-lockup.png')
    lockup.save(NATIVE/'invoingo-splash-lockup.png',optimize=True)
    lockup.save(WEB/'invoingo-splash-lockup.png',optimize=True)
    def icon(size):return app_icon.resize((size,size),RESAMPLE)
    icons = []
    for size in [20,29,40,48,58,60,72,76,80,87,96,114,120,144,152,167,180,192,512,1024]:
        p = save(icon(size), f'ios/AppIcon.appiconset/icon-{size}.png')
        icons.append({'filename':p.name,'size':size})
    contents = {'images':[{'filename':'icon-1024.png','idiom':'universal','platform':'ios','size':'1024x1024'}], 'info':{'author':'xcode','version':1}}
    (OUT/'ios/AppIcon.appiconset/Contents.json').write_text(json.dumps(contents,indent=2))
    save(icon(1024), 'ios/icon-dark-1024.png')
    save(icon(512), 'android/play-store-icon-512.png')
    for density,size in [('mdpi',48),('hdpi',72),('xhdpi',96),('xxhdpi',144),('xxxhdpi',192)]:
        save(icon(size), f'android/mipmap-{density}/ic_launcher.png')
    foreground = icon(1024).convert('RGBA')
    save(foreground, 'android/adaptive-foreground-1024.png')
    mono=Image.new('RGBA',foreground.size,'white')
    mono.putalpha(foreground.getchannel('G').point(lambda p:max(0,min(255,round((145-p)*255/45)))))
    save(mono, 'android/adaptive-monochrome-1024.png')
    save(Image.new('RGB',(1024,1024),'#9fe870'),'android/adaptive-background-1024.png')
    splash_icon=icon(1024).convert('RGBA')
    mask=Image.new('L',(1024,1024),0);ImageDraw.Draw(mask).rounded_rectangle((0,0,1023,1023),radius=220,fill=255);splash_icon.putalpha(mask)
    save(splash_icon,'brand/splash-icon.png')
    for name,img in [('invoingo-icon.png',icon(1024)),('icon.png',icon(1024)),('favicon.png',icon(192)),('android-icon-foreground.png',foreground),('android-icon-monochrome.png',mono),('android-icon-background.png',Image.new('RGB',(1024,1024),'#9fe870')),('splash-icon.png',splash_icon)]:
        img.save(NATIVE/name,optimize=True)
    icon(192).save(WEB/'invoingo-icon-192.png',optimize=True)
    icon(512).save(WEB/'invoingo-icon-512.png',optimize=True)
    icon(1024).save(WEB/'invoingo-icon-1024.png',optimize=True)
    icon(32).save(WEB/'invoingo-favicon.png',optimize=True)
    splash_icon.save(WEB/'invoingo-splash-icon.png',optimize=True)
    themed=Image.new('RGBA',mono.size,'#163300');themed.alpha_composite(mono)
    themed.convert('RGB').resize((512,512),RESAMPLE).save(WEB/'invoingo-monochrome-preview.png',optimize=True)
    # Full-size previews are reference artwork. Native launch uses the responsive plugin.
    splashes=[]
    for platform,devices in [('ios',[(1170,2532),(1290,2796),(1320,2868),(2048,2732)]),('android',[(1080,1920),(1080,2400),(1440,3200)])]:
        for width,height in devices:
            for mode,color in [('light','#ffffff'),('dark','#000900')]:
                canvas=Image.new('RGB',(width,height),color)
                # 160 dp visual footprint at a representative 3x phone density.
                side=round(width*160/390)
                if platform=='ios' and mode=='dark':
                    glyph=lockup.copy();glyph.thumbnail((round(width*300/390),height//3),RESAMPLE)
                    canvas.paste(glyph,((width-glyph.width)//2,(height-glyph.height)//2),glyph)
                else:
                    glyph=splash_icon.copy();glyph.thumbnail((side,side),RESAMPLE)
                    canvas.paste(glyph,((width-glyph.width)//2,(height-glyph.height)//2),glyph)
                relative=f'{platform}/splash-{width}x{height}-{mode}.png'
                save(canvas,relative);splashes.append(relative)
                if (platform=='ios' and width==1290) or (platform=='android' and width==1080 and height==2400):
                    canvas.save(WEB/f'invoingo-splash-{platform}-{mode}.png',optimize=True)
    feature=Image.new('RGB',(1024,500),'#e8ebe6')
    lockup=wordmark.copy();lockup.thumbnail((660,150),RESAMPLE)
    feature.paste(lockup,((1024-lockup.width)//2,(500-lockup.height)//2))
    save(feature,'android/feature-graphic-1024x500.png')
    manifest={'brand':'Invoingo','source':'Two user-supplied approved brand images','mark':'AI-assisted extraction of arrow and full-bleed adaptation of supplied sparkle tile','iconBackground':'Green gradient','splashBackgroundLight':'#ffffff','splashBackgroundDark':'#000900','iosIcon':'ios/AppIcon.appiconset/icon-1024.png','androidIcon':'android/play-store-icon-512.png','splashes':splashes,'note':'Splash PNGs are visual reference exports. Native iOS launch and Android 12+ system splash are configured through expo-splash-screen. Dark mode is the configured launch treatment; light exports are alternate references.'}
    (OUT/'manifest.json').write_text(json.dumps(manifest,indent=2))
    if (ROOT/'MONETIZATION.md').exists():shutil.copyfile(ROOT/'MONETIZATION.md',OUT/'MONETIZATION.md')
    shutil.make_archive(str(WEB/'invoingo-store-assets'),'zip',OUT)
    print(json.dumps({'wordmark':str(WEB/'invoingo-wordmark.png'),'pack':str(WEB/'invoingo-store-assets.zip'),'pngs':len(list(OUT.rglob('*.png'))),'splashPreviews':len(splashes)}))

if __name__=='__main__':main()
