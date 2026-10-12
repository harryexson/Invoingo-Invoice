const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../public/intro/videos');
const required=['invoingo-launch-base.mp4','introduction.mp4'];
const missing=required.filter(file=>!fs.existsSync(path.join(root,file))||fs.statSync(path.join(root,file)).size===0);
if(missing.length){console.error('The integrated film cannot render yet. Required source media missing or empty:\n'+missing.join('\n'));process.exit(1);}
console.log('Integrated-film source files are present. Inspect the entrance, sit-down, full speech, picture continuity and audio before publishing.');
