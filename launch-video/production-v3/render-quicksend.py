from pathlib import Path
import subprocess
import tempfile
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
WORKSPACE = ROOT.parent
FFMPEG = WORKSPACE / '.local-tools/video-bin/ffmpeg.exe'
PUBLIC = ROOT / 'public'
VIDEO = PUBLIC / 'intro/videos'
VOICE = PUBLIC / 'intro-v3/audio'
SCREENS = PUBLIC / 'intro-v3/screens'
OUT = ROOT / 'dist/quicksend-qbot-launch-60s-1080p.mp4'
OUT.parent.mkdir(parents=True, exist_ok=True)

def run(args):
    print(' '.join(str(x) for x in args[:5]) + ' ...', flush=True)
    subprocess.run([str(x) for x in args], check=True)

def make_end_card(path):
    im=Image.new('RGB',(1920,1080),'#211443')
    d=ImageDraw.Draw(im)
    bold=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',82)
    regular=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',34)
    d.rounded_rectangle((846,300,1074,528),radius=56,fill='#7b5cff')
    d.text((899,333),'Q',font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',142),fill='white')
    d.text((665,585),'QuickSend',font=bold,fill='white')
    d.text((587,704),'Invoices, payments, follow-ups.',font=regular,fill='#d6ceef')
    im.save(path)

def make_handset_overlay(path):
    im=Image.new('RGBA',(70,130),(255,255,255,255))
    d=ImageDraw.Draw(im)
    font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',7)
    bold=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',8)
    d.rounded_rectangle((1,1,68,129),radius=8,outline='#211443',width=2,fill='white')
    d.rectangle((3,3,66,22),fill='#fbfaff')
    d.text((10,7),'Qbot',font=bold,fill='#28184f')
    d.line((4,23,65,23),fill='#ded9e9',width=1)
    d.text((6,30),'2 overdue',font=bold,fill='#352a51')
    d.text((6,44),'$2,150 total',font=font,fill='#51486a')
    d.rounded_rectangle((5,60,64,86),radius=5,fill='#f0eef5')
    d.text((8,65),'Tom Becker',font=bold,fill='#28184f')
    d.text((8,76),'INV-0039',font=font,fill='#51486a')
    d.rounded_rectangle((5,94,64,119),radius=5,fill='#28184f')
    d.text((8,100),'Draft ready',font=bold,fill='white')
    return im

with tempfile.TemporaryDirectory(prefix='quicksend-v3-', dir=ROOT / 'production-v3') as temp_name:
    temp=Path(temp_name)
    make_end_card(temp/'end-card.png')
    overlay=temp/'handset-ui.png'
    make_handset_overlay(overlay).save(overlay)
    segment_specs=[
        ('entrance','video','office-entrance-take.mp4',0,6.0),
        ('intro','video','seated-introduction-take.mp4',3,6.2),
        ('question','video-question','miobot-question-take.mp4',0,6.6),
        ('overview','image','overview.png',0,20.4),
        ('paid','image','paid.png',0,9.6),
        ('draft','image','draft.png',0,4.2),
        ('closing','video','closing-take.mp4',3,3.9),
        ('endcard','image','end-card.png',0,3.1),
    ]
    segment_files=[]
    for name, kind, filename, start, duration in segment_specs:
        target=temp/f'{name}.mp4'
        if kind in ('video','video-question'):
            source=VIDEO/filename
            video_filter='scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1,fps=30'
            inputs=['-ss',str(start),'-i',source,'-t',str(duration)]
            if kind=='video-question':
                video_filter += ',format=yuv420p'
                inputs=['-ss',str(start),'-i',source,'-i',overlay,'-t',str(duration)]
                video_filter='[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1,fps=30[base];[base][1:v]overlay=x=1260:y=270:eof_action=repeat:shortest=0,fps=30,format=yuv420p'
                run([FFMPEG,'-y','-hide_banner','-loglevel','error',*inputs,'-filter_complex',video_filter,'-an','-c:v','libx264','-preset','veryfast','-crf','21','-pix_fmt','yuv420p','-r','30',target])
                segment_files.append(target)
                continue
            run([FFMPEG,'-y','-hide_banner','-loglevel','error',*inputs,'-vf',video_filter,'-an','-c:v','libx264','-preset','veryfast','-crf','21','-pix_fmt','yuv420p','-r','30',target])
        else:
            image=(temp/'end-card.png') if name=='endcard' else SCREENS/filename
            run([FFMPEG,'-y','-hide_banner','-loglevel','error','-loop','1','-framerate','30','-i',image,'-t',str(duration),'-vf','scale=1920:1080,setsar=1,fps=30,format=yuv420p','-an','-c:v','libx264','-preset','veryfast','-crf','21','-pix_fmt','yuv420p','-r','30',target])
        segment_files.append(target)

    concat_list=temp/'segments.ffconcat'
    concat_list.write_text("ffconcat version 1.0\n"+''.join(f"file '{p.as_posix()}'\n" for p in segment_files),encoding='utf-8')
    picture=temp/'picture.mp4'
    run([FFMPEG,'-y','-hide_banner','-loglevel','error','-f','concat','-safe','0','-i',concat_list,'-c','copy',picture])

    voices=[
      ('cheryl-intro.wav',6000),('cheryl-question.wav',12200),
      ('qbot-overview.wav',18800),('qbot-paid.wav',39200),
      ('qbot-draft.wav',48800),('cheryl-close.wav',53000),
    ]
    audio_inputs=['-i',picture]
    audio_inputs.extend(part for file,_ in voices for part in ('-i',VOICE/file))
    audio_inputs.extend(['-stream_loop','-1','-i',PUBLIC/'intro/audio/music-bed-67s.wav'])
    filters=[]
    for idx,(_,delay) in enumerate(voices, start=1):
        filters.append(f'[{idx}:a]aresample=48000,adelay={delay}:all=1,volume=0.94,apad,atrim=0:60[v{idx}]')
    music_idx=len(voices)+1
    filters.append(f'[{music_idx}:a]aresample=48000,atrim=0:60,volume=0.075,afade=t=in:st=0:d=1,afade=t=out:st=57:d=3[m]')
    mix=''.join(f'[v{i}]' for i in range(1,len(voices)+1))+'[m]'
    filters.append(f'{mix}amix=inputs={len(voices)+1}:duration=first:normalize=0,alimiter=limit=0.95[aout]')
    run([FFMPEG,'-y','-hide_banner','-loglevel','error',*audio_inputs,'-filter_complex',';'.join(filters),'-map','0:v:0','-map','[aout]','-t','60','-c:v','copy','-c:a','aac','-b:a','192k','-ar','48000','-movflags','+faststart',OUT])

print(f'Wrote {OUT}', flush=True)
