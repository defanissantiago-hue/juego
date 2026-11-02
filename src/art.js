// Canvas pixel art original, drawn at low resolution and scaled with nearest-neighbor.
const c=(w,h)=>{const el=document.createElement('canvas');el.width=w;el.height=h;return [el,el.getContext('2d',{willReadFrequently:false})]};
const box=(g,x,y,w,h,color)=>{g.fillStyle=color;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));};
const shade=(col,adjust)=>{let n=parseInt((col||'#777777').slice(1),16);let r=Math.max(0,Math.min(255,(n>>16)+adjust)),g=Math.max(0,Math.min(255,((n>>8)&255)+adjust)),b=Math.max(0,Math.min(255,(n&255)+adjust));return `rgb(${r},${g},${b})`;};
const rng=(seed)=>{let n=seed>>>0;return()=>{n=(n*1664525+1013904223)>>>0;return n/4294967296}};
export {pixelHero,npcArt} from './character-art.js';
export function textureTile(type,seed=0){const [canvas,g]=c(24,24);const random=rng(seed*71+1234);
 let base={grass:'#528b57',grass2:'#4f8b51',darkgrass:'#315e4b',forest:'#335e45',path:'#b2a476',cobble:'#81796d',water:'#398d9d',dirt:'#786648',dungeon:'#444b50',wall:'#60605e',bridge:'#8a603b'}[type]||'#5f8f56';box(g,0,0,24,24,base);
 if(type==='water'){for(let i=0;i<9;i++){let x=random()*24,y=random()*24;box(g,x,y,4+random()*4,1,random()>.5?'#5cb9b8':'#276c8f')}return canvas}
 for(let i=0;i<35;i++){let x=random()*24,y=random()*24;let color=type==='grass'||type==='grass2'?(random()>.5?'#75a35b':'#3c754c'):type==='forest'?(random()>.5?'#3b7554':'#29513f'):type==='path'?(random()>.5?'#c6b788':'#998b68'):type==='cobble'||type==='wall'||type==='dungeon'?(random()>.5?'#777874':'#343d45'):(random()>.5?'#9c8059':'#634a31');box(g,x,y,1+random()*4,1+random()*2,color)}
 if(type==='grass'||type==='grass2'||type==='forest'){for(let i=0;i<3;i++){let x=random()*23,y=random()*23;box(g,x,y,1,3,'#2d6240');box(g,x+2,y+1,1,2,'#83b963')}if(random()>.78){let x=random()*20,y=random()*20;box(g,x,y,3,2,'#d8c78c');box(g,x+1,y+1,1,1,'#f5f3b0')}}
 if(type==='cobble'||type==='dungeon'){for(let y=0;y<24;y+=8){box(g,0,y,24,1,'#343d3d');for(let x=(y%16===0?0:7);x<24;x+=12)box(g,x,y,1,8,'#393f41')}}
 if(type==='bridge'){for(let x=0;x<24;x+=7){box(g,x,0,2,24,'#5a3e2d');box(g,x+2,1,4,21,'#a77848')}}return canvas;
}
export function treeArt(seed=1,pine=false,autumn=false){const [canvas,g]=c(48,62);const random=rng(seed*55+25);const leaf=autumn?['#ad6b33','#dc9549','#e7ad50','#8b592f']:pine?['#173f36','#28644a','#337a59','#4d9360']:['#245f43','#317d4e','#41945d','#67a765'];
 box(g,20,34,10,24,'#473d35');box(g,22,31,6,23,'#806545');box(g,20,48,3,8,'#97744e');box(g,25,41,2,11,'#312c28');
 if(pine){for(let i=0;i<4;i++){let y=27-i*8,w=42-i*9;box(g,24-w/2,y,w,15,leaf[i%4]);box(g,24-w/2+3,y+2,w-9,4,leaf[(i+2)%4])}}
 else{for(let i=0;i<31;i++){let x=6+random()*34,y=6+random()*34,r=5+random()*9;box(g,x-r/2,y-r/2,r,r,leaf[Math.floor(random()*4)])}for(let i=0;i<27;i++){let x=6+random()*35,y=7+random()*25;box(g,x,y,2+random()*3,2,leaf[2+(random()>.65?1:0)])}}
 return canvas;
}
export function bushArt(seed=1){const [canvas,g]=c(28,20),random=rng(seed);const col=['#2d6242','#408855','#64a45a','#8eb866'];for(let i=0;i<30;i++){let x=1+random()*23,y=4+random()*12,r=3+random()*7;box(g,x,y,r,r,col[Math.floor(random()*4)])}return canvas}
export function plantArt(seed=1,kind='flower'){const [canvas,g]=c(18,18),random=rng(seed*77);for(let i=0;i<7;i++){let x=3+random()*13,y=5+random()*12;box(g,x,y,1,6,'#276b46');box(g,x-2,y+2,4,2,'#45935d');if(kind==='flower')box(g,x,y,3,3,['#ffe2a1','#f39b85','#d9c0f2'][i%3]);else box(g,x,y,3,2,'#9ba56d')}return canvas}
export function rockArt(seed=1,ore=false){const [canvas,g]=c(26,23),random=rng(seed*59+8);const colors=['#4d5957','#65746d','#829188','#35464b'];box(g,3,12,20,8,colors[0]);box(g,5,5,16,12,colors[1]);box(g,8,3,10,4,colors[2]);for(let i=0;i<12;i++){let x=4+random()*18,y=6+random()*12;box(g,x,y,2+random()*3,2,colors[Math.floor(random()*4)])}if(ore){box(g,7,8,3,4,'#70c4d4');box(g,11,11,5,3,'#8debf1');box(g,17,6,3,5,'#3a99a8')}return canvas}
export function creatureArt(type,frame=0){const boss=type==='signar',size=boss?52:32;const [canvas,g]=c(size,size);const r=(x,y,w,h,col)=>box(g,x,y,w,h,col);
 if(type==='slime'){r(5,19,22,8,'#1c5b37');r(7,13,18,13,'#65b344');r(10,10,12,8,'#87d45c');r(10,18,3,4,'#192a2c');r(19,18,3,4,'#192a2c');r(11,15,2,2,'#e8ffb2');r(20,14,2,2,'#d5f48f');r(8,25,16,2,'#245735')}
 else if(type==='rabbit'||type==='crimson'){let bad=type==='crimson',fur=bad?'#702f4c':'#9b8f7c';r(10,10,13,16,fur);r(10,1,4,14,fur);r(19,2,4,13,fur);r(13,4,1,9,bad?'#fd5477':'#e4adb7');r(20,5,1,7,bad?'#fd5477':'#e4adb7');r(8,17,18,9,bad?'#a84b63':'#b3a391');r(10,23,6,5,'#5d514b');r(20,23,6,5,'#5d514b');r(12,17,3,3,bad?'#ff1c41':'#2d373c');r(21,17,3,3,bad?'#ff1c41':'#2d373c');if(bad){r(3,13,2,17,'#ed4058');r(27,13,2,17,'#ed4058');r(2,10,4,4,'#fff5ca');r(26,10,4,4,'#fff5ca')}}
 else if(type==='wolf'||type==='nightwolf'){let evil=type==='nightwolf';r(6,11,21,17,evil?'#423b48':'#766e65');r(5,6,7,12,'#524b48');r(22,6,7,12,'#4c474a');r(9,9,16,11,evil?'#51434e':'#938578');r(9,18,16,8,'#c1b7a2');r(12,18,3,3,evil?'#ff1b2b':'#e9c879');r(21,18,3,3,evil?'#ff1b2b':'#e9c879');r(16,21,4,4,'#242c34');r(8,26,5,4,'#393c3c');r(23,26,5,4,'#393c3c')}
 else if(type==='goblin'){r(8,11,16,18,'#527649');r(3,13,7,6,'#769c61');r(22,13,7,6,'#769c61');r(10,9,12,9,'#92ab6e');r(12,15,3,3,'#d7a93f');r(19,15,3,3,'#d7a93f');r(11,23,13,6,'#5d473b');r(6,23,4,9,'#4c473e');r(23,23,4,9,'#4c473e')}
 else if(type==='gnome'){r(10,7,12,10,'#bb9d79');r(7,3,18,10,'#8f5c41');r(12,0,8,5,'#be7c44');r(10,17,12,11,'#6e757c');r(8,19,3,11,'#9d8372');r(22,19,3,11,'#9d8372');r(8,26,8,5,'#3c4148');r(18,26,8,5,'#3c4148');r(14,14,2,2,'#293c3a');r(20,14,2,2,'#293c3a');r(26,10,2,17,'#8b7451');r(25,8,7,3,'#a6a3a0')}
 else if(boss){r(15,35,12,15,'#4c525a');r(29,35,12,15,'#4c525a');r(10,15,34,25,'#414b52');r(8,14,38,7,'#9da3a1');r(13,9,28,18,'#b38a65');r(17,0,19,11,'#7c8384');r(11,8,33,4,'#c3a566');r(13,24,29,12,'#b97b3e');r(18,25,7,4,'#ebcc7c');r(29,25,7,4,'#ebcc7c');r(18,15,4,4,'#e7775c');r(32,15,4,4,'#e7775c');r(3,24,9,18,'#909b9f');r(42,21,8,16,'#909b9f');r(44,4,3,41,'#96754b');r(38,2,14,8,'#b0bcc0');r(40,3,8,3,'#e2e5ce')}
 return canvas;
}
