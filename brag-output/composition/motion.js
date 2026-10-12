/* Every animation is seek-safe and registered on one paused Hyperframes timeline. */
const tl=gsap.timeline({paused:true});
const enter=(sel,time,from,to={},duration=.65)=>{gsap.set(sel,from);return tl.fromTo(sel,from,{...to,duration,ease:'power3.out',immediateRender:false},time);};
const scenes=[['#hook',0,2.5],['#create',2.5,7],['#send',7,10.5],['#paid',10.5,14],['#business',14,17],['#outro',17,20]];
scenes.forEach(([s,start,end])=>{
 tl.fromTo(s,{autoAlpha:0},{autoAlpha:1,duration:.001,immediateRender:false},Math.max(0,start-.002));
 if(end<20)tl.to(s,{autoAlpha:0,duration:.001},end-.001);
});
enter('#hook .word',.07,{y:95,opacity:0,rotation:3},{y:0,opacity:1,rotation:0,stagger:.11},.62);
enter('.hooksub',.55,{y:25,opacity:0},{y:0,opacity:1},.45);
enter('.hook-line',.1,{scaleX:0},{scaleX:1},.5);
enter('.float-receipt',0,{scale:.35,opacity:0,y:80},{scale:1,opacity:1,y:0,stagger:.075},.65);
tl.to('.r1',{y:-25,rotation:-10,duration:1.55,ease:'sine.inOut'},.7);
tl.to('.r2',{y:25,rotation:10,duration:1.55,ease:'sine.inOut'},.7);
enter('.orbit-check',.45,{scale:0,rotation:-70},{scale:1,rotation:0},.7);
tl.to('#hook .headline',{scale:1.12,y:-20,opacity:0,duration:.32,ease:'power3.in'},2.18);
tl.to('.float-receipt',{y:230,opacity:0,stagger:.015,duration:.3,ease:'power3.in'},2.18);
// Beat-locked: scene 02 at 2.5s, on the original score's eighth-note grid.
enter('#create .copy',2.5,{y:85,opacity:0},{y:0,opacity:1},.62);
enter('.invoice',2.5,{x:480,y:85,rotation:18,scale:.8},{x:0,y:0,rotation:0,scale:1},.8);
enter('.invoice-shadow',2.7,{opacity:0,scale:.85},{opacity:1,scale:1},.6);
enter('.catalog-tag:not(.second)',3,{x:-200,opacity:0,rotation:-8},{x:0,opacity:1,rotation:0},.5);
enter('.catalog-tag.second',3.5,{x:-200,opacity:0,rotation:-8},{x:0,opacity:1,rotation:0},.5);
// Beat-grid: item rows land at 3.5 and 4.0, then hold for more than two seconds.
enter('.item1',3.5,{x:-40,opacity:0},{x:0,opacity:1},.4);
enter('.item2',4,{x:-40,opacity:0},{x:0,opacity:1},.4);
tl.to('.catalog-tag',{x:190,y:40,scale:.75,opacity:0,stagger:.5,duration:.4,ease:'power3.in'},3.55);
enter('.total',4.4,{y:25,opacity:0},{y:0,opacity:1},.4);
enter('.create-tap',5.35,{scale:1.4,opacity:0},{scale:.8,opacity:.8},.15);
tl.to('.create-tap',{scale:1.8,opacity:0,duration:.5},5.5);
tl.to('.preview-button',{scale:.965,duration:.12,yoyo:true,repeat:1},5.5);
tl.to('.invoice',{x:-180,scale:1.06,rotation:-6,duration:.45,ease:'power3.inOut'},6.55);
tl.to('#create .copy',{x:-120,opacity:0,duration:.35},6.65);
// Beat-locked: matched invoice silhouette moves into the send surface at 7s.
enter('.send-doc',7,{x:105,scale:1.16,rotation:0},{x:0,scale:1,rotation:-6},.55);
enter('.sendtitle',7.05,{y:75,opacity:0},{y:0,opacity:1},.55);
enter('.sendsub,.send-label',7.3,{y:35,opacity:0},{y:0,opacity:1,stagger:.15},.5);
enter('.tracking',7.45,{x:140,opacity:0,rotation:5},{x:0,opacity:1,rotation:0},.65);
enter('.flight-path',7.45,{opacity:0},{opacity:1},.4);
enter('.send-orb',7.5,{scale:.25,opacity:0},{scale:1,opacity:1},.3);
tl.to('.send-orb',{x:200,y:100,scale:.6,duration:.75,ease:'power2.inOut'},7.8);
tl.to('.send-orb',{opacity:0,duration:.15},8.55);
enter('.sent-badge',8,{y:25,scale:.8,opacity:0},{y:0,scale:1,opacity:1},.4);
// Beat-grid: tracking states arrive at 8, 8.5, 9 seconds.
enter('.track-row',8,{x:30,opacity:0},{x:0,opacity:1,stagger:.5},.35);
tl.to('.send-doc,.tracking,.sent-badge',{y:-60,opacity:0,stagger:.025,duration:.35,ease:'power3.in'},10.15);
// Beat-locked: payment reveal at 10.5s, three-note resolution at 11s.
enter('.paytitle',10.5,{y:80,opacity:0},{y:0,opacity:1},.6);
enter('.paid-card',10.5,{y:200,rotation:10,scale:.85},{y:0,rotation:0,scale:1},.7);
enter('.paid-ring',10.65,{scale:0,rotation:-50},{scale:1,rotation:0},.55);
tl.to('.pay-check',{strokeDashoffset:0,duration:.55,ease:'power2.out'},11);
enter('.paid-under',11,{y:30,opacity:0},{y:0,opacity:1},.5);
enter('.burst',11,{scale:.7,opacity:.5},{scale:2.5,opacity:0},.8);
const sparkRoot=document.querySelector('.paid-sparks');
for(let i=0;i<10;i++){
 const el=document.createElement('i');el.className='spark';sparkRoot.appendChild(el);
 const a=i*Math.PI/5;
 enter(el,11,{x:0,y:0,scale:0,opacity:1,rotation:i*36},{x:Math.cos(a)*210,y:Math.sin(a)*210,scale:1,rotation:i*36+50},.55);
 tl.to(el,{opacity:0,scale:.3,duration:.4},11.55);
}
tl.to('.paid-card',{y:-20,rotation:-2,duration:1.3,ease:'sine.inOut'},12);
tl.to('.paytitle,.paid-under',{x:-150,opacity:0,duration:.3},13.7);
tl.to('.paid-card,.paid-ring',{scale:.85,opacity:0,duration:.3},13.7);
// Beat-locked: the business dashboard takes over at 14s.
enter('.business-title',14,{y:65,opacity:0},{y:0,opacity:1},.55);
enter('.report',14,{x:250,rotation:10,opacity:0},{x:0,rotation:0,opacity:1},.65);
enter('.bar',14.45,{scaleY:0},{scaleY:1,stagger:.09},.65);
enter('.saved',14.65,{x:-70,y:100,opacity:0},{x:0,y:0,opacity:1},.55);
enter('.expense',14.9,{x:90,y:100,opacity:0},{x:0,y:0,opacity:1},.55);
enter('.business-pill',14.7,{y:30,opacity:0},{y:0,opacity:1},.45);
tl.to('.report,.saved,.expense',{y:-100,scale:.88,opacity:0,stagger:.025,duration:.35,ease:'power3.in'},16.65);
// Beat-locked: identity at 17s. Hold settled from 17.85 to the end.
enter('.outro-icon',17,{scale:.2,rotation:-65,y:150},{scale:1,rotation:0,y:0},.7);
enter('.outro-brand>span',17.1,{x:160,opacity:0},{x:0,opacity:1},.65);
enter('.outro-tag',17.4,{y:32,opacity:0},{y:0,opacity:1},.45);
enter('.outro-cta,.outro-platform',17.55,{y:28,opacity:0},{y:0,opacity:1,stagger:.1},.45);
enter('.orbit-line',17,{scale:.75,opacity:0},{scale:1,opacity:1,stagger:.1},1.1);
tl.to('.end-dot',{x:45,y:140,duration:3,ease:'sine.inOut'},17);
// Per-frame PCM RMS subtly breathes the existing halo. No text pulse or visualizer.
const energy=window.INVOINGO_ENERGY||[];
if(energy.length)tl.to('.halo',{keyframes:energy.map(v=>({opacity:.35+v*.23,duration:1/30})),ease:'none'},0);
tl.to({}, {duration:20},0);
window.__timelines=window.__timelines||{};window.__timelines.invoingo=tl;
