import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {Logo} from './components/Product';
import {T} from './styles/invoingoTokens';
import {TrackedPhoneV4} from './TrackedPhoneV4';

const video = (file: string) => staticFile(`intro/videos/${file}`);
const audio = (file: string) => staticFile(`intro/audio/v4/${file}`);
const screen = (file: string) => staticFile(`screens/${file}-full.jpg`);

function FullFrameTake({file, muted = false}: {file: string; muted?: boolean}) {
  return (
    <AbsoluteFill style={{backgroundColor: '#111'}}>
      <OffthreadVideo
        src={video(file)}
        muted={muted}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    </AbsoluteFill>
  );
}

function PhoneScene({which, durationInFrames}: {which: 'current-home' | 'current-miobot-draft' | 'current-miobot-alex';durationInFrames:number}) {
  const frame = useCurrentFrame();
  const details=which==='current-home'
    ? {label:'INVOINGO',title:'Your invoices.\nWherever you are.',body:'Create invoices · Track payments · Ask MioBot'}
    : which==='current-miobot-draft'
      ? {label:'MIOBOT · INV-1043',title:'$681.94 remaining.',body:'Maya Chen · Partially paid\nReminder draft ready for review. Nothing sent.'}
      : {label:'MIOBOT · INV-1042',title:'Paid in full.',body:'Alex Morgan · $1,302.00\nPayment recorded October 2, 2026.'};
  return <AbsoluteFill>
    <TrackedPhoneV4 which={which} motionDurationFrames={durationInFrames} transition={which!=='current-home'} revealFrom={0}/>
    <div style={{position:'absolute',right:85,top:330,width:700,padding:34,borderRadius:28,background:'rgba(244,248,239,.96)',color:T.forest,boxShadow:'0 18px 50px #0002',opacity:interpolate(frame,[0,12],[0,1],{extrapolateRight:'clamp'})}}>
      <div style={{fontSize:19,fontWeight:700,letterSpacing:1.5,marginBottom:18}}>{details.label}</div>
      <div style={{fontSize:52,fontWeight:700,lineHeight:1.08,whiteSpace:'pre-line'}}>{details.title}</div>
      <div style={{fontSize:25,lineHeight:1.45,marginTop:24,whiteSpace:'pre-line'}}>{details.body}</div>
    </div>
  </AbsoluteFill>;
}

function EndCard() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: T.forest,
        color: T.mist,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: Math.min(1, frame / 12),
        textAlign: 'center',
      }}
    >
      <Logo size={124} />
      <div style={{fontSize: 38, lineHeight: 1.45, marginTop: 30, maxWidth: 1100}}>
        <div>Meet MioBot.</div>
        <div>Your invoicing assistant, inside Invoingo.</div>
        <div style={{fontWeight: 700, marginTop: 10}}>Get started with Invoingo.</div>
      </div>
      <div style={{position: 'absolute', bottom: 28, fontSize: 15, opacity: 0.72}}>
        Fictional preview records · No email or payment sent
      </div>
    </AbsoluteFill>
  );
}

function PresenterLowerThird() {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, 135, 160], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: 84, bottom: 88, display: 'flex', alignItems: 'stretch', gap: 14, opacity}}>
      <div style={{width: 5, borderRadius: 4, backgroundColor: '#93e55b'}} />
      <div style={{padding: '12px 18px', backgroundColor: 'rgba(10, 32, 0, 0.82)', color: '#fff', borderRadius: 8}}>
        <div style={{fontSize: 24, fontWeight: 700, letterSpacing: 0.2}}>Cheryl Clark</div>
        <div style={{fontSize: 16, marginTop: 4, opacity: 0.88}}>Product Manager, Invoingo</div>
      </div>
    </div>
  );
}

/** Reference-led Invoingo cut: Cheryl asks from the phone; MioBot speaks verified demo statuses over real mobile screens. */
export function InvoingoIntroV4() {
  return (
    <AbsoluteFill style={{fontFamily: T.font, backgroundColor: '#111'}}>
      {/* 0–6s: silent office entrance and sit. */}
      <Sequence durationInFrames={180}>
        <FullFrameTake file="office-entrance-take.mp4" muted />
      </Sequence>

      {/* 6–16.13s: native on-camera introduction. */}
      <Sequence from={180} durationInFrames={304}>
        <FullFrameTake file="v4-introduction-take.mp4" />
      </Sequence>
      <Sequence from={180} durationInFrames={160}>
        <PresenterLowerThird />
      </Sequence>

      {/* Cheryl's supplied voice-over, over the real mobile invoice overview. */}
      <Sequence from={484} durationInFrames={243}>
        <PhoneScene which="current-home" durationInFrames={243} />
        <Audio src={audio('cheryl-business.wav')} volume={1} />
      </Sequence>

      {/* Cheryl asks MioBot from the handset. */}
      <Sequence from={727} durationInFrames={55}>
        <PhoneScene which="current-home" durationInFrames={55} />
        <Audio src={audio('cheryl-question.wav')} volume={1} />
      </Sequence>

      {/* MioBot's verified Maya update and review-ready reminder. */}
      <Sequence from={782} durationInFrames={333}>
        <PhoneScene which="current-miobot-draft" durationInFrames={333} />
        <Audio src={audio('miobot-maya.wav')} volume={1} />
      </Sequence>

      {/* Cheryl explains the review-before-send step while the actual draft remains visible. */}
      <Sequence from={1115} durationInFrames={161}>
        <PhoneScene which="current-miobot-draft" durationInFrames={161} />
        <Audio src={audio('cheryl-reminder.wav')} volume={1} />
      </Sequence>

      {/* Her customer-payment line leads into MioBot's matching paid record. */}
      <Sequence from={1276} durationInFrames={97}>
        <PhoneScene which="current-miobot-alex" durationInFrames={97} />
        <Audio src={audio('cheryl-paid-update.wav')} volume={1} />
      </Sequence>

      <Sequence from={1373} durationInFrames={194}>
        <PhoneScene which="current-miobot-alex" durationInFrames={194} />
        <Audio src={audio('miobot-alex.wav')} volume={1} />
      </Sequence>

      {/* Native Cheryl closing performance. */}
      <Sequence from={1567} durationInFrames={115}>
        <FullFrameTake file="v4-closing-take.mp4" />
      </Sequence>

      <Sequence from={1682} durationInFrames={118}>
        <EndCard />
      </Sequence>

      <Audio src={staticFile('intro/audio/music-bed.wav')} volume={0.065} />
    </AbsoluteFill>
  );
}
