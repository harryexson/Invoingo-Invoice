(function(root){
 'use strict';
 const messages={
  'not-allowed':'Microphone access is blocked. Allow the microphone in your browser settings, or use keyboard dictation.',
  'service-not-allowed':'Speech recognition is unavailable in this browser. Use keyboard dictation or type your request.',
  'audio-capture':'No microphone was found. Connect one or use keyboard dictation.',
  'no-speech':'No speech was detected. Tap the microphone to try again.',
  network:'The speech service could not connect. Check your connection, or type your request.',
  'language-not-supported':'This speech language is unavailable. Use keyboard dictation or type your request.'
 };
 function create({Recognition,secure=true,onState=()=>{},onTranscript=()=>{},schedule=setTimeout,cancel=clearTimeout,language='en-US'}){
  let current=null,timer=null;
  const clear=()=>{if(timer!==null){cancel(timer);timer=null;}};
  function stop(){const previous=current;current=null;clear();if(previous){try{previous.abort();}catch{}}onState('idle','Microphone off. Review your words before asking MioBot.');}
  function start(){
   if(current){stop();return;}
   if(!secure){onState('error','Microphone input requires HTTPS. Open the secure app link or use keyboard dictation.');return;}
   if(!Recognition){onState('unsupported','This browser does not expose speech recognition. Tap the question field and use your phone keyboard’s microphone, or type.');return;}
   let r;try{r=new Recognition();}catch{onState('error','Speech recognition could not start. Use keyboard dictation or type.');return;}
   current=r;r.lang=language;r.interimResults=true;r.continuous=false;r.maxAlternatives=1;onState('starting','Starting microphone…');
   r.onstart=()=>{if(current===r)onState('listening','Listening… Tap the microphone again to cancel.');};
   r.onresult=event=>{if(current!==r)return;let transcript='',final='';for(let n=0;n<event.results.length;n++){const result=event.results[n];const words=result[0]?.transcript||'';transcript+=words+' ';if(result.isFinal)final+=words+' ';}onTranscript((final||transcript).trim().slice(0,2000));if(final.trim())onState('review','Review your words, then tap Ask. Nothing has been sent.');};
   r.onerror=event=>{if(current!==r)return;current=null;clear();onState(event.error==='aborted'?'idle':'error',messages[event.error]||'Voice input stopped. Try again, use keyboard dictation or type.');};
   r.onend=()=>{if(current!==r)return;current=null;clear();onState('idle','Microphone off. Review your words, then tap Ask.');};
   try{r.start();timer=schedule(()=>{if(current===r)stop();},40000);}catch{current=null;clear();onState('error','Microphone could not start. Check browser permissions or use keyboard dictation.');}
  }
  return {start,stop,isActive:()=>!!current};
 }
 const api={create};if(typeof module!=='undefined')module.exports=api;else root.MioVoice=api;
})(typeof window==='undefined'?globalThis:window);
