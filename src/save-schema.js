// Restauración conservadora de partidas. Evita que JSON parcial, NaN o tipos
// inválidos causen pantalla negra, posición fuera de mapa o HUD roto.
import { CLASSES, ITEMS, HAIRS, startingHero, initialAppearance } from './data.js'

const record = v => v !== null && typeof v === 'object' && !Array.isArray(v)
const finite = (v, fallback, min, max) => {
  const n = typeof v === 'number' || typeof v === 'string' && v.trim() !== '' ? Number(v) : NaN
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback
}
const integer = (v, fallback, min, max) => Math.trunc(finite(v, fallback, min, max))
const validColor = (v, fallback) => typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v) ? v : fallback

export function normalizeSavedHero(raw) {
  if (!record(raw) || !record(raw.appearance)) return null
  if (!CLASSES.some(c => c.id === raw.classId)) return null
  const fallback = startingHero(initialAppearance(), raw.classId)
  const originalAppearance = fallback.appearance
  const source = raw.appearance
  const appearance = {
    ...originalAppearance,
    name: typeof source.name === 'string' && source.name.trim()
      ? source.name.trim().slice(0, 18) : originalAppearance.name,
    gender: ['hombre', 'mujer'].includes(source.gender) ? source.gender : originalAppearance.gender,
    hair: integer(source.hair, 0, 0, HAIRS.length - 1),
    skin: validColor(source.skin, originalAppearance.skin),
    eyes: validColor(source.eyes, originalAppearance.eyes),
    hairColor: validColor(source.hairColor, originalAppearance.hairColor),
    cloth: validColor(source.cloth, originalAppearance.cloth),
    height: finite(source.height, 100, 85, 115),
    build: finite(source.build, 100, 85, 115),
    bust: finite(source.bust, 100, 85, 115),
    limbs: finite(source.limbs, 100, 85, 115),
  }
  const inventory = record(raw.inventory) ? {} : {...fallback.inventory}
  if (record(raw.inventory)) {
    for (const [id, qty] of Object.entries(raw.inventory)) {
      if (Object.hasOwn(ITEMS, id)) {
        const valid = integer(qty, 0, 0, 9999)
        if (valid > 0) inventory[id] = valid
      }
    }
  }
  const equipment = record(raw.equipment) ? {} : {...fallback.equipment}
  if (record(raw.equipment)) {
    for (const [slot, id] of Object.entries(raw.equipment)) {
      if (['weapon', 'chest', 'offhand', 'head', 'legs', 'boots', 'ring', 'amulet'].includes(slot) &&
          typeof id === 'string' && Object.hasOwn(ITEMS, id)) equipment[slot] = id
    }
  }
  const quests = {
    elder: raw.quests?.elder === true,
    slimes: integer(raw.quests?.slimes, 0, 0, 3),
    herbs: integer(raw.quests?.herbs, 0, 0, 2),
    signar: raw.quests?.signar === true,
  }
  const kills = {}
  if (record(raw.kills)) {
    for (const [id, count] of Object.entries(raw.kills)) {
      if (/^[a-zA-Z0-9_-]{1,48}$/.test(id)) kills[id] = integer(count, 0, 0, 1_000_000)
    }
  }
  const discovered = Array.isArray(raw.discovered)
    ? raw.discovered.filter(s => typeof s === 'string' && s.length <= 70).slice(0, 150)
    : fallback.discovered
  return {
    ...fallback, appearance, classId: raw.classId,
    inventory, equipment, quests, kills, discovered,
    level: integer(raw.level, 1, 1, 999),
    xp: integer(raw.xp, 0, 0, 10_000_000),
    coins: integer(raw.coins, 0, 0, 1_000_000_000),
    hp: finite(raw.hp, fallback.hp, 0, 1_000_000),
    mp: finite(raw.mp, fallback.mp, 0, 1_000_000),
    stamina: finite(raw.stamina, 100, 0, 100),
    x: finite(raw.x, fallback.x, -500, 500),
    z: finite(raw.z, fallback.z, -500, 500),
    region: raw.region === 'dungeon' ? 'dungeon' : 'surface',
    floor: integer(raw.floor, 1, 1, 6),
    dayTime: finite(raw.dayTime, fallback.dayTime, 0, 1439.999),
    days: integer(raw.days, 1, 1, 100_000),
    lastSave: finite(raw.lastSave, 0, 0, Number.MAX_SAFE_INTEGER),
  }
}
