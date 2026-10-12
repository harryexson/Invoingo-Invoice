const path=require('node:path'),{spawnSync}=require('node:child_process');
const project=path.resolve(__dirname,'..'),root=path.resolve(project,'..');
const result=spawnSync(path.join(root,'.local-tools/video-bin/ffmpeg.exe'),['-y','-hide_banner','-i',path.join(project,'dist/invoingo-launch-remotion.mp4'),'-c:v','copy','-af','atrim=duration=45,asetpts=PTS-STARTPTS,loudnorm=I=-16:TP=-1.5:LRA=11','-c:a','aac','-b:a','192k','-ar','48000','-t','45','-movflags','+faststart',path.join(project,'dist/invoingo-launch-45s.mp4')],{stdio:'inherit'});
process.exitCode=result.status||0;
