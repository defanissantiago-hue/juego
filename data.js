export const CLASSES = [
 {id:'caballero',name:'Caballero',icon:'⚔',desc:'Espada y escudo: defensa, bloqueos y golpes precisos.',hp:125,mp:40,atk:14,def:8,skill:'Golpe de escudo',type:'physical'},
 {id:'clerigo',name:'Clérigo',icon:'✝',desc:'Magia sagrada: protección y daño contra criaturas oscuras.',hp:105,mp:105,atk:11,def:5,skill:'Luz sagrada',type:'heal'},
 {id:'sanadora',name:'Sanadora',icon:'❀',desc:'Recuperación y apoyo, con defensa mágica de emergencia.',hp:96,mp:125,atk:9,def:3,skill:'Curación',type:'heal'},
 {id:'guardian',name:'Guardián',icon:'⬟',desc:'Máxima resistencia y protección de su posición.',hp:160,mp:35,atk:10,def:12,skill:'Muro impenetrable',type:'shield'},
 {id:'mago',name:'Mago',icon:'✦',desc:'Proyectiles y hechizos de gran poder elemental.',hp:88,mp:165,atk:16,def:2,skill:'Explosión arcana',type:'aoe'},
 {id:'gladiador',name:'Gladiador',icon:'⚒',desc:'Combos de daño físico y combate cuerpo a cuerpo.',hp:125,mp:45,atk:17,def:5,skill:'Torbellino',type:'aoe'},
 {id:'ladron',name:'Ladrón',icon:'◈',desc:'Velocidad, evasión, precisión y botín.',hp:100,mp:60,atk:13,def:4,skill:'Paso fugaz',type:'dash'},
 {id:'asesino',name:'Asesino',icon:'✣',desc:'Ataques críticos y golpes devastadores desde posiciones ventajosas.',hp:90,mp:70,atk:20,def:3,skill:'Sombra letal',type:'burst'},
 {id:'berserker',name:'Berserker',icon:'♜',desc:'Poder feroz que crece con el riesgo.',hp:140,mp:40,atk:20,def:3,skill:'Furia',type:'rage'},
 {id:'armero',name:'Armero',icon:'➶',desc:'Proyectiles, precisión y artilugios de combate.',hp:105,mp:75,atk:15,def:4,skill:'Disparo perforante',type:'ranged'},
 {id:'invocador',name:'Invocador',icon:'♧',desc:'Aliados mágicos que luchan junto al protagonista.',hp:94,mp:145,atk:11,def:3,skill:'Guardián espectral',type:'summon'},
 {id:'nigromante',name:'Nigromante',icon:'☽',desc:'Energía oscura, drenaje vital y sirvientes no muertos.',hp:98,mp:145,atk:15,def:3,skill:'Drenar esencia',type:'drain'},
 {id:'indefinido',name:'Indefinido',icon:'?',desc:'Adaptable: sus estadísticas dependen de su equipamiento.',hp:110,mp:80,atk:12,def:5,skill:'Resonancia',type:'burst'}
];
export const HAIRS=['Corto clásico','Largo lacio','Largo ondulado','Rapado','Despeinado','Recogido','Trenzado','Con flequillo','Puntiagudo','Media melena'];
export const ITEMS = {
 potion:{id:'potion',name:'Poción de salud',icon:'🧪',kind:'consumable',price:35,desc:'Restaura 55 puntos de salud.'},
 ether:{id:'ether',name:'Esencia de maná',icon:'🔹',kind:'consumable',price:32,desc:'Restaura 55 puntos de maná.'},
 herb:{id:'herb',name:'Hierba plateada',icon:'🌿',kind:'material',price:8,desc:'Una planta curativa del bosque.'},
 ore:{id:'ore',name:'Mineral en bruto',icon:'🪨',kind:'material',price:16,desc:'Extraído de vetas rocosas.'},
 slimeGel:{id:'slimeGel',name:'Gel de slime',icon:'🟢',kind:'material',price:7,desc:'Material flexible de un slime.'},
 wolfFang:{id:'wolfFang',name:'Colmillo de lobo',icon:'🦷',kind:'material',price:12,desc:'Trofeo de cacería.'},
 carmine:{id:'carmine',name:'Esencia carmesí',icon:'🔴',kind:'material',price:400,desc:'Poder de una criatura excepcional.'},
 sword:{id:'sword',name:'Espada de cobre',icon:'⚔️',kind:'weapon',slot:'weapon',atk:4,def:0,price:90,desc:'Hoja sencilla de entrenamiento.'},
 staff:{id:'staff',name:'Bastón de sauce',icon:'🪄',kind:'weapon',slot:'weapon',atk:3,mp:20,price:90,desc:'Conduce energía espiritual.'},
 bow:{id:'bow',name:'Arco de fresno',icon:'🏹',kind:'weapon',slot:'weapon',atk:5,def:0,price:110,desc:'Un arma ligera de distancia.'},
 dagger:{id:'dagger',name:'Dagas melladas',icon:'🗡️',kind:'weapon',slot:'weapon',atk:5,def:0,price:80,desc:'Dos hojas veloces.'},
 shield:{id:'shield',name:'Escudo de madera',icon:'🛡️',kind:'shield',slot:'offhand',atk:0,def:5,price:100,desc:'Un escudo de roble resistente.'},
 tunic:{id:'tunic',name:'Túnica viajera',icon:'🥋',kind:'armor',slot:'chest',atk:0,def:2,price:55,desc:'Ropa resistente. Se puede vender.'},
 leather:{id:'leather',name:'Armadura de cuero',icon:'🦺',kind:'armor',slot:'chest',atk:0,def:6,price:115,desc:'Cuero endurecido para exploradores.'},
 helmet:{id:'helmet',name:'Casco de explorador',icon:'🪖',kind:'armor',slot:'head',atk:0,def:3,price:75,desc:'Protege ante golpes ligeros.'},
 boots:{id:'boots',name:'Botas de viaje',icon:'🥾',kind:'armor',slot:'feet',atk:0,def:2,price:60,desc:'Preparadas para caminos pedregosos.'},
 signar:{id:'signar',name:'Sello de Signar',icon:'💠',kind:'quest',price:0,desc:'Prueba de la derrota del señor de la mina. No puede venderse.'}
};
export const SHOPS={
 armeria:{title:'Armería del Alba',items:['sword','bow','dagger','shield','leather','helmet','boots']},
 herreria:{title:'Herrería de Brann',items:['sword','shield','helmet','boots']},
 herboristeria:{title:'Herboristería',items:['herb','potion']},
 pociones:{title:'Casa de Pociones',items:['potion','ether']},
 magia:{title:'Reliquias Arcanas',items:['staff','ether','tunic']}
};
export const ENEMIES = {
 slime:{name:'Slime',hp:38,atk:5,def:0,speed:1.0,xp:16,coins:8,reach:1.0},
 wolf:{name:'Lobo gris',hp:68,atk:10,def:1,speed:2.1,xp:28,coins:13,reach:1.0},
 rabbit:{name:'Conejo salvaje',hp:16,atk:2,def:0,speed:2.0,xp:8,coins:4,reach:.85},
 goblin:{name:'Goblin',hp:88,atk:11,def:3,speed:1.25,xp:40,coins:22,reach:1.2},
 nightwolf:{name:'Lobo de ojos rojos',hp:680,atk:100,def:10,speed:2.5,xp:280,coins:180,reach:1.2},
 crimson:{name:'Conejo carmesí',hp:800,atk:100,def:25,speed:3.0,xp:800,coins:850,reach:1.1},
 gnome:{name:'Gnomo minero',hp:72,atk:11,def:2,speed:1.05,xp:22,coins:16,reach:1.0},
 signar:{name:'SIGNAR · Señor de la Mina',hp:620,atk:23,def:8,speed:.95,xp:1200,coins:1000,reach:2.1}
};
export const initialAppearance=()=>({name:'Aventurero',gender:'hombre',hair:0,skin:'#d7a076',eyes:'#448cbf',hairColor:'#9c693e',cloth:'#445e85',height:100,build:100,bust:100,limbs:100});
export function startingHero(appearance,classId){
 const cls=CLASSES.find(x=>x.id===classId)||CLASSES[0];
 const weapon=['mago','clerigo','sanadora','invocador','nigromante'].includes(classId)?'staff':['armero'].includes(classId)?'bow':['ladron','asesino'].includes(classId)?'dagger':'sword';
 return {appearance:{...appearance},classId:cls.id,level:1,xp:0,coins:85,hp:cls.hp,mp:cls.mp,stamina:100,inventory:{potion:2,tunic:1,[weapon]:1,...(['caballero','guardian'].includes(classId)?{shield:1}:{})},equipment:{weapon,chest:'tunic',...(['caballero','guardian'].includes(classId)?{offhand:'shield'}:{})},quests:{elder:false,slimes:0,herbs:0,signar:false},kills:{},x:-9,z:5,region:'surface',floor:1,dayTime:9*60,days:1,discovered:['Aldea del Alba'],lastSave:Date.now()};
}
