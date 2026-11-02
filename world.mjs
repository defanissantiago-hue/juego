import assert from 'node:assert/strict';
import {GameWorld} from '../src/world.js';
const drawContext={fillRect(){},clearRect(){},drawImage(){},beginPath(){},arc(){},fill(){},stroke(){}};
globalThis.document={createElement(tag){assert.equal(tag,'canvas');return{width:0,height:0,getContext(){return drawContext}}}};
class Vector{set(){return this}lerp(){return this}}
class Color{set(){return this}}
class Object3{constructor(){this.children=[];this.position=new Vector();this.rotation=new Vector();this.scale=new Vector();this.center=new Vector();this.userData={};this.color=new Color()}add(x){this.children.push(x)}remove(x){this.children=this.children.filter(v=>v!==x)}traverse(fn){fn(this);for(const child of this.children)child.traverse(fn)}updateMatrix(){this.matrix={}}}
class Geometry{rotateX(){return this}setAttribute(){return this}computeVertexNormals(){}dispose(){}}
class Material{constructor(props={}){Object.assign(this,props);this.color=new Color()}clone(){return new Material()}dispose(){}}
const T={Group:Object3,HemisphereLight:Object3,DirectionalLight:Object3,Mesh:class extends Object3{constructor(g,m){super();this.geometry=g;this.material=m}},Sprite:class extends Object3{constructor(m){super();this.material=m}},InstancedMesh:class extends Object3{constructor(g,m,n){super();this.geometry=g;this.material=m;this.count=n;this.instanceMatrix={}}setMatrixAt(){}},Object3D:Object3,
 BoxGeometry:Geometry,PlaneGeometry:Geometry,BufferGeometry:Geometry,Float32BufferAttribute:class{},CircleGeometry:Geometry,OctahedronGeometry:Geometry,MeshLambertMaterial:Material,MeshBasicMaterial:Material,SpriteMaterial:Material,CanvasTexture:class{},NearestFilter:1,SRGBColorSpace:2,DoubleSide:3};
const scene=new Object3();const w=new GameWorld(T,scene);w.buildSurface();assert.equal(w.region,'surface');assert.ok(w.enemies.length>=20);assert.ok(w.interactions.some(i=>i.action==='cave'));assert.ok(w.interactions.filter(i=>i.action==='shop').length>=5);assert.ok(w.isBlocked(-19,-10),'No se atraviesan las casas');
for(let floor=1;floor<=6;floor++){w.buildDungeon(floor);assert.equal(w.floor,floor);assert.ok(w.enemies.some(e=>e.type==='gnome'));assert.equal(w.enemies.some(e=>e.type==='signar'),floor===6);if(floor<6)assert.ok(w.interactions.some(i=>i.action==='nextFloor'));}
console.log('✓ Mundo, aldea y seis pisos de Signar superaron pruebas estructurales.');
