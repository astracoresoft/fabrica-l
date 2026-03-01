import levelsData from './levels.json'

export type Locale = 'ua' | 'en'

type LevelRaw = {
	id: number
	slug: string
	label: string
	label_en?: string
	title: string
	title_en?: string
	image: string
	cards: LevelCard[]
}

export type LevelCard = {
	slides: string[]
	infoTitle: string
	infoTitle_en?: string
	listItems: string[]
	listItems_en?: string[]
	cta: string | null
	cta_en?: string | null
}

export type Level = {
	id: number
	slug: string
	label: string
	title: string
	image: string
	cards: LevelCard[]
}

const levelsRaw: LevelRaw[] = levelsData.levels as LevelRaw[]

function withLocale(level: LevelRaw, locale: Locale): Level {
	const label = locale === 'en' && level.label_en ? level.label_en : level.label
	const title = locale === 'en' && level.title_en ? level.title_en : level.title
	const cards: LevelCard[] = level.cards.map((c) => ({
		...c,
		infoTitle: locale === 'en' && c.infoTitle_en ? c.infoTitle_en : c.infoTitle,
		listItems: locale === 'en' && c.listItems_en?.length ? c.listItems_en : c.listItems,
		cta: locale === 'en' && c.cta_en != null ? c.cta_en : c.cta,
	}))
	return { ...level, label, title, cards }
}

export function getLevels(locale: Locale = 'ua'): Level[] {
	return levelsRaw.map((l) => withLocale(l, locale))
}

export function getLevelBySlug(slug: string, locale: Locale = 'ua'): Level | undefined {
	const raw = levelsRaw.find((l) => l.slug === slug)
	return raw ? withLocale(raw, locale) : undefined
}

export function getLevelById(id: number, locale: Locale = 'ua'): Level | undefined {
	const raw = levelsRaw.find((l) => l.id === id)
	return raw ? withLocale(raw, locale) : undefined
}

export function getRentsNavItems(locale: Locale = 'ua'): { href: string; label: string }[] {
	return levelsRaw.map((l) => ({
		href: `/rents/${l.slug}`,
		label: locale === 'en' && l.label_en ? l.label_en : l.label,
	}))
}
