import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {PhoneInteractionProof} from './TrackedPhoneV4';
registerRoot(()=>React.createElement(Composition,{id:'InvoingoPhoneProof',component:PhoneInteractionProof,width:1920,height:1080,fps:30,durationInFrames:180}));
