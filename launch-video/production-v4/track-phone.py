from pathlib import Path
import json, sys
from PIL import Image

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT.parents[1] / '.local-tools/launch-tts'))
import numpy as np

def intersect(xline, yline):
    # x = a*y+b, y = c*x+d
    a,b = xline
    c,d = yline
    y = (c*b+d)/(1-c*a)
    return [a*y+b+710, y+190]

frames=[]
for i, path in enumerate(sorted((ROOT/'tracking').glob('*.png'))):
    arr=np.asarray(Image.open(path).convert('RGB'))
    mask=(arr.max(axis=2)<48) & ((arr.max(axis=2)-arr.min(axis=2))<18)
    # The display is the largest dark component around the expected centre.
    visited=set(); components=[]
    for y,x in zip(*np.where(mask)):
        if (int(y),int(x)) in visited: continue
        stack=[(int(y),int(x))]; points=[]; visited.add(stack[0])
        while stack:
            cy,cx=stack.pop(); points.append((cy,cx))
            for ny,nx in [(cy-1,cx),(cy+1,cx),(cy,cx-1),(cy,cx+1)]:
                if 0<=ny<mask.shape[0] and 0<=nx<mask.shape[1] and mask[ny,nx] and (ny,nx) not in visited:
                    visited.add((ny,nx)); stack.append((ny,nx))
        if len(points)>800: components.append(np.asarray(points))
    pts=max(components,key=len)
    ymin,xmin=pts.min(axis=0); ymax,xmax=pts.max(axis=0)
    left=[]; right=[]; top=[]; bottom=[]
    for y in range(int(ymin+8),int(ymax-8)):
        row=pts[pts[:,0]==y,1]
        if len(row)>15: left.append((y,row.min())); right.append((y,row.max()))
    for x in range(int(xmin+7),int(xmax-7)):
        col=pts[pts[:,1]==x,0]
        if len(col)>40: top.append((x,col.min())); bottom.append((x,col.max()))
    fit=lambda values: np.polyfit(np.asarray(values)[:,0],np.asarray(values)[:,1],1)
    l,r,t,b=map(fit,[left,right,top,bottom])
    frames.append([intersect(l,t),intersect(r,t),intersect(r,b),intersect(l,b)])

raw=np.asarray(frames)
smooth=np.stack([np.median(raw[max(0,i-1):min(len(raw),i+2)],axis=0) for i in range(len(raw))])
report={'sourceWidth':1176,'sourceHeight':784,'fps':12,'corners':np.round(smooth,3).tolist()}
(ROOT/'phone-track.json').write_text(json.dumps(report),encoding='utf-8')
(ROOT.parent/'src/data/phoneTrackV4.ts').write_text('export const PHONE_TRACK_V4 = '+json.dumps(report)+' as const;\n',encoding='utf-8')
print(f'Tracked {len(frames)} frames. First display corners: {report["corners"][0]}')
