from pathlib import Path
import sys,json
root=Path(__file__).resolve().parent
sys.path.insert(0,str(root.parents[1]/'.local-tools/launch-tts'))
import numpy as np
from PIL import Image
corners=[]
def fit(points):
 a=np.asarray(points,dtype=float)
 for _ in range(4):
  line=np.polyfit(a[:,0],a[:,1],1)
  residual=np.abs(a[:,1]-np.polyval(line,a[:,0]))
  keep=residual<max(1.5,np.median(residual)*2.5)
  if keep.sum()<10:break
  a=a[keep]
 return np.polyfit(a[:,0],a[:,1],1)
for p in sorted((root/'closeup-frames').glob('*.png')):
 a=np.asarray(Image.open(p).convert('RGB'))
 mask=a.max(axis=2)<48
 left=[];right=[]
 for y in range(150,450):
  xs=np.where(mask[y])[0];xs=xs[(xs>20)&(xs<320)]
  if len(xs)>150:left.append((y,xs.min()));right.append((y,xs.max()))
 l=fit(left);r=fit(right)
 l[1]+=4;r[1]-=4
 top=[];bottom=[]
 for x in range(110,240):
  ys=np.where(mask[:,x])[0];ys=ys[(ys>20)&(ys<560)]
  if len(ys)>400:top.append((x,ys.min()));bottom.append((x,ys.max()))
 t=fit(top);b=fit(bottom)
 t[1]+=5;b[1]-=5
 def cross(side,end):
  aa,bb=side;cc,dd=end;y=(cc*bb+dd)/(1-cc*aa);return [aa*y+bb+460,y+50]
 corners.append([cross(l,t),cross(r,t),cross(r,b),cross(l,b)])
raw=np.array(corners)
# Fit local motion over nine native frames, avoiding stair-step integer edges.
sm=[]
for i in range(len(raw)):
 lo=max(0,i-4);hi=min(len(raw),i+5);xs=np.arange(lo,hi)-i
 sm.append(np.stack([np.polyfit(xs,raw[lo:hi,j,k],2)[-1] for j in range(4) for k in range(2)]).reshape(4,2))
result={'fps':24,'sourceWidth':1264,'sourceHeight':720,'corners':np.round(sm,3).tolist()}
(root.parent/'src/data/phoneTrackV5.ts').write_text('export const PHONE_TRACK_V5 = '+json.dumps(result)+' as const;\n')
print('Frames',len(sm),'first',result['corners'][0])
