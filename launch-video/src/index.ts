import React from 'react';
import {registerRoot, Composition} from 'remotion';
import {InvoingoLaunch} from './InvoingoLaunch';
import {InvoingoIntro} from './InvoingoIntro';
import {InvoingoIntroIntegrated} from './InvoingoIntroIntegrated';
import {QuickSendIntro} from './QuickSendIntro';
import {InvoingoIntroV4} from './InvoingoIntroV4';

registerRoot(() => React.createElement(React.Fragment, null,
  React.createElement(Composition, {id: 'InvoingoLaunch', component: InvoingoLaunch, width: 1920, height: 1080, fps: 30, durationInFrames: 1350}),
  React.createElement(Composition, {id: 'InvoingoIntro', component: InvoingoIntro, width: 1920, height: 1080, fps: 30, durationInFrames: 1800}),
  React.createElement(Composition, {id: 'InvoingoIntroIntegrated', component: InvoingoIntroIntegrated, width: 1920, height: 1080, fps: 30, durationInFrames: 1710}),
  React.createElement(Composition, {id: 'QuickSendIntro', component: QuickSendIntro, width: 1920, height: 1080, fps: 30, durationInFrames: 1800}),
  React.createElement(Composition, {id: 'InvoingoIntroV4', component: InvoingoIntroV4, width: 1920, height: 1080, fps: 30, durationInFrames: 1800})
));
