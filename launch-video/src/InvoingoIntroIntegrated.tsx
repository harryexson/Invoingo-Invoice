import React from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, staticFile} from 'remotion';

const base = staticFile('intro/videos/invoingo-launch-base.mp4');
const presenter = staticFile('intro/videos/introduction.mp4');

/** Keep the approved 45s launch film as the underlying edit, replacing its old presenter take. */
export function InvoingoIntroIntegrated() {
  return <AbsoluteFill style={{backgroundColor:'#081c00'}}>
    <Sequence durationInFrames={360}>
      <OffthreadVideo src={base} endAt={360} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
    </Sequence>
    <Sequence from={360} durationInFrames={450}>
      <OffthreadVideo src={presenter} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
    </Sequence>
    <Sequence from={810} durationInFrames={900}>
      <OffthreadVideo src={base} startFrom={450} endAt={1350} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
    </Sequence>
  </AbsoluteFill>;
}
