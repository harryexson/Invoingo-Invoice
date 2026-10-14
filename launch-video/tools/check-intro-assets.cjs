const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../public/intro');
const required = [
  'videos/office-entrance-take.mp4',
  'videos/seated-introduction-take.mp4',
  'videos/miobot-question-take.mp4',
  'videos/closing-take.mp4',
  'phone-screen-start-v2.png',
  'audio/miobot-maya-response.wav',
  'audio/miobot-alex-response.wav',
  'audio/music-bed.wav',
  '../screens/current-miobot-draft-full.jpg',
  '../screens/current-miobot-alex-full.jpg',
];

const missing = required.filter((file) => !fs.existsSync(path.resolve(root, file)));
if (missing.length) {
  console.error(`The phone-led film cannot render yet. Required source media missing:\n${missing.join('\n')}`);
  process.exit(1);
}

console.log('Phone-led source files are present. Review generated motion and speech sync before publishing.');
