import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
} from 'remotion';

const video = (file: string) => staticFile(`intro/videos/${file}`);
const voice = (file: string) => staticFile(`intro-v3/audio/${file}`);

function Take({file, startFrom = 0, muted = true, phoneOverlay = false}: {file: string; startFrom?: number; muted?: boolean; phoneOverlay?: boolean}) {
  return (
    <AbsoluteFill style={{backgroundColor: '#231c38'}}>
      <OffthreadVideo
        src={video(file)}
        startFrom={startFrom}
        muted={muted}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
      {phoneOverlay && <div style={{position: 'absolute', left: '66.2%', top: '25.1%', width: '3.25%', height: '12.0%', borderRadius: 12, overflow: 'hidden', background: '#fff', boxShadow: '0 0 0 2px #15121d'}}>
        <div style={{height: '18%', background: '#fbfaff', color: '#261c42', fontSize: 8, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #ddd8ed'}}>◆ Qbot</div>
        <div style={{padding: 4, color: '#342953', fontSize: 5, lineHeight: 1.25}}>Which invoices need attention?</div>
        <div style={{margin: '2px 4px', padding: 3, borderRadius: 5, background: '#f1eff6', color: '#30264a', fontSize: 4.5, lineHeight: 1.2}}>2 overdue · $2,150.00</div>
        <div style={{margin: '2px 4px', padding: 3, borderRadius: 5, background: '#28184f', color: '#fff', fontSize: 4.5, lineHeight: 1.2}}>Tom · $1,150</div>
      </div>}
    </AbsoluteFill>
  );
}

function BotMark({size = 28}: {size?: number}) {
  return <div style={{width: size, height: size, borderRadius: 10, background: '#7b5cff', color: 'white', fontWeight: 900, fontSize: size * .55, display: 'grid', placeItems: 'center'}}>Q</div>;
}

function Bubble({children, user = false}: {children: React.ReactNode; user?: boolean}) {
  return <div style={{alignSelf: user ? 'flex-end' : 'stretch', maxWidth: user ? '84%' : '100%', padding: '20px 24px', borderRadius: user ? '24px 24px 7px 24px' : '8px 24px 24px 24px', background: user ? '#26184f' : '#f4f3f7', color: user ? '#fff' : '#292438', fontSize: 27, lineHeight: 1.3, fontWeight: 500}}>{children}</div>;
}

function ChatPhone({mode}: {mode: 'overview' | 'paid' | 'draft'}) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{backgroundColor: '#efedf5', opacity}}>
    <Img src={staticFile(`intro-v3/screens/${mode}.png`)} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
  </AbsoluteFill>;
}

function EndCard() {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{background: '#211443', color: '#fff', justifyContent: 'center', alignItems: 'center', opacity: interpolate(frame,[0,12],[0,1],{extrapolateRight:'clamp'}), fontFamily: 'Arial, sans-serif'}}>
    <BotMark size={84}/><div style={{fontWeight: 800, fontSize: 76, marginTop: 22}}>QuickSend</div><div style={{fontSize: 30, marginTop: 14, color: '#d6ceef'}}>Invoices, payments, follow-ups.</div>
  </AbsoluteFill>;
}

export function QuickSendIntro() {
  return <AbsoluteFill style={{backgroundColor: '#1b1724', fontFamily: 'Arial, sans-serif'}}>
    <Sequence durationInFrames={180}><Take file="office-entrance-take.mp4"/></Sequence>
    <Sequence from={180} durationInFrames={186}><Take file="seated-introduction-take.mp4" startFrom={90}/><Audio src={voice('cheryl-intro.wav')} volume={1}/></Sequence>
    <Sequence from={366} durationInFrames={198}><Take file="miobot-question-take.mp4" phoneOverlay/><Audio src={voice('cheryl-question.wav')} volume={1}/></Sequence>
    <Sequence from={564} durationInFrames={612}><ChatPhone mode="overview"/><Audio src={voice('qbot-overview.wav')} volume={1}/></Sequence>
    <Sequence from={1176} durationInFrames={288}><ChatPhone mode="paid"/><Audio src={voice('qbot-paid.wav')} volume={1}/></Sequence>
    <Sequence from={1464} durationInFrames={126}><ChatPhone mode="draft"/><Audio src={voice('qbot-draft.wav')} volume={1}/></Sequence>
    <Sequence from={1590} durationInFrames={117}><Take file="closing-take.mp4" startFrom={90}/><Audio src={voice('cheryl-close.wav')} volume={1}/></Sequence>
    <Sequence from={1707} durationInFrames={93}><EndCard/></Sequence>
    <Audio src={staticFile('intro/audio/music-bed-67s.wav')} volume={0.065}/>
  </AbsoluteFill>;
}
