'use strict';
const {DatabaseSync}=require('node:sqlite');const fs=require('node:fs'),path=require('node:path');
class MioStore{
 constructor(file){if(file!==':memory:')fs.mkdirSync(path.dirname(file),{recursive:true});this.sql=new DatabaseSync(file);this.sql.exec(fs.readFileSync(path.join(__dirname,'migrations/001-miobot.sql'),'utf8'));}
 getWorkspace(tenant){const row=this.sql.prepare('SELECT data,revision FROM miobot_workspace WHERE tenant=?').get(tenant);return row?{db:JSON.parse(row.data),revision:row.revision}:null;}
 workspace(tenant,db,expected){const current=this.getWorkspace(tenant);if(current&&expected!==undefined&&expected!==current.revision)throw Object.assign(Error('This workspace changed. Reload MioBot before syncing.'),{status:409});const revision=(current?.revision||0)+1;this.sql.prepare('INSERT INTO miobot_workspace VALUES(?,?,?) ON CONFLICT(tenant) DO UPDATE SET data=excluded.data,revision=excluded.revision').run(tenant,JSON.stringify(db),revision);return revision;}
 put(tenant,kind,id,data){this.sql.prepare('INSERT INTO miobot_records VALUES(?,?,?,?) ON CONFLICT(tenant,kind,id) DO UPDATE SET data=excluded.data').run(tenant,kind,id,JSON.stringify(data));return data;}
 get(tenant,kind,id){const r=this.sql.prepare('SELECT data FROM miobot_records WHERE tenant=? AND kind=? AND id=?').get(tenant,kind,id);return r?JSON.parse(r.data):null;}
 list(tenant,kind){return this.sql.prepare('SELECT data FROM miobot_records WHERE tenant=? AND kind=? ORDER BY rowid DESC LIMIT 500').all(tenant,kind).map(r=>JSON.parse(r.data));}
 close(){this.sql.close();}
}
module.exports={MioStore};
