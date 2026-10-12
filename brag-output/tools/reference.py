from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'.local-tools/media-analysis'))
import yt_dlp
out=ROOT/'brag-output/reference'
out.mkdir(parents=True,exist_ok=True)
with yt_dlp.YoutubeDL({'outtmpl':str(out/'muse-reference.%(ext)s'),'format':'best[ext=mp4]/best','noplaylist':True,'quiet':False}) as y:
    y.download(['https://x.com/Muse/status/2097399178376671666/video/1'])
