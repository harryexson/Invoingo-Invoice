const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),source=path.join(root,'brag-output/composition'),out=path.join(root,'brag-output/revision-2/composition');
fs.mkdirSync(path.join(out,'assets'),{recursive:true});
for(const file of ['gsap.min.js','energy.js','score.wav','inter-400.ttf','inter-600.ttf','inter-700.ttf','inter-900.ttf'])fs.copyFileSync(path.join(source,'assets',file),path.join(out,'assets',file));
console.log('Revision assets ready: brag-output/revision-2/composition/assets');
