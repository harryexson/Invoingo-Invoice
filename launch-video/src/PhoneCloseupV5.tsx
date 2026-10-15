import React from 'react';
import {AbsoluteFill,OffthreadVideo,staticFile,useCurrentFrame} from 'remotion';
import {PHONE_TRACK_V5} from './data/phoneTrackV5';
import {homography} from './TrackedPhoneV4';

export const PhoneCloseupV5:React.FC=()=>{
 const frame=useCurrentFrame();
 const index=Math.min(PHONE_TRACK_V5.corners.length-1,frame*24/30);
 const a=Math.floor(index),b=Math.min(a+1,PHONE_TRACK_V5.corners.length-1),t=index-a;
 const quad=PHONE_TRACK_V5.corners[a].map((p,i)=>[p[0]+(PHONE_TRACK_V5.corners[b][i][0]-p[0])*t,p[1]+(PHONE_TRACK_V5.corners[b][i][1]-p[1])*t] as const);
 return <AbsoluteFill style={{background:'#171c12',overflow:'hidden'}}>
  <div style={{position:'absolute',width:1264,height:720,left:12,top:0,transform:'scale(1.5)',transformOrigin:'0 0'}}>
   <OffthreadVideo src={staticFile('intro/videos/phone-closeup-source-v5.mp4')} muted style={{width:1264,height:720}}/>
   <div style={{position:'absolute',left:0,top:0,width:390,height:844,transformOrigin:'0 0',transform:homography(quad,390,844),borderRadius:'49px',overflow:'hidden',background:'#10130f'}}>
    <div style={{position:'absolute',inset:0,background:'#f5f7f2'}}/>
    <OffthreadVideo src={staticFile('intro/videos/mobile-live-v5.mp4')} muted style={{position:'absolute',top:38,left:0,width:390,height:806,filter:'brightness(.84) saturate(.87) blur(.22px)'}}/>
    <div style={{position:'absolute',top:0,left:0,width:390,height:38,background:'#f5f7f2',filter:'brightness(.84)'}}><span style={{position:'absolute',left:28,top:13,font:'12px Arial'}}>9:41</span><span style={{position:'absolute',right:24,top:13,font:'12px Arial'}}>▮▮ ▰</span></div>
    <div style={{position:'absolute',top:-1,left:98,width:194,height:30,borderRadius:'0 0 15px 15px',background:'#090b0b'}}/>
    <div style={{position:'absolute',inset:0,background:'linear-gradient(115deg,rgba(255,255,255,.075),transparent 48%,rgba(0,0,0,.045))',boxShadow:'inset 0 0 5px #0008',pointerEvents:'none'}}/>
   </div>
  </div>
 </AbsoluteFill>;
};
