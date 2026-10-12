import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, Sequence, OffthreadVideo, staticFile, useCurrentFrame, interpolate, delayRender, continueRender} from 'remotion';
import {ActualPhone, Arrival, Heading, Logo, Disclosure} from './components/Product';
import {InvoiceOverview} from './scenes/InvoiceOverview';
import {PaymentStatus} from './scenes/PaymentStatus';
import {T} from './styles/invoingoTokens';

// Required generated clips are never replaced by static presenter images.
// The guarded render command checks these files before a complete export.
function CherylPresenter({file, title=false}: {file:string; title?:boolean}) {
  const frame=useCurrentFrame();
  return <AbsoluteFill>
    <OffthreadVideo src={staticFile(`intro/videos/${file}`)} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
    {title && <Arrival at={15} style={{position:'absolute',left:85,bottom:95,padding:'22px 30px',borderRadius:18,background:'#163300e8',color:'white',fontSize:32}}><strong>Cheryl Clark</strong><div style={{fontSize:23,marginTop:5}}>Product, Invoingo</div></Arrival>}
    <div style={{position:'absolute',bottom:30,right:45,fontSize:17,color:'white',textShadow:'0 1px 6px #000',opacity:interpolate(frame,[0,12],[0,1],{extrapolateRight:'clamp'})}}>Fictional AI presenter</div>
  </AbsoluteFill>;
}

function MioBotDemo() {
  const frame=useCurrentFrame();
  const showDraft=frame>=150;
  return <AbsoluteFill style={{padding:'140px 100px'}}>
    <Heading kicker="MIOBOT · INSIDE INVOINGO">Ask a question.<br/>Review the next step.</Heading>
    <Arrival at={35} style={{width:680,fontSize:30,lineHeight:1.5,marginTop:50}}>Find invoice information and prepare a reminder.<br/>Review the message before sending.</Arrival>
    <div style={{position:'absolute',right:165,top:60,transform:`translateX(${interpolate(frame,[0,30],[30,0],{extrapolateRight:'clamp'})}px)`}}>
      <ActualPhone screen={showDraft?'current-miobot-draft':'current-miobot-alex'}/>
    </div>
    <Disclosure/>
  </AbsoluteFill>;
}

function Closing() {
  const frame=useCurrentFrame();
  return <AbsoluteFill>
    <Sequence durationInFrames={210}><CherylPresenter file="closing.mp4"/></Sequence>
    <Sequence from={210} durationInFrames={90}><AbsoluteFill style={{background:T.forest,color:T.lime,alignItems:'center',justifyContent:'center'}}><Logo size={140}/><div style={{fontSize:45,marginTop:35,color:T.mist}}>Invoice maker on the go!</div></AbsoluteFill></Sequence>
    <div style={{position:'absolute',bottom:30,left:45,color:frame>=210?T.mist:'white',fontSize:17}}>Invoingo web/mobile preview · Fictional demonstration records</div>
  </AbsoluteFill>;
}

export function InvoingoIntro() {
  const [fontHandle]=useState(()=>delayRender('Load actual Invoingo fonts'));
  useEffect(()=>{
    const regular=new FontFace('Invoingo Inter',`url(${staticFile('fonts/inter-400.ttf')})`,{weight:'400'});
    const bold=new FontFace('Invoingo Inter',`url(${staticFile('fonts/inter-900.ttf')})`,{weight:'900'});
    Promise.all([regular.load(),bold.load()]).then(fonts=>{fonts.forEach(font=>(document.fonts as FontFaceSet & {add(font:FontFace):void}).add(font));continueRender(fontHandle);}).catch(()=>continueRender(fontHandle));
  },[fontHandle]);
  return <AbsoluteFill style={{fontFamily:T.font,background:T.fog,color:T.forest}}>
    <Sequence durationInFrames={240}><CherylPresenter file="office-entrance.mp4"/></Sequence>
    <Sequence from={240} durationInFrames={120}><CherylPresenter file="sit-down.mp4"/></Sequence>
    <Sequence from={360} durationInFrames={240}><CherylPresenter file="introduction.mp4" title/></Sequence>
    <Sequence from={600} durationInFrames={270}><InvoiceOverview/><Disclosure/><Audio src={staticFile('intro/audio/cheryl-invoices.wav')}/></Sequence>
    <Sequence from={870} durationInFrames={300}><MioBotDemo/><Audio src={staticFile('intro/audio/cheryl-miobot.wav')}/></Sequence>
    <Sequence from={1170} durationInFrames={330}><PaymentStatus/><Disclosure/><Audio src={staticFile('intro/audio/cheryl-features.wav')}/></Sequence>
    <Sequence from={1500} durationInFrames={300}><Closing/></Sequence>
    <Audio src={staticFile('intro/audio/music-bed.wav')} volume={.12}/>
  </AbsoluteFill>;
}
