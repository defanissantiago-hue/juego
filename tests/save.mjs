import assert from 'node:assert/strict'
import {normalizeSavedHero} from '../src/save-schema.js'
import {initialAppearance,startingHero,CLASSES} from '../src/data.js'

assert.equal(normalizeSavedHero(null),null)
assert.equal(normalizeSavedHero([]),null)
assert.equal(normalizeSavedHero({classId:'invalid',appearance:{name:'Prueba'}}),null)
assert.equal(normalizeSavedHero({classId:'caballero'}),null)

for(const c of CLASSES){
  const base=startingHero(initialAppearance(),c.id)
  const restored=normalizeSavedHero(base)
  assert.equal(restored.classId,c.id)
  assert.deepEqual(restored.inventory,base.inventory)
  assert.deepEqual(restored.quests,base.quests)
  assert.equal(restored.x,base.x)
  assert.equal(restored.z,base.z)
}
const base=startingHero({...initialAppearance(),name:'Aventurera'},'mago')
base.level=9;base.x=8;base.z=-7;base.coins=2345;base.inventory={potion:3}
base.quests={elder:true,slimes:3,herbs:2,signar:false}
const restored=normalizeSavedHero(base)
assert.equal(restored.level,9)
assert.equal(restored.coins,2345)
assert.deepEqual(restored.inventory,{potion:3})
assert.deepEqual(restored.quests,base.quests)
assert.equal(restored.x,8)
assert.equal(restored.z,-7)
assert.equal(restored.appearance.name,'Aventurera')

// Save corrupto que antes superaba getSave() pero metía NaN al mundo.
const corrupt=normalizeSavedHero({
  classId:'caballero',appearance:{name:'',hair:'invalido',skin:'javascript:alert(1)',height:'NaN'},
  x:'NaN',z:null,level:'alto',xp:Infinity,coins:-100,mp:'no',
  inventory:{potion:'2',invalid:999999},equipment:{weapon:'unknown'},
  quests:{elder:true,slimes:'infinito'},kills:{wolf:'3',bad:-4},
  discovered:'no-array',region:'portal',floor:999
})
assert(corrupt)
assert(Number.isFinite(corrupt.x) && Number.isFinite(corrupt.z),'Coordenadas finitas')
assert.equal(corrupt.x,-9)
assert.equal(corrupt.z,5)
assert.equal(corrupt.appearance.name,'Aventurero')
assert.equal(corrupt.appearance.skin,'#d7a076')
assert.equal(corrupt.appearance.height,100)
assert.equal(corrupt.level,1)
assert.equal(corrupt.coins,0)
assert.deepEqual(corrupt.inventory,{potion:2})
assert.deepEqual(corrupt.equipment,{})
assert.equal(corrupt.quests.elder,true)
assert.equal(corrupt.quests.slimes,0)
assert.equal(corrupt.region,'surface')
assert.equal(corrupt.floor,6)
assert.equal(corrupt.kills.wolf,3)
assert.equal(corrupt.kills.bad,0)

console.log('✓ Partidas: 13 clases, progreso legítimo, JSON parcial, NaN y datos inválidos.')
