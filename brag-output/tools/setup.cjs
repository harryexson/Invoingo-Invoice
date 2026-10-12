const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),out=path.join(root,'brag-output');
for(const p of ['composition/assets','reference','tools'])fs.mkdirSync(path.join(out,p),{recursive:true});
fs.mkdirSync(path.join(root,'.local-tools/video-bin'),{recursive:true});
fs.copyFileSync(path.join(root,'.local-tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'),path.join(root,'.local-tools/video-bin/ffmpeg.exe'));
const cache=path.join(root,'.local-tools/npm-cache/_npx');
for(const id of fs.readdirSync(cache)){
 const p=path.join(cache,id,'node_modules/hyperframes/package.json');
 if(fs.existsSync(p)){const pkg=JSON.parse(fs.readFileSync(p));console.log('Hyperframes package',p,'bin',pkg.bin);}
}
for(const p of [path.join(process.env.LOCALAPPDATA,'ms-playwright'),path.join(process.env.USERPROFILE,'.cache/puppeteer'),path.join(process.env.LOCALAPPDATA,'hyperframes')]){if(fs.existsSync(p))console.log('Browser candidates',p,fs.readdirSync(p));}
for(const f of ['inter-400.ttf','inter-600.ttf','inter-700.ttf','inter-900.ttf'])fs.copyFileSync(path.join(root,'landing/assets',f),path.join(out,'composition/assets',f));
fs.copyFileSync(path.join(root,'.local-tools/video-runtime/node_modules/gsap/dist/gsap.min.js'),path.join(out,'composition/assets/gsap.min.js'));
fs.copyFileSync(require(path.join(root,'.local-tools/video-runtime/node_modules/ffprobe-static')).path,path.join(root,'.local-tools/video-bin/ffprobe.exe'));
