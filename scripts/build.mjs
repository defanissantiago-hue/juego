import {cp,copyFile,mkdir,readFile,writeFile,access} from 'node:fs/promises';
import {join,resolve} from 'node:path';
const root=resolve('.'),out=join(root,'www');
await mkdir(out,{recursive:true});
for(const dir of ['src','assets'])await cp(join(root,dir),join(out,dir),{recursive:true,force:true});
for(const file of ['index.html','service-worker.js','manifest.webmanifest'])await copyFile(join(root,file),join(out,file));
const vendor=join(root,'node_modules','three','build');
try{
 await access(join(vendor,'three.module.js'));
 await mkdir(join(out,'vendor'),{recursive:true});
 await copyFile(join(vendor,'three.module.js'),join(out,'vendor','three.module.js'));
 await copyFile(join(vendor,'three.core.js'),join(out,'vendor','three.core.js'));
 const script=join(out,'src','main.js');
 const code=await readFile(script,'utf8');
 await writeFile(script,code.replace('https://cdn.jsdelivr.net/npm/three@0.181.0/build/three.module.js','../vendor/three.module.js'));
 const sw=join(out,'service-worker.js');
 await writeFile(sw,(await readFile(sw,'utf8')).replace("'./assets/icon-512.png'","'./assets/icon-512.png','./vendor/three.module.js','./vendor/three.core.js'"));
 console.log('Three.js incluido localmente: la PWA puede funcionar sin conexión después de instalarla.');
}catch{console.log('No hay node_modules/three: se usará el CDN (necesita internet). Ejecutá npm install para incluir Three.js localmente.');}
console.log('Web lista en /www');
