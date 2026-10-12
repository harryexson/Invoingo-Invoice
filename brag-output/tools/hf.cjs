const path=require('node:path');const {spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'../..');
const env={...process.env,npm_config_cache:path.join(root,'.local-tools/npm-cache'),NODE_OPTIONS:'--use-system-ca',DO_NOT_TRACK:'1',HYPERFRAMES_TELEMETRY_DISABLED:'1'};
env.PATH=path.join(root,'.local-tools/video-bin')+';'+env.PATH;
const cli=path.join(root,'.local-tools/npm-cache/_npx/702923228c2ce1e6/node_modules/hyperframes/bin/hyperframes.mjs');
const result=spawnSync(process.execPath,[cli,...process.argv.slice(2)],{stdio:'inherit',env,cwd:process.cwd()});
process.exit(result.status??1);
