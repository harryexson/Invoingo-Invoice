import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {PhoneCloseupV5} from './PhoneCloseupV5';
registerRoot(()=>React.createElement(Composition,{id:'InvoingoPhoneCloseupV5',component:PhoneCloseupV5,width:1920,height:1080,fps:30,durationInFrames:180}));
