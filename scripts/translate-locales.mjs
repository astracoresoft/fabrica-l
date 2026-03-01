/**
 * Автоперевод по ключам: локали (ua → en) + все данные из JSON (team, contacts, metrics, locations, levels).
 * Запуск: node scripts/translate-locales.mjs
 * Лимит MyMemory: ~1000 слів/день без ключа.
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DATA_DIR = join(ROOT, 'src', 'data')
const LOCALES_DIR = join(ROOT, 'src', 'locales')

const DELAY_MS = 250
const MAX_CHARS = 450

async function translateOne(text) {
	if (!text || typeof text !== 'string') return text
	const t = text.trim()
	if (!t) return text
	if (t.length <= MAX_CHARS) {
		const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(t)}&langpair=uk|en`
		const res = await fetch(url)
		if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`)
		const data = await res.json()
		if (!data.responseData?.translatedText) throw new Error(data.responseDetails || 'No translation')
		let out = data.responseData.translatedText
		if (out.includes('QUERY LENGTH LIMIT')) throw new Error('Query too long')
		return out.replace(/<[^>]+>/g, '').trim()
	}
	const parts = t.split(/\n\n+/)
	const translated = []
	for (const p of parts) {
		if (p.length <= MAX_CHARS) {
			translated.push(await translateOne(p))
		} else {
			const chunks = p.match(new RegExp(`(.{1,${MAX_CHARS}})(?=\\s|$)|.{1,${MAX_CHARS}}`, 'g')) || [p]
			for (const ch of chunks) {
				translated.push(await translateOne(ch))
				await new Promise((r) => setTimeout(r, DELAY_MS))
			}
		}
		await new Promise((r) => setTimeout(r, DELAY_MS))
	}
	return translated.join('\n\n').replace(/<[^>]+>/g, '').trim()
}

async function delay() {
	await new Promise((r) => setTimeout(r, DELAY_MS))
}

// --- Locales: ua.json → en.json ---
function flatten(obj, prefix = '') {
	const out = {}
	for (const [k, v] of Object.entries(obj)) {
		const key = prefix ? `${prefix}.${k}` : k
		if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
			Object.assign(out, flatten(v, key))
		} else if (typeof v === 'string') {
			out[key] = v
		}
	}
	return out
}

function unflatten(flat) {
	const out = {}
	for (const [key, value] of Object.entries(flat)) {
		const parts = key.split('.')
		let cur = out
		for (let i = 0; i < parts.length - 1; i++) {
			const p = parts[i]
			if (!(p in cur)) cur[p] = {}
			cur = cur[p]
		}
		cur[parts[parts.length - 1]] = value
	}
	return out
}

async function translateLocales() {
	console.log('\n=== Locales (ua → en) ===')
	const ua = JSON.parse(readFileSync(join(LOCALES_DIR, 'ua.json'), 'utf8'))
	const flatUa = flatten(ua)
	const entries = Object.entries(flatUa)
	for (let i = 0; i < entries.length; i++) {
		const [key, value] = entries[i]
		process.stdout.write(`  ${i + 1}/${entries.length}: ${key.slice(0, 35)}...\r`)
		flatUa[key] = await translateOne(value)
		await delay()
	}
	console.log('')
	const en = unflatten(flatUa)
	writeFileSync(join(LOCALES_DIR, 'en.json'), JSON.stringify(en, null, 2) + '\n', 'utf8')
	console.log('  Written en.json')
}

// --- Data: team, contacts, metrics, locations, levels ---
async function translateTeam() {
	console.log('\n=== team.json ===')
	const path = join(DATA_DIR, 'team.json')
	const data = JSON.parse(readFileSync(path, 'utf8'))
	for (let i = 0; i < data.cards.length; i++) {
		const c = data.cards[i]
		process.stdout.write(`  Card ${i + 1}/${data.cards.length}: ${c.name?.slice(0, 20)}...\r`)
		c.name_en = await translateOne(c.name)
		await delay()
		c.description_en = await translateOne(c.description)
		await delay()
	}
	writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8')
	console.log('  Written team.json')
}

async function translateContacts() {
	console.log('\n=== contacts.json ===')
	const path = join(DATA_DIR, 'contacts.json')
	const data = JSON.parse(readFileSync(path, 'utf8'))
	for (let i = 0; i < data.cards.length; i++) {
		const c = data.cards[i]
		process.stdout.write(`  Card ${i + 1}/${data.cards.length}...\r`)
		c.title_en = await translateOne(c.title)
		await delay()
		c.subtitle_en = await translateOne(c.subtitle)
		await delay()
	}
	writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8')
	console.log('  Written contacts.json')
}

async function translateMetrics() {
	console.log('\n=== metrics.json ===')
	const path = join(DATA_DIR, 'metrics.json')
	const data = JSON.parse(readFileSync(path, 'utf8'))
	for (let i = 0; i < data.items.length; i++) {
		process.stdout.write(`  Item ${i + 1}/${data.items.length}...\r`)
		data.items[i].text_en = await translateOne(data.items[i].text)
		await delay()
	}
	writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8')
	console.log('  Written metrics.json')
}

async function translateLocations() {
	console.log('\n=== locations.json ===')
	const path = join(DATA_DIR, 'locations.json')
	const data = JSON.parse(readFileSync(path, 'utf8'))
	for (let hi = 0; hi < data.halls.length; hi++) {
		const h = data.halls[hi]
		process.stdout.write(`  Hall ${hi + 1}/${data.halls.length}: ${h.title?.slice(0, 25)}...\r`)
		h.title_en = await translateOne(h.title)
		await delay()
		h.area_en = await translateOne(h.area)
		await delay()
		h.capacity_en = await translateOne(h.capacity)
		await delay()
		if (h.extraLines?.length) {
			h.extraLines_en = []
			for (const line of h.extraLines) {
				h.extraLines_en.push(await translateOne(line))
				await delay()
			}
		}
		h.forConducting_en = []
		for (const item of h.forConducting) {
			h.forConducting_en.push(await translateOne(item))
			await delay()
		}
		h.includedInRent_en = []
		for (const item of h.includedInRent) {
			h.includedInRent_en.push(await translateOne(item))
			await delay()
		}
	}
	writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8')
	console.log('  Written locations.json')
}

async function translateLevels() {
	console.log('\n=== levels.json ===')
	const path = join(DATA_DIR, 'levels.json')
	const data = JSON.parse(readFileSync(path, 'utf8'))
	let total = 0
	for (const level of data.levels) {
		if (!level.label_en) {
			process.stdout.write(`  Level ${level.id}: label_en, title_en...\r`)
			level.label_en = await translateOne(level.label)
			await delay()
			level.title_en = await translateOne(level.title)
			await delay()
		}
		for (let ci = 0; ci < level.cards.length; ci++) {
			const card = level.cards[ci]
			total++
			process.stdout.write(`  Level ${level.id} card ${ci + 1}: infoTitle, listItems, cta...\r`)
			card.infoTitle_en = await translateOne(card.infoTitle)
			await delay()
			card.listItems_en = []
			for (const item of card.listItems) {
				card.listItems_en.push(await translateOne(item))
				await delay()
			}
			if (card.cta) {
				card.cta_en = await translateOne(card.cta)
				await delay()
			}
		}
	}
	writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8')
	console.log('  Written levels.json')
}

async function main() {
	const only = process.argv[2] // optional: locales | team | contacts | metrics | locations | levels
	const run = async (name, fn) => {
		if (!only || only === name) await fn()
	}

	await run('locales', translateLocales)
	await run('team', translateTeam)
	await run('contacts', translateContacts)
	await run('metrics', translateMetrics)
	await run('locations', translateLocations)
	await run('levels', translateLevels)

	console.log('\nDone.')
}

main().catch((e) => {
	console.error(e)
	process.exit(1)
})
