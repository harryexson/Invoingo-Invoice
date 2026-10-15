import React from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {PHONE_TRACK_V4} from './data/phoneTrackV4';

type Point = readonly [number, number];

export function homography(quad: readonly Point[],width=359,height=746) {
  const src = [[0, 0], [width, 0], [width, height], [0, height]];
  const rows: number[][] = [];
  src.forEach(([x, y], i) => {
    const [u, v] = quad[i];
    rows.push([x, y, 1, 0, 0, 0, -u*x, -u*y, u]);
    rows.push([0, 0, 0, x, y, 1, -v*x, -v*y, v]);
  });
  for (let col=0; col<8; col++) {
    let pivot=col;
    for (let r=col+1; r<8; r++) if (Math.abs(rows[r][col])>Math.abs(rows[pivot][col])) pivot=r;
    [rows[col], rows[pivot]]=[rows[pivot], rows[col]];
    const divisor=rows[col][col];
    for (let c=col; c<9; c++) rows[col][c]/=divisor;
    for (let r=0; r<8; r++) if (r!==col) {
      const factor=rows[r][col];
      for (let c=col; c<9; c++) rows[r][c]-=factor*rows[col][c];
    }
  }
  const [a,b,c,d,e,f,g,h]=rows.map(r=>r[8]);
  return `matrix3d(${[a,d,0,g,b,e,0,h,0,0,1,0,c,f,0,1].join(',')})`;
}

function trackedQuad(frame: number): Point[] {
  const index=Math.min(PHONE_TRACK_V4.corners.length-1, frame/30*PHONE_TRACK_V4.fps);
  const a=Math.floor(index), b=Math.min(a+1,PHONE_TRACK_V4.corners.length-1), t=index-a;
  return PHONE_TRACK_V4.corners[a].map((p,i)=>[p[0]+(PHONE_TRACK_V4.corners[b][i][0]-p[0])*t,p[1]+(PHONE_TRACK_V4.corners[b][i][1]-p[1])*t] as Point);
}

export function TrackedPhoneV4({which='current-miobot-draft', transition=false, motionDurationFrames=180, revealFrom=65}: {which?:'current-home'|'current-miobot-draft'|'current-miobot-alex';transition?:boolean;motionDurationFrames?:number;revealFrom?:number}) {
  const frame=useCurrentFrame();
  const motionRate=Math.min(1,179/motionDurationFrames);
  const scale=interpolate(frame,[0,motionDurationFrames],[6,6.12],{extrapolateRight:'clamp'});
  const reveal=transition?interpolate(frame,[revealFrom,revealFrom+11],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}):1;
  return <AbsoluteFill style={{background:'#1c2615',overflow:'hidden'}}>
    <div style={{position:'absolute',width:1176,height:784,transformOrigin:'0 0',transform:`matrix(${scale},0,0,${scale},${-680*scale},${-165*scale})`}}>
      <OffthreadVideo src={staticFile('intro/videos/phone-motion-v4.mp4')} playbackRate={motionRate} muted style={{width:1176,height:784}} />
      <div style={{position:'absolute',left:0,top:0,width:359,height:746,transformOrigin:'0 0',transform:homography(trackedQuad(frame*motionRate)),borderRadius:29,overflow:'hidden',background:'#172214',filter:'brightness(.91) saturate(.94)'}}>
        <Img src={staticFile('intro/ui-v4/current-home.png')} style={{position:'absolute',width:'100%',height:'100%'}} />
        <Img src={staticFile(`intro/ui-v4/${which}.png`)} style={{position:'absolute',width:'100%',height:'100%',opacity:reveal}} />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(118deg,rgba(255,255,255,.15),transparent 42%,rgba(0,0,0,.05))',pointerEvents:'none'}} />
      </div>
    </div>
  </AbsoluteFill>;
}

export function PhoneInteractionProof() {
  const frame=useCurrentFrame();
  const reply=interpolate(frame,[65,76],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill style={{fontFamily:'Arial, sans-serif'}}>
    <TrackedPhoneV4 transition />
    <div style={{position:'absolute',right:85,top:270,width:690,background:'rgba(244,248,239,.96)',borderRadius:28,padding:'26px 32px',boxShadow:'0 16px 45px #0003',color:'#153400'}}>
      <div style={{fontSize:20,fontWeight:700,opacity:.64,marginBottom:12}}>Cheryl Clark</div>
      <div style={{fontSize:35,lineHeight:1.25}}>Mio, what needs a follow-up?</div>
    </div>
    <div style={{position:'absolute',right:85,top:500,width:690,background:'rgba(23,51,4,.96)',borderRadius:28,padding:'26px 32px',boxShadow:'0 16px 45px #0003',color:'#f3f7ec',opacity:reply,translate:`0 ${18*(1-reply)}px`}}>
      <div style={{fontSize:20,fontWeight:700,color:'#a0e971',marginBottom:12}}>✦ MioBot</div>
      <div style={{fontSize:35,lineHeight:1.3}}>Your reminder draft is ready for review.</div>
      <div style={{fontSize:22,marginTop:20,opacity:.75}}>INV-1043 · $681.94 remaining · Nothing sent</div>
    </div>
    <Sequence from={6}><Audio src={staticFile('intro/audio/v4/cheryl-question.wav')} /></Sequence>
    <Sequence from={69}><Audio src={staticFile('intro/audio/v4/miobot-proof-response.wav')} /></Sequence>
    <Audio src={staticFile('intro/audio/music-bed.wav')} volume={.04}/>
  </AbsoluteFill>;
}
