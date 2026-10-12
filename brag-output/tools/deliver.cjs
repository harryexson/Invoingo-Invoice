const fs=require('node:fs');const path=require('node:path');const {spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'../..');const out=path.join(root,'brag-output');
const ff=path.join(root,'.local-tools/video-bin/ffmpeg.exe');const probe=path.join(root,'.local-tools/video-bin/ffprobe.exe');
const film=path.join(out,'brag.mp4');const poster=path.join(out,'brag.jpg');
function run(exe,args){const r=spawnSync(exe,args,{encoding:'utf8',maxBuffer:4e6});if(r.status!==0)throw Error(r.stderr||r.stdout);return r.stdout;}
// Choose the settled final identity, then bake just its pixels into frame zero.
run(ff,['-v','error','-y','-ss','18.8','-i',film,'-frames:v','1','-q:v','2',poster]);
const baked=path.join(out,'brag.poster.mp4');
run(ff,['-v','error','-y','-i',film,'-i',poster,'-filter_complex',"[0:v][1:v]overlay=0:0:enable='eq(n,0)'[v]",'-map','[v]','-map','0:a?','-c:v','libx264','-crf','18','-preset','medium','-pix_fmt','yuv420p','-c:a','copy','-movflags','+faststart',baked]);
const info=JSON.parse(run(probe,['-v','error','-count_frames','-show_entries','stream=codec_name,codec_type,width,height,r_frame_rate,nb_read_frames,duration,channels,sample_rate:format=duration,size','-of','json',baked]));
const v=info.streams.find(s=>s.codec_type==='video'),a=info.streams.find(s=>s.codec_type==='audio');
if(!v||v.width!==1920||v.height!==1080||v.nb_read_frames!=='600'||!a||a.channels!==2||Math.abs(Number(info.format.duration)-20)>.08)throw Error('Final media validation failed: '+JSON.stringify(info));
run(ff,['-v','error','-i',baked,'-f','null','-']);
fs.copyFileSync(film,path.join(out,'brag.original.mp4'));fs.copyFileSync(baked,film);
fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(info,null,2));
const assets=path.join(root,'landing/assets');
if(!fs.existsSync(path.join(out,'previous-landing-film.mp4')))fs.copyFileSync(path.join(assets,'invoingo-film.mp4'),path.join(out,'previous-landing-film.mp4'));
fs.copyFileSync(film,path.join(assets,'invoingo-film.mp4'));fs.copyFileSync(poster,path.join(assets,'film-poster.jpg'));
const landing=path.join(root,'landing/index.html');let source=fs.readFileSync(landing,'utf8');
source=source.replace('00:20 · SOUND-FREE','00:20 · SOUND ON');
source=source.replace('This 20-second film has no audio.','This 20-second launch film includes an original electronic soundtrack and motion-matched sound effects.');
fs.writeFileSync(landing,source);
fs.appendFileSync(path.join(out,'progress.md'),'\n- Final render complete: 1920×1080, 30fps, 600 frames, 20 seconds, H.264 + stereo AAC. Full decode passed. Poster selected at 18.8s and baked into frame zero. Landing film updated.\n');
console.log(JSON.stringify({video:'brag-output/brag.mp4',poster:'brag-output/brag.jpg',...info},null,2));
