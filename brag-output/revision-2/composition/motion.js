const tl=gsap.timeline({paused:true});
const enter=(sel,start,from,to,d=.6)=>{gsap.set(sel,from);tl.fromTo(sel,from,{...to,duration:d,ease:'power3.out',immediateRender:false},start);};
const scenes=[['#s1',0,2.5],['#s2',2.5,6.5],['#s3',6.5,10],['#s4',10,13.5],['#s5',13.5,17],['#s6',17,20]];
for(const [s,start,end] of scenes){tl.fromTo(s,{autoAlpha:0},{autoAlpha:1,duration:.001,immediateRender:false},Math.max(0,start-.002));if(end<20)tl.to(s,{autoAlpha:0,duration:.001},end-.001);}
// Graphic content is present from the first playable frame.
enter('#s1 .copy',0,{y:30,opacity:1},{y:0,opacity:1},.5);
enter('.browser-card',0,{scale:.9,x:70,rotation:-4,opacity:1},{scale:1,x:0,rotation:0,opacity:1},.85);
enter('.hero-phone',0,{x:110,y:20,rotation:14,opacity:1},{x:0,y:0,rotation:8,opacity:1},.7);
enter('.hero-stamp',.45,{y:40,opacity:0},{y:0,opacity:1},.5);
tl.to('.browser-card',{scale:1.025,duration:1.3,ease:'sine.inOut'},1);
tl.to('#s1 .copy',{x:-60,opacity:0,duration:.22},2.28);
tl.to('.browser-card,.hero-phone',{y:-50,opacity:0,duration:.22},2.28);
// beat-locked: 2.5s. Actual catalog/estimate become editor/preview at 4.5s.
for(const [s,start] of scenes.slice(1,5)){
 enter(s+' .copy',start,{y:55,opacity:0},{y:0,opacity:1},.55);
 enter(s+' .first',start,{x:160,y:70,rotation:8,opacity:0},{x:0,y:0,rotation:-5,opacity:1},.7);
 enter(s+' .second',start+.1,{x:230,y:120,rotation:-5,opacity:0},{x:0,y:0,rotation:5,opacity:1},.75);
}
enter('#s2 .connector',3.15,{scale:0,opacity:0,rotation:-60},{scale:1,opacity:1,rotation:0},.5);
// beat-grid: UI screen transitions at 4.5 and 5s, with readable holds afterward.
tl.to('#s2 .first .image-current',{x:-70,opacity:0,duration:.35,ease:'power2.in'},4.5);
enter('#s2 .first .image-next',4.5,{x:100,opacity:0},{x:0,opacity:1},.4);
tl.to('#s2 .second .image-current',{x:-70,opacity:0,duration:.35,ease:'power2.in'},5);
enter('#s2 .second .image-next',5,{x:100,opacity:0},{x:0,opacity:1},.4);
tl.to('#s2 .connector',{rotation:20,scale:1.06,duration:.4,yoyo:true,repeat:1},4.5);
// beat-locked: 6.5s. Sending and invoice tracking dominate the frame.
enter('#s3 .connector',7.15,{scale:0,opacity:0,rotation:-60},{scale:1,opacity:1,rotation:0},.5);
tl.to('#s3 .connector',{x:60,scale:.8,duration:.55,ease:'power2.inOut'},8);
tl.to('#s3 .connector',{x:0,scale:1,duration:.55,ease:'power2.inOut'},8.55);
// beat-locked: 10s. Confirmation matches the original chime at 11s.
enter('.pay-stamp',10.8,{y:60,scale:.8,opacity:0},{y:0,scale:1,opacity:1},.5);
tl.to('.check-path',{strokeDashoffset:0,duration:.45,ease:'power2.out'},11);
tl.to('#s4 .second',{y:-12,rotation:3,duration:1.1,ease:'sine.inOut'},11.9);
// beat-locked: reports at 13.5s, identity at 17s.
enter('#s6 .copy',17,{y:40,opacity:0},{y:0,opacity:1},.55);
enter('.final-first',17,{x:200,y:100,rotation:8,opacity:0},{x:0,y:0,rotation:-9,opacity:1},.75);
enter('.final-second',17.15,{x:240,y:120,rotation:-8,opacity:0},{x:0,y:0,rotation:9,opacity:1},.75);
enter('.final-star',17.35,{scale:.2,rotation:-70,opacity:0},{scale:1,rotation:0,opacity:1},.75);
tl.to('.final-star',{rotation:30,duration:1.9,ease:'sine.inOut'},18.1);
for(const [s,start,end] of scenes.slice(1,5)){tl.to(s+' .copy',{y:-20,opacity:0,duration:.18},end-.18);tl.to(s+' .phone',{y:-50,scale:.95,opacity:0,duration:.18},end-.18);}
if(window.INVOINGO_ENERGY)tl.to('.aura',{keyframes:window.INVOINGO_ENERGY.map(v=>({opacity:.3+v*.45,duration:1/30})),ease:'none'},0);
tl.to({},{duration:20},0);
