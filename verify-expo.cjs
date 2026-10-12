const path=require('node:path');const {execFileSync}=require('node:child_process');
const root=path.join(__dirname,'expo-preview');
const env={...process.env,EXPO_OFFLINE:'1',EXPO_NO_TELEMETRY:'1',NODE_OPTIONS:[process.env.NODE_OPTIONS,'--use-system-ca'].filter(Boolean).join(' ')};
for(const platform of ['ios','android'])execFileSync(process.execPath,[path.join(root,'node_modules/expo/bin/cli'),'export','--platform',platform,'--no-bytecode','--max-workers','2','--output-dir',`dist/${platform}`],{cwd:root,env,stdio:'inherit'});
