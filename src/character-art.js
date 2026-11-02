// Sprites originales chibi: un mismo dibujo para creador, personajes y NPC.
const hex=v=>/^#[0-9a-f]{6}$/i.test(v||'')?v:'#94715b';
const tint=(v,a)=>{const n=parseInt(hex(v).slice(1),16);return '#'+[(n>>16)&255,(n>>8)&255,n&255].map(x=>Math.min(255,Math.max(0,x+a)).toString(16).padStart(2,'0')).join('')};
const looks={
caballero:['plate','#aebdca','#5575b4','sword','#365784'],
clerigo:['robe','#e2c58c','#e7e4db','staff','#b1a184'],
sanadora:['robe','#e6cba5','#a7b8a2','staff','#809885'],
guardian:['plate','#929dab','#4c8b89','shield','#3d5d69'],
mago:['robe','#8b80c4','#8a68bf','staff','#383263'],
gladiador:['leather','#cba979','#aa553c','sword','#793a34'],
ladron:['leather','#929781','#5a8866','dagger','#374d40'],
asesino:['leather','#6c748b','#504568','dagger','#2e2b41'],
berserker:['leather','#a18b83','#9c413d','axe','#532c30'],
armero:['leather','#ad9680','#9a7351','bow','#604433'],
invocador:['robe','#99bec2','#348a9c','staff','#325b68'],
nigromante:['robe','#8c8b9d','#6c507e','staff','#352d4d'],
indefinido:['cloth','#c0a877','#b59057','dagger','#4e493c'],
anciana:['robe','#b8a4a4','#8c6e97','staff','#65546b'],
guard:['plate','#b1c2c9','#507eaa','spear','#344d69'],
merchant:['cloth','#d5a96c','#ac824e','none','#69543c'],
villager:['cloth','#a7ab81','#657d57','none','#695541'],
explorer:['leather','#d3ad7d','#668b74','dagger','#495c4b']
};
export function pixelHero(appearance={},dir='front',step=0,role='indefinido',equipment={}){
 const cv=document.createElement('canvas');cv.width=56;cv.height=72;const g=cv.getContext('2d');g.imageSmoothingEnabled=false;
 const r=(x,y,w,h,col)=>{if(w<=0||h<=0)return;g.fillStyle=col;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
 const p=(points,col)=>{g.fillStyle=col;g.beginPath();g.moveTo(Math.round(points[0][0]),Math.round(points[0][1]));for(let i=1;i<points.length;i++)g.lineTo(Math.round(points[i][0]),Math.round(points[i][1]));g.closePath();g.fill()};
 const a={skin:'#d7a076',hairColor:'#7c5339',eyes:'#448cbf',cloth:'#445e85',gender:'hombre',hair:0,...appearance};
 const cfg=looks[role]||looks.indefinido;
 const skin=hex(a.skin),hair=hex(a.hairColor),cloth=hex(a.cloth),eye=hex(a.eyes),line='#211c23',shadow='#342930',metal=cfg[1],accent=role==='indefinido'?cloth:cfg[2],cape=cfg[4];
 const side=dir==='left'||dir==='right',left=dir==='left',back=dir==='back',stride=step===1?2:step===2?-2:0;
 const w=Math.round(19*Math.max(.87,Math.min(1.14,(a.build||100)/100))),bx=Math.round((56-w)/2);
 const armored=cfg[0]==='plate',robed=cfg[0]==='robe',leather=cfg[0]==='leather';
 p([[bx+2,31],[bx+w-1,31],[bx+w+7,59],[bx+w+1,63],[bx-6,60]],line);
 p([[bx+3,32],[bx+w-2,32],[bx+w+5,57],[bx+w,59],[bx-4,57]],tint(cape,-19));
 r(bx-3,42,3,15,tint(cape,12));r(bx+w+1,42,2,13,tint(cape,-37));
 const ls=stride>0?2:0,rs=stride<0?2:0;
 r(bx+2,48+ls,8,13,line);r(bx+w-10,48+rs,8,13,line);
 r(bx+3,49+ls,6,10,tint(cloth,-38));r(bx+w-9,49+rs,6,10,tint(cloth,-37));
 r(bx+3,52+ls,2,5,tint(cloth,18));r(bx+w-8,52+rs,2,5,tint(cloth,15));
 for(const [xx,sh] of [[bx+1,ls],[bx+w-11,rs]]){
 r(xx,59+sh,11,8,line);r(xx+1,59+sh,9,5,armored?tint(metal,-42):'#664934');
 r(xx+2,60+sh,6,2,armored?tint(metal,20):'#a57951');r(xx,65+sh,12,2,shadow);
 }
 p([[bx,30],[bx+w-1,30],[bx+w+3,36],[bx+w,49],[bx-2,49],[bx-4,36]],line);
 p([[bx+1,32],[bx+w-2,32],[bx+w+1,37],[bx+w-1,48],[bx,48],[bx-2,37]],armored?tint(metal,-54):tint(cloth,-33));
 p([[bx+3,33],[bx+w-4,33],[bx+w-2,46],[bx+1,46]],robed?accent:cloth);
 r(bx+4,34,3,10,tint(robed?accent:cloth,32));r(bx+w-5,34,2,11,tint(robed?accent:cloth,-30));
 if(robed){p([[bx+1,44],[bx+w-2,44],[bx+w+2,61],[bx-4,61]],line);p([[bx+2,45],[bx+w-3,45],[bx+w,59],[bx-2,59]],tint(accent,-17));r(bx+4,48,3,10,tint(accent,31));r(bx+w-5,47,2,11,tint(accent,-33));r(27,47,2,12,tint(metal,20))}
 if(armored){
 p([[bx+2,31],[bx+w-2,31],[bx+w,42],[bx+w-2,46],[bx+2,46],[bx,42]],tint(metal,-34));
 p([[bx+3,32],[bx+w-4,32],[bx+w-2,40],[bx+2,40]],metal);
 r(bx+4,34,6,2,tint(metal,45));r(bx+w-8,35,4,2,tint(metal,-50));r(26,33,3,11,tint(metal,-71));r(27,34,2,8,tint(metal,55));r(bx+1,43,w-2,3,accent);
 }
 if(leather){r(bx+2,33,w-3,4,tint(cloth,20));r(bx+3,38,w-5,7,tint(cloth,-22));r(bx+2,38,4,8,'#76563a');r(bx+w-6,40,3,7,'#806247');r(bx+3,37,12,2,tint(metal,-34))}
 r(bx,46,w,3,'#38272b');r(bx+1,46,w-2,2,'#936641');r(26,45,5,5,'#30262b');r(27,46,3,3,'#e2bd78');r(28,47,1,1,'#fff3bd');
 const armShift=step===0?0:step===1?-1:1;
 for(const [xx,right] of [[bx-8,false],[bx+w+1,true]]){const dy=right?-armShift:armShift;
 r(xx,33+dy,9,17,line);r(xx+1,34+dy,7,12,armored?tint(metal,-22):tint(cloth,-26));r(xx+1,35+dy,3,4,armored?tint(metal,40):tint(cloth,25));
 r(xx+2,44+dy,6,5,tint(skin,-23));r(xx+1,46+dy,8,5,line);r(xx+2,46+dy,6,4,armored?tint(metal,-57):'#654635');r(xx+3,47+dy,2,2,armored?tint(metal,30):'#ad8055');
 }
 r(24,28,8,7,line);r(25,28,6,6,tint(skin,-19));
 p([[15,11],[20,6],[35,6],[41,11],[42,17],[42,27],[37,34],[19,34],[14,28],[13,18]],line);
 p([[16,13],[20,8],[35,8],[40,13],[40,26],[35,32],[20,32],[16,27]],tint(skin,-23));
 p([[17,14],[21,9],[34,9],[39,14],[39,25],[34,30],[20,30],[17,25]],skin);
 r(19,14,5,5,tint(skin,28));r(34,15,4,4,tint(skin,17));r(21,27,14,2,tint(skin,-5));
 if(!back){
 if(side){const ex=left?20:32;r(ex-1,19,5,7,tint(skin,-44));r(ex,19,4,5,'#fff0de');r(ex+(left?0:1),20,2,4,eye);r(ex+1,20,1,1,'#fff');r(left?21:31,28,3,1,tint(skin,-55));}
 else{for(const ex of [20,33]){r(ex-1,18,6,8,tint(skin,-48));r(ex,19,5,6,'#fff0d8');r(ex+1,19,3,5,eye);r(ex+1,20,1,2,tint(eye,-55));r(ex+1,19,1,1,'#fff');r(ex-1,25,3,1,tint(skin,23));}r(26,27,3,1,tint(skin,-47));r(27,28,2,1,tint(skin,-28));}
 }
 const style=Number(a.hair||0)%10,hd=tint(hair,-54),hl=tint(hair,44),hm=tint(hair,-17);
 p([[13,19],[12,11],[16,5],[23,3],[34,3],[40,7],[43,13],[42,19],[38,16],[32,13],[26,12],[20,14],[16,19]],line);
 p([[15,17],[14,11],[18,6],[25,4],[34,5],[40,9],[41,15],[37,13],[31,11],[25,10],[19,13]],hd);
 p([[17,13],[17,9],[23,6],[33,6],[39,10],[35,13],[28,12],[25,15],[21,12]],hair);
 r(21,7,6,3,hl);r(30,7,6,2,tint(hair,23));r(16,12,4,5,hm);r(36,12,4,6,hm);
 if(style===0||style===4||style===7){p([[16,11],[21,10],[25,15],[23,19],[19,17],[16,20]],hair);p([[25,11],[32,9],[37,15],[33,14],[29,18],[25,15]],hm);r(19,11,4,2,hl)}
 if(style===1||style===2||style===9){for(const xx of [12,39]){r(xx,15,5,22,line);r(xx+1,16,3,20,hair);r(xx+1,22,2,12,hl)}if(style===2){r(11,31,7,4,hm);r(38,32,7,5,hm)}}
 if(style===3){r(17,6,21,4,hm);r(19,7,12,3,hl)}
 if(style===4||style===8){p([[19,8],[21,1],[25,7],[31,2],[34,8],[40,5],[38,13],[22,13]],hd);r(21,5,3,5,hl);r(31,5,3,5,hair)}
 if(style===5||style===6){r(38,7,9,10,line);r(39,8,7,8,hair);r(40,10,5,3,hl);if(back){r(21,13,16,22,hair);r(24,18,4,12,hl)}}
 if(style===7){r(19,13,14,7,hair);r(23,16,9,3,hd)}
 if(style===8){p([[13,13],[11,7],[16,8],[19,12]],hm);p([[37,11],[42,4],[44,12],[40,15]],hm)}
 if(back){r(18,17,21,13,hd);r(20,19,17,10,hair);r(21,20,4,9,hl)}
 if(style===9){r(12,20,6,16,hair);r(38,20,6,16,hair);r(13,28,3,5,hl)}
 if(role==='mago'||role==='nigromante'||role==='invocador'){
 p([[15,9],[17,2],[23,0],[36,4],[42,11],[43,16],[37,11],[18,13]],line);
 p([[18,8],[20,3],[24,2],[35,5],[40,11],[34,10],[21,11]],tint(accent,-20));r(23,4,8,2,tint(accent,39));r(27,34,3,4,role==='nigromante'?'#c78def':'#8ee2eb');
 }
 if(role==='caballero'||role==='guardian'){r(16,10,4,8,tint(metal,-40));r(38,10,4,8,tint(metal,-49));r(18,9,20,3,tint(metal,-26));r(23,9,10,1,tint(metal,62));r(bx-6,33,6,5,tint(metal,16));r(bx+w+1,33,6,5,tint(metal,10))}
 if(role==='armero'||role==='merchant'){r(13,10,30,3,'#332529');r(17,7,23,5,role==='armero'?'#624d37':'#795533');r(22,8,12,2,'#ac8860')}
 const wx=left?8:43,wy=side?31:29,weapon=cfg[3];
 if(weapon==='sword'||weapon==='dagger'){const len=weapon==='sword'?29:19;r(wx,wy-len+9,3,len-2,'#2e313c');r(wx+1,wy-len+8,2,len-4,metal);r(wx,wy-len+11,1,len-8,'#f3edcc');
 p([[wx,wy-len+8],[wx+1,wy-len+2],[wx+3,wy-len+8]],'#dde6e9');r(wx-3,wy+3,9,3,'#39343a');r(wx-2,wy+3,7,2,'#c5a46b');r(wx,wy+6,2,7,'#714c31');}
 else if(weapon==='shield'){p([[wx-7,35],[wx+7,35],[wx+8,44],[wx,54],[wx-8,44]],line);p([[wx-5,37],[wx+5,37],[wx+5,44],[wx,51],[wx-5,44]],tint(metal,-28));r(wx-1,39,2,9,'#f2dba8');r(wx-4,43,8,2,'#f2dba8')}
 else if(weapon==='staff'||weapon==='spear'){r(wx,10,4,50,'#29242c');r(wx+1,12,2,46,'#8c5d3f');r(wx+1,19,1,28,'#c19862');
 if(weapon==='spear'){p([[wx-3,19],[wx+2,4],[wx+7,19]],'#c4d1cf');r(wx+1,12,2,5,'#f0fff4');}
 else{r(wx-4,5,12,9,line);p([[wx+1,4],[wx+7,10],[wx+2,17],[wx-3,11]],role==='nigromante'?'#ac77d8':'#63c9d7');r(wx,7,4,3,'#e1f7df');r(wx-2,19,8,2,'#c6a86b');}}
 else if(weapon==='bow'){p([[wx+5,10],[wx+10,17],[wx+11,33],[wx+6,46]],'#392b2d');p([[wx+4,11],[wx+8,19],[wx+8,35],[wx+5,44]],'#a67d45');r(wx+6,13,1,29,'#ddd7ae');r(wx-1,29,12,2,'#8a6950');p([[wx-6,27],[wx-1,30],[wx-6,33]],'#afbbc6')}
 else if(weapon==='axe'){r(wx,15,4,42,'#30262a');r(wx+1,17,2,38,'#9d694a');p([[wx-10,11],[wx+3,10],[wx+8,20],[wx+2,31],[wx-10,28],[wx-6,21]],'#8496a2');r(wx-6,14,3,10,'#d7dcdf')}
 if(armored){r(bx+4,37,2,2,'#f6efdb');r(bx+w-6,39,1,2,'#d6e8e2')}
 return cv;
}
export function npcArt(kind,dir='front',step=0){
 const profiles={
 anciana:{skin:'#e2aa86',hairColor:'#dad1bd',eyes:'#6792aa',cloth:'#a58b9f',hair:6,gender:'mujer'},
 guard:{skin:'#d6a47b',hairColor:'#473731',eyes:'#6299b5',cloth:'#546d92',hair:3,gender:'hombre',build:108},
 merchant:{skin:'#bd895b',hairColor:'#704930',eyes:'#7798a1',cloth:'#9e6d3f',hair:2,gender:'hombre',build:108},
 villager:{skin:'#d1ab84',hairColor:'#62412e',eyes:'#508c82',cloth:'#74906c',hair:1,gender:'mujer'},
 explorer:{skin:'#bba081',hairColor:'#b4a076',eyes:'#4a9b9a',cloth:'#516c60',hair:4,gender:'hombre'}
 };
 return pixelHero(profiles[kind]||profiles.villager,dir,step,looks[kind]?kind:'villager');
}
export const spriteDimensions={width:56,height:72};
