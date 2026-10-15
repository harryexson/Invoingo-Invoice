const fs = require('node:fs');
const path = require('node:path');
const visualQuality = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../production-v4/visual-quality.json'), 'utf8'));
if (!visualQuality.fullFilmPhoneFootageReady) {
  console.error('Full-film export blocked: ' + visualQuality.reason);
  process.exit(1);
}

const videoRoot = path.resolve(__dirname, '../public/intro/videos');
const introRoot = path.resolve(__dirname, '../public/intro');
const required = [
  path.join(videoRoot, 'office-entrance-take.mp4'),
  path.join(videoRoot, 'v4-introduction-take.mp4'),
  path.join(videoRoot, 'v4-closing-take.mp4'),
  path.join(videoRoot, 'phone-motion-v4.mp4'),
  ...['current-home.png','current-miobot-draft.png','current-miobot-alex.png'].map(file=>path.resolve(introRoot,'ui-v4',file)),
  path.join(introRoot, 'audio/music-bed.wav'),
  ...['cheryl-business.wav', 'cheryl-question.wav', 'cheryl-reminder.wav', 'cheryl-paid-update.wav', 'miobot-maya.wav', 'miobot-alex.wav'].map((file) => path.resolve(introRoot, 'audio/v4', file)),
  ...['current-home-full.jpg', 'current-miobot-draft-full.jpg', 'current-miobot-alex-full.jpg'].map((file) => path.resolve(__dirname, '../public/screens', file)),
];

const empty = required.filter((file) => !fs.existsSync(file) || fs.statSync(file).size === 0);
if (empty.length) {
  console.error('Invoingo v4 cannot render: required footage or verified audio/UI assets are missing.\n' + empty.map((file) => path.relative(path.resolve(__dirname, '..'), file)).join('\n'));
  process.exit(1);
}
console.log('Invoingo v4 local footage, audio, and real UI assets are ready.');
