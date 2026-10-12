import React from 'react';
import {AbsoluteFill,useCurrentFrame,interpolate,Easing} from 'remotion';
import {ActualPhone,Heading,Bubble,Arrival,MioBot} from '../components/Product';
import {invoingoData,money} from '../data/invoingoData';
export function ClientContext(){
 const f=useCurrentFrame(),d=invoingoData.invoices[0];
 return <AbsoluteFill style={{padding:'120px 100px'}}>
 <Heading kicker="CONTEXT THAT KEEPS UP">Less searching.<br/>More knowing.</Heading>
 <div style={{position:'absolute',left:100,top:410,width:750}}>
 {f<100?<Arrival at={20} style={{fontSize:33,lineHeight:1.5}}>Maya’s invoice is partially paid.<br/>{money(d.balance)} USD remains.</Arrival>:<Arrival at={f<255?100:255}><Bubble user>{f<255?'Draft a reminder for the first one.':'Make it friendlier.'}</Bubble></Arrival>}
 {f>=165?<Arrival at={f<300?165:300}><Bubble>{f<300?"Here’s a draft. Nothing has been sent.":'Ready for your review.'}</Bubble></Arrival>:null}
 {f>=180?<Arrival at={180} style={{border:'2px solid #dce2d6',background:'white',borderRadius:24,padding:27,fontSize:27,lineHeight:1.45}}><div style={{display:'flex',alignItems:'center',gap:17}}><MioBot size={40}/><strong>Reminder draft</strong></div><p style={{margin:'17px 0'}}>{d.client} · {d.number}<br/>Balance {money(d.balance)} USD · Due {d.due}</p><div style={{background:'#9fe870',borderRadius:35,padding:'12px 22px',width:'fit-content',fontWeight:700}}>Review before sending</div></Arrival>:null}
 </div>
 <div style={{position:'absolute',right:150,top:65,transform:`translateX(${interpolate(f,[0,60],[90,0],{extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)})}px) rotate(${interpolate(f,[0,360],[1,-1])}deg)`}}><ActualPhone screen="current-miobot-draft"/></div>
 </AbsoluteFill>;
}
