const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'../..'),out=path.join(root,'brag-output/revision-2');
const ff=path.join(root,'.local-tools/video-bin/ffmpeg.exe'),probe=path.join(root,'.local-tools/video-bin/ffprobe.exe');
function run(exe,args){const r=spawnSync(exe,args,{encoding:'utf8',maxBuffer:4e6});if(r.status!==0)throw Error(r.stderr||r.stdout);return r.stdout;}
const src=path.join(out,'render.mp4'),poster=path.join(out,'brag.jpg'),film=path.join(out,'brag.mp4');
// A settled, legible feature scene becomes the idle thumbnail and first frame.
run(ff,['-v','error','-y','-ss','8.7','-i',src,'-frames:v','1','-q:v','2',poster]);
run(ff,['-v','error','-y','-i',src,'-i',poster,'-filter_complex',"[0:v][1:v]overlay=0:0:enable='eq(n,0)'[v]",'-map','[v]','-map','0:a','-c:v','libx264','-profile:v','baseline','-level','4.0','-crf','18','-preset','medium','-pix_fmt','yuv420p','-tag:v','avc1','-c:a','aac','-b:a','192k','-ar','48000','-ac','2','-movflags','+faststart',film]);
const info=JSON.parse(run(probe,['-v','error','-count_frames','-show_entries','stream=codec_name,codec_type,profile,pix_fmt,width,height,r_frame_rate,nb_read_frames,duration,channels,sample_rate:format=duration,size','-of','json',film]));
const v=info.streams.find(s=>s.codec_type==='video'),a=info.streams.find(s=>s.codec_type==='audio');
if(!v||v.width!==1920||v.height!==1080||v.nb_read_frames!=='600'||v.pix_fmt!=='yuv420p'||!a||a.channels!==2||Math.abs(Number(info.format.duration)-20)>.08)throw Error('Media validation failed');
run(ff,['-v','error','-i',film,'-f','null','-']);
fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify({...info,fullDecode:'passed',posterTime:8.7,posterBakedFrame:0},null,2));
fs.copyFileSync(film,path.join(root,'landing/assets/invoingo-features-v2-final.mp4'));
fs.copyFileSync(poster,path.join(root,'landing/assets/invoingo-features-v2-final-poster.jpg'));
for(const name of ['launch.html','index.html']){const file=path.join(root,'landing',name);let s=fs.readFileSync(file,'utf8').replaceAll('assets/invoingo-film.mp4','assets/invoingo-features-v2.mp4').replaceAll('assets/film-poster.jpg','assets/invoingo-features-v2-poster.jpg').replace('Your work becomes an invoice.<br>Your invoice gets its great finish.','The landing page. The mobile app.<br>See your business features in motion.').replace('Illustrative product flow and sample data.','Actual mobile preview screens with fictional sample data.').replace('Make it. Send it. Get on with it. An illustrative journey from estimate to invoice to recorded payment, made for people doing good work.','Actual Invoingo landing page and mobile preview screens: industry items, estimates, invoice templates, sharing, payment records, expenses and reports. Fictional demo data; payment scenes are illustrative.');fs.writeFileSync(file,s);}
for(const name of ['launch.html','index.html']){const file=path.join(root,'landing',name);const s=fs.readFileSync(file,'utf8').replaceAll('invoingo-features-v2.mp4','invoingo-features-v2-final.mp4').replaceAll('invoingo-features-v2-poster.jpg','invoingo-features-v2-final-poster.jpg');fs.writeFileSync(file,s);}
fs.writeFileSync(path.join(out,'progress.md'),'Completed Brag revision: actual landing page plus mobile preview screens, six scenes, 20 seconds. Hyperframes check passed with zero errors. 1080p H.264 Baseline/yuv420p, 600 frames, stereo AAC; full decode passed. Feature poster at 8.7s baked into frame zero. Deployed unique final v2 media filename to both landing players. Browser playback and visual review pending.\n');
console.log(JSON.stringify(info,null,2));
