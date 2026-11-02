import assert from 'node:assert/strict';
import {CLASSES,ENEMIES,ITEMS,SHOPS,HAIRS,initialAppearance,startingHero} from '../src/data.js';
assert.equal(CLASSES.length,13,'Deben existir 13 clases');
assert.equal(new Set(CLASSES.map(c=>c.id)).size,13,'IDs únicos de clase');
assert.equal(HAIRS.length,10,'10 peinados');
assert.equal(ENEMIES.nightwolf.hp/ENEMIES.wolf.hp,10,'Lobo nocturno 10× HP');
assert.equal(ENEMIES.nightwolf.atk/ENEMIES.wolf.atk,10,'Lobo nocturno 10× ataque');
assert.equal(ENEMIES.crimson.hp/ENEMIES.rabbit.hp,50,'Conejo carmesí 50× HP');
assert.equal(ENEMIES.crimson.atk/ENEMIES.rabbit.atk,50,'Conejo carmesí 50× ataque');
assert.ok(!ITEMS.underwear,'No existe ropa interior vendible');
for(const [k,shop] of Object.entries(SHOPS))assert.ok(shop.items.every(id=>ITEMS[id]),'Tienda inválida: '+k);
for(const c of CLASSES){const p=startingHero(initialAppearance(),c.id);assert.equal(p.classId,c.id);assert.ok(p.inventory.potion>=1);assert.equal(p.hp,c.hp)}
console.log('✓ Pruebas de datos iniciales superadas.');
