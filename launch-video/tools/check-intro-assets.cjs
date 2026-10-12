const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../public/intro');
const required=['videos/office-entrance.mp4','videos/sit-down.mp4','videos/introduction.mp4','videos/closing.mp4','audio/cheryl-invoices.wav','audio/cheryl-miobot.wav','audio/cheryl-features.wav','audio/music-bed.wav'];
const missing=required.filter(file=>!fs.existsSync(path.join(root,file)));
if(missing.length){console.error('The revised film cannot render yet. Required source media missing:\n'+missing.join('\n'));process.exit(1);}
console.log('Required source files are present. Review generated footage and speech sync before publishing.');
