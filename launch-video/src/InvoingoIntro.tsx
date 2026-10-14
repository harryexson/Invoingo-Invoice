import React, {useEffect, useState} from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  continueRender,
  delayRender,
  useCurrentFrame,
} from 'remotion';
import {Logo} from './components/Product';
import {T} from './styles/invoingoTokens';

const video = (file: string) => staticFile(`intro/videos/${file}`);
const screen = (file: string) => staticFile(`screens/${file}-full.jpg`);

function FullFrameTake({
  file,
  startFrom = 0,
  endAt,
  muted = false,
}: {
  file: string;
  startFrom?: number;
  endAt?: number;
  muted?: boolean;
}) {
  return (
    <AbsoluteFill style={{backgroundColor: '#111'}}>
      <OffthreadVideo
        src={video(file)}
        startFrom={startFrom}
        endAt={endAt}
        muted={muted}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    </AbsoluteFill>
  );
}

function HandsetScreen({which}: {which: 'current-miobot-draft' | 'current-miobot-alex'}) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 797,
        top: 149,
        width: 342,
        height: 734,
        borderRadius: 40,
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}
    >
      <Img
        src={screen(which)}
        style={{
          position: 'absolute',
          width: 1575,
          height: 1065,
          maxWidth: 'none',
          left: -736,
          top: -134,
        }}
      />
    </div>
  );
}

function PhoneConversation() {
  const frame = useCurrentFrame();
  const alexReplyStarts = 278; // 9.27 seconds, after the Maya voice file completes.
  const which = frame < alexReplyStarts ? 'current-miobot-draft' : 'current-miobot-alex';
  const scale = interpolate(frame, [0, 510], [1, 1.025], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#211e19'}}>
      <AbsoluteFill style={{transform: `scale(${scale})`, transformOrigin: 'center center'}}>
        <Img
          src={staticFile('intro/phone-screen-start-v2.png')}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
        <HandsetScreen which={which} />
      </AbsoluteFill>
      <Audio src={staticFile('intro/audio/miobot-maya-response.wav')} volume={1} />
      <Sequence from={alexReplyStarts} durationInFrames={232}>
        <Audio src={staticFile('intro/audio/miobot-alex-response.wav')} volume={1} />
      </Sequence>
    </AbsoluteFill>
  );
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
      }}
    >
      <Logo size={132} />
      <div style={{fontSize: 42, marginTop: 28}}>Invoice maker on the go!</div>
      <div style={{position: 'absolute', bottom: 38, fontSize: 16, opacity: 0.72}}>
        Fictional Invoingo preview records
      </div>
    </AbsoluteFill>
  );
}

export function InvoingoIntro() {
  const [fontHandle] = useState(() => delayRender('Load Invoingo fonts'));
  useEffect(() => {
    const regular = new FontFace('Invoingo Inter', `url(${staticFile('fonts/inter-400.ttf')})`, {weight: '400'});
    const bold = new FontFace('Invoingo Inter', `url(${staticFile('fonts/inter-900.ttf')})`, {weight: '900'});
    Promise.all([regular.load(), bold.load()])
      .then((fonts) => {
        fonts.forEach((font) => (document.fonts as FontFaceSet & {add(font: FontFace): void}).add(font));
        continueRender(fontHandle);
      })
      .catch(() => continueRender(fontHandle));
  }, [fontHandle]);

  return (
    <AbsoluteFill style={{fontFamily: T.font, backgroundColor: '#111'}}>
      {/* 0–6s: entrance and sitting, with no dialogue. */}
      <Sequence durationInFrames={180}>
        <FullFrameTake file="office-entrance-take.mp4" endAt={180} muted />
      </Sequence>

      {/* 6–16s: native synchronized intro, with time for the complete spoken line. */}
      <Sequence from={180} durationInFrames={300}>
        <FullFrameTake file="seated-introduction-take.mp4" endAt={300} />
      </Sequence>

      {/* 16–31s: Cheryl asks MioBot about the outstanding invoice. */}
      <Sequence from={480} durationInFrames={450}>
        <FullFrameTake file="miobot-question-take.mp4" endAt={450} />
      </Sequence>

      {/* 31–48s: MioBot speaks both verified responses over the real phone UI. */}
      <Sequence from={930} durationInFrames={510}>
        <PhoneConversation />
      </Sequence>

      {/* 48–57s: native synchronized closing, including the full spoken line. */}
      <Sequence from={1440} durationInFrames={270}>
        <FullFrameTake file="closing-take.mp4" endAt={270} />
      </Sequence>

      <Sequence from={1710} durationInFrames={90}>
        <EndCard />
      </Sequence>

      <Audio src={staticFile('intro/audio/music-bed.wav')} volume={0.075} />
    </AbsoluteFill>
  );
}
