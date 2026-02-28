import levelsData from './levels.json'

export type LevelCard = {
	slides: string[]
	infoTitle: string
	listItems: string[]
	cta: string | null
}

export type Level = {
	id: number
	slug: string
	label: string
	title: string
	image: string
	cards: LevelCard[]
}

const levels: Level[] = levelsData.levels as Level[]

export { levels }

export function getLevels(): Level[] {
	return levels
}

export function getLevelBySlug(slug: string): Level | undefined {
	return levels.find(l => l.slug === slug)
}

export function getLevelById(id: number): Level | undefined {
	return levels.find(l => l.id === id)
}

export function getRentsNavItems(): { href: string; label: string }[] {
	return levels.map(l => ({
		href: `/rents/${l.slug}`,
		label: l.label,
	}))
}

export const RENTS_NAV_ITEMS = getRentsNavItems()
