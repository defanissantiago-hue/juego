import {textureTile,treeArt,bushArt,plantArt,rockArt,npcArt,creatureArt} from './art.js';
import {ENEMIES} from './data.js';
const seedRand=(seed)=>{let n=seed>>>0;return()=>((n=(n*1664525+1013904223)>>>0)/4294967296)};
const COLORS={grass:'#558d55',forest:'#355f47',path:'#ad9e70',water:'#348b9d',dungeon:'#484a4a'};
export class GameWorld {
 constructor(T,scene){this.T=T;this.scene=scene;this.root=new T.Group();scene.add(this.root);this.cache={};this.tileMaterials={};this.obstacles=[];this.interactions=[];this.enemies=[];this.decorations=[];this.region='surface';this.floor=1;this.width=68;this.depth=56;this.water=[];this.torch=[];this.groundGeometry=new T.PlaneGeometry(1.012,1.012);this.groundGeometry.rotateX(-Math.PI/2);this.rng=seedRand(31324);this.light=new T.HemisphereLight('#e9ecdd','#425049',2.0);scene.add(this.light);this.sun=new T.DirectionalLight('#ffdfae',2.4);this.sun.position.set(-10,24,16);scene.add(this.sun);}
 reset(){while(this.root.children.length){const object=this.root.children[0];this.root.remove(object);object.traverse(o=>{if(o.geometry&&o.userData.uniqueGeometry)o.geometry.dispose();if(o.material&&o.userData.uniqueMaterial)o.material.dispose()})}this.obstacles=[];this.interactions=[];this.enemies=[];this.decorations=[];this.water=[];this.torch=[]}
 material(key,alpha=false){if(this.cache[key])return this.cache[key];const c={wood:'#846b4a',plaster:'#d1c3a2',plaster2:'#b3c7b5',roof:'#b46a3b',roof2:'#ce9b49',redroof:'#a34c3d',dark:'#403b32',frame:'#463c30',window:'#d7e6a3',stone:'#5e6660',stone2:'#838681',woodlight:'#ac855c',dirt:'#675441',torch:'#ffe6a2',cavewall:'#414a4a',stairs:'#a09376'};return this.cache[key]=new this.T.MeshLambertMaterial({color:c[key]||key,transparent:alpha})}
 pixelMaterial(key,make){if(this.cache['sprite:'+key])return this.cache['sprite:'+key];const tex=new this.T.CanvasTexture(make());tex.magFilter=this.T.NearestFilter;tex.minFilter=this.T.NearestFilter;tex.colorSpace=this.T.SRGBColorSpace;const mat=new this.T.SpriteMaterial({map:tex,transparent:true,alphaTest:.1,depthWrite:false});this.cache['sprite:'+key]=mat;return mat}
 sprite(kind,x,z,width,height,fn){const mat=this.pixelMaterial(kind,fn);const s=new this.T.Sprite(mat);s.position.set(x,.08,z);s.scale.set(width,height,1);s.center.set(.5,0);s.renderOrder=3;this.root.add(s);return s}
 cube(x,y,z,w,h,d,mat,parent=this.root){const g=new this.T.BoxGeometry(w,h,d),mesh=new this.T.Mesh(g,this.material(mat));mesh.position.set(x,y,z);mesh.userData.uniqueGeometry=true;parent.add(mesh);return mesh}
 buildGround(kind='surface'){
  const T=this.T,rand=seedRand(kind==='surface'?601:201+this.floor),w=kind==='surface'?68:38,d=kind==='surface'?56:34;this.width=w;this.depth=d;
  const names=['grass','grass2','darkgrass','forest','path','cobble','water','dirt','dungeon','bridge'];const groups={};for(const n of names)groups[n]=[];
  for(let iz=0;iz<d;iz++)for(let ix=0;ix<w;ix++){
   const x=ix-w/2+.5,z=iz-d/2+.5;
   let type='grass';
   if(kind==='surface'){
    const isForest=x>10;type=isForest?'forest':rand()<.28?'grass2':'grass';
    const pathMain=(Math.abs(z-3)<2&&x>-22&&x<30)||(Math.abs(x+6)<2&&z>-15&&z<17)||(Math.abs(x-18)<1.8&&z>-13&&z<17);
    const pathVillage=(x<8&&x>-24&&Math.abs(z+8)<1.4);
    if(pathMain||pathVillage)type=rand()>.24?'path':'cobble';
    if(x< -15&&x>-27&&z>13&&z<27)type='water';
    if(x<-13&&x>-29&&z>10&&z<12)type='bridge';
   }else{
    type=rand()>.12?'dungeon':'cobble';if(ix===0||iz===0||ix===w-1||iz===d-1)type='dungeon';
    if((Math.abs(x+13)<1.2&&z<13)||(Math.abs(z-10)<1.3&&x>-14))type='path';
   }
   groups[type].push([x,z,Math.floor(rand()*4)]);
  }
  const geo=this.groundGeometry;const dummy=new T.Object3D();
  Object.entries(groups).forEach(([type,items])=>{if(!items.length)return;for(let variant=0;variant<4;variant++){const subset=items.filter(r=>r[2]===variant);if(!subset.length)continue;const matKey=type+':'+variant;let material=this.tileMaterials[matKey];if(!material){const texture=new T.CanvasTexture(textureTile(type,variant+1));texture.magFilter=T.NearestFilter;texture.minFilter=T.NearestFilter;texture.colorSpace=T.SRGBColorSpace;material=new T.MeshLambertMaterial({map:texture});this.tileMaterials[matKey]=material}const mesh=new T.InstancedMesh(geo,material,subset.length);subset.forEach(([x,z],i)=>{dummy.position.set(x,.005,z);dummy.rotation.set(0,0,0);dummy.scale.set(1,1,1);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix)});mesh.instanceMatrix.needsUpdate=true;this.root.add(mesh)}});
  this.tileTypeAt=kind==='surface'?((x,z)=>{if(x < -15&&x>-27&&z>13)return 'water';if(x>10)return 'forest';return 'grass'}):(()=> 'dungeon');
 }
 addObstacle(x,z,r){this.obstacles.push({x,z,r})}
 addInteract(name,x,z,action,extra={}){this.interactions.push({name,x,z,action,...extra})}
 house(x,z,roof,shop,title,w=4.1,d=3.9){const group=new this.T.Group();group.position.set(x,0,z);this.root.add(group);this.cube(0,1.1,0,w,2.15,d,'plaster',group);this.cube(0,1.25,d/2+.035,w,.12,.12,'wood',group);for(let i=-1;i<=1;i+=2)this.cube(i*(w/2-.2),1.3,d/2+.08,.18,1.7,.18,'wood',group);
  const rr=roof==='red'?'redroof':roof==='gold'?'roof2':'roof';
  const geometry=new this.T.BufferGeometry();const h=3.5,wall=2.1,x0=w/2+.3,z0=d/2+.25;
  const verts=[
    -x0,wall,-z0, 0,h,-z0, -x0,wall,z0,
    0,h,-z0, 0,h,z0, -x0,wall,z0,
    0,h,-z0, x0,wall,-z0, x0,wall,z0,
    0,h,-z0, x0,wall,z0, 0,h,z0
  ];geometry.setAttribute('position',new this.T.Float32BufferAttribute(verts,3));geometry.computeVertexNormals();const roofMesh=new this.T.Mesh(geometry,new this.T.MeshLambertMaterial({color:rr==='redroof'?'#b85846':rr==='roof2'?'#d4a45d':'#ae7642',side:this.T.DoubleSide}));roofMesh.userData.uniqueGeometry=true;group.add(roofMesh);
  this.cube(0,.8,d/2+.16,.87,1.55,.14,'wood',group);this.cube(.25,.88,d/2+.25,.1,.11,.1,'torch',group);
  this.cube(-w/2+.76,1.4,d/2+.15,.74,.68,.12,'frame',group);this.cube(-w/2+.76,1.4,d/2+.25,.49,.48,.1,'window',group);this.cube(w/2-.76,1.4,d/2+.15,.74,.68,.12,'frame',group);this.cube(w/2-.76,1.4,d/2+.25,.49,.48,.1,'window',group);
  this.cube(w/2-.7,3.38,-.8,.55,1.3,.65,'stone',group);
  this.addObstacle(x,z,Math.min(w,d)*.48+0.5);
  const ix=x,iz=z+d/2+1.1;this.sprite('signpost',ix,iz+.25,.5,.8,()=>{const el=document.createElement('canvas');el.width=14;el.height=20;const c=el.getContext('2d');c.fillStyle='#654929';c.fillRect(6,5,3,15);c.fillStyle='#b28a51';c.fillRect(1,3,12,8);c.fillStyle='#eac789';c.fillRect(2,4,10,5);return el});
  this.addInteract(title,ix,iz,shop?'shop':'house',{shop})
 }
 addTree(x,z,seed,pine=false,autumn=false){this.sprite('tree'+(seed%6)+(pine?'p':'')+(autumn?'a':''),x,z,2.7,3.5,()=>treeArt(seed,pine,autumn));this.addObstacle(x,z,.67)}
 buildSurface(){this.reset();this.region='surface';this.floor=1;this.floorTiles='surface';this.buildGround('surface');const rand=seedRand(58334);
  this.house(-19,-10,'gold','herreria','Herrería de Brann');this.house(-9,-10,'red','armeria','Armería del Alba');this.house(1,-10,'gold','pociones','Casa de Pociones');this.house(-19,7,'red','herboristeria','Herboristería');this.house(-5,14,'gold','magia','Reliquias Arcanas');this.house(5,7,'red',null,'Posada del Ciervo');this.house(-18,-20,'gold',null,'Casa de los Pescadores');
  this.sprite('anciana',-3,1,1.25,1.72,()=>npcArt('anciana'));this.addInteract('Anciana Elara',-3,1,'elder');this.sprite('guard',8,2,1.25,1.72,()=>npcArt('guard'));this.addInteract('Guardia del puente',8,2,'guard');
  for(let i=0;i<155;i++){let x=-33+rand()*66,z=-27+rand()*54;if(x < -28||x>29)continue;let inVillage=x<10;let path=(Math.abs(z-3)<3&&x>-22)||(Math.abs(x+6)<3&&z>-15&&z<18)||(x<8&&x>-24&&Math.abs(z+8)<3)||(Math.abs(x-18)<3&&z<18);let water=(x<-14&&x>-28&&z>9);let houseBox=this.obstacles.some(o=>Math.hypot(o.x-x,o.z-z)<4.1);if(path||water||houseBox||Math.hypot(x+9,z-5)<4)continue;if(inVillage&&rand()>.30)continue;this.addTree(x,z,i,rand()>.67,rand()>.95)}
  for(let i=0;i<95;i++){let x=-32+rand()*64,z=-26+rand()*52;if(this.obstacles.some(o=>Math.hypot(o.x-x,o.z-z)<1.2))continue;if(x<-28&&z>11)continue;this.sprite('bush'+(i%6),x,z,.7+rand()*.4,.5+rand()*.3,()=>bushArt(i%6+1))}
  for(let i=0;i<145;i++){let x=-32+rand()*64,z=-25+rand()*50;if(x<-15&&x>-27&&z>13)continue;this.sprite('plant'+(i%7),x,z,.23+rand()*.16,.28+rand()*.17,()=>plantArt(i%7+1,i%8===0?'grass':'flower'))}
  for(let i=0;i<62;i++){let x=-32+rand()*64,z=-25+rand()*50;if(x<-15&&x>-27&&z>13)continue;this.sprite('rock'+(i%6),x,z,.52+rand()*.48,.5+rand()*.34,()=>rockArt(i%6));if(rand()>.82)this.addObstacle(x,z,.35)}
  const caveX=25,caveZ=-14;this.cube(caveX,.5,caveZ,4.2,1,3,'stone');this.cube(caveX,1.25,caveZ-1.5,3.5,2,.8,'stone2');this.cube(caveX,1.2,caveZ+1.55,2.6,2,.6,'cavewall');this.sprite('cave',caveX,caveZ+2,3.1,2.6,()=>{const el=document.createElement('canvas');el.width=32;el.height=28;const c=el.getContext('2d');c.fillStyle='#889087';c.fillRect(2,5,28,22);c.fillStyle='#545a57';c.fillRect(6,3,20,22);c.fillStyle='#1c2529';c.fillRect(8,10,16,18);c.fillStyle='#324047';c.fillRect(11,9,10,4);c.fillStyle='#e1d6a9';c.fillRect(13,23,6,2);return el});this.addInteract('Entrada oculta · Laberinto de Signar',caveX,caveZ+4.1,'cave');
  this.addInteract('Hierbas del sendero',-11,18,'herb');this.sprite('plantSpecial',-11,18,.8,1,()=>plantArt(44));this.addInteract('Veta de cobre',17,14,'ore');this.sprite('oreRock',17,14,1.3,1.1,()=>rockArt(35,true));
  this.spawnSurface();return {x:-9,z:5};
 }
 spawnSurface(){const rand=seedRand(64325);for(let i=0;i<22;i++){const x=13+rand()*16,z=-22+rand()*44;const t=i<10?'slime':i<15?'rabbit':i<20?'wolf':'goblin';this.spawnEnemy(t,x,z)} }
 spawnEnemy(type,x,z){const def=ENEMIES[type];const mesh=this.sprite('enemy:'+type,x,z,type==='signar'?3.7:type==='wolf'||type==='nightwolf'?1.5:1.28,type==='signar'?3.7:1.35,()=>creatureArt(type));mesh.material=mesh.material.clone();mesh.userData.uniqueMaterial=true;const shadow=new this.T.Mesh(new this.T.CircleGeometry(type==='signar'?1.3:.48,12),new this.T.MeshBasicMaterial({color:'#071e24',transparent:true,opacity:.23,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.set(x,.025,z);this.root.add(shadow);const e={type,name:def.name,mesh,shadow,x,z,homeX:x,homeZ:z,hp:def.hp,maxHp:def.hp,atk:def.atk,def:def.def,speed:def.speed,xp:def.xp,coins:def.coins,reach:def.reach,hitCooldown:0,wander:Math.random()*4,phase:1};this.enemies.push(e);return e}
 buildDungeon(floor){this.reset();this.region='dungeon';this.floor=floor;this.floorTiles='dungeon';this.buildGround('dungeon');const rand=seedRand(123+floor*15);
  for(let x=-19;x<=19;x+=2){this.cube(x,1.1,-17.5,2.1,2.2,1.5,'stone');this.cube(x,1.1,16.5,2.1,2.2,1.5,'stone')}
  for(let z=-16;z<=16;z+=2){this.cube(-19,1,z,1.3,2,2,'stone');this.cube(19,1,z,1.3,2,2,'stone')}
  for(let i=0;i<18+floor*2;i++){let x=-14+rand()*29,z=-13+rand()*25;if(Math.hypot(x+14,z+10)<4||Math.hypot(x-12,z-10)<4||Math.abs(z+10)<2||Math.abs(z-10)<1.8)continue;const h=.8+rand()*1.6;this.cube(x,h/2,z,.6+rand()*1.5,h,.5+rand()*1.4,rand()>.4?'stone':'stone2');this.addObstacle(x,z,.7)}
  for(let i=0;i<19;i++){let x=-16+rand()*32,z=-14+rand()*28;this.sprite('ore'+(i%4),x,z,.8,1,()=>rockArt(i%4,true));if(i%3===0)this.addInteract('Veta mineral',x,z,'ore')}
  this.sprite('exitSprite',-14,-13,1.2,1.35,()=>rockArt(1));this.addInteract('Escalera de regreso',-14,-12,'exitDungeon');
  if(floor<6){this.cube(13,.15,11,3.3,.3,3.3,'stairs');this.sprite('stairsSprite',13,11,1.2,1.2,()=>rockArt(24));this.addInteract('Bajar al piso '+(floor+1),13,11,'nextFloor')}
  else{this.cube(13,.2,11,4.8,.4,4.8,'redroof');this.spawnEnemy('signar',11,7)}
  for(let i=0;i<(floor===6?5:3+floor*2);i++){let x=-7+rand()*18,z=-10+rand()*15;if(floor===6&&Math.hypot(x-11,z-7)<4)continue;this.spawnEnemy('gnome',x,z)}
  for(let i=0;i<5;i++){let x=-16+i*8;const material=new this.T.MeshBasicMaterial({color:'#ffb75d'});const bulb=new this.T.Mesh(new this.T.OctahedronGeometry(.16,0),material);bulb.position.set(x,1.1,-15);this.root.add(bulb);this.torch.push(bulb)}
  return {x:-13,z:-10};
 }
 isBlocked(x,z,r=.35){const halfW=this.width/2-1,halfD=this.depth/2-1;if(x < -halfW+r||x>halfW-r||z < -halfD+r||z>halfD-r)return true;if(this.region==='surface'&&x<-15&&x>-27&&z>13&&!(z<14&&x<-14&&x>-29))return true;return this.obstacles.some(o=>Math.hypot(x-o.x,z-o.z)<r+o.r)}
 nearInteraction(x,z,range=2.8){let nearest=null,dist=range;for(const a of this.interactions){const d=Math.hypot(a.x-x,a.z-z);if(d<dist){dist=d;nearest=a}}return nearest}
 setLighting(hour){const night=hour<6||hour>=19,dawn=hour>=6&&hour<8,sunset=hour>=17&&hour<19;const val=night ? 0.23 : ((dawn||sunset) ? 0.7 : 1);this.light.intensity=1.0+val*.85;this.sun.intensity=night ? 0.1 : ((dawn||sunset) ? 1.2 : 2.3);this.sun.color.set(night?'#6c8fbd':dawn||sunset?'#ffb176':'#fff2d5');}
 dispose(){this.reset();this.scene.remove(this.root);this.scene.remove(this.sun);this.scene.remove(this.light)}
}
