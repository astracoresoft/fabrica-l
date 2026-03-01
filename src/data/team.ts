import teamData from './team.json'

export type Locale = 'ua' | 'en'

type TeamCardRaw = {
	name: string
	name_en?: string
	image: string
	description: string
	description_en?: string
}

export type TeamCard = {
	name: string
	image: string
	description: string
}

const cardsRaw: TeamCardRaw[] = teamData.cards as TeamCardRaw[]

export function getTeamCards(locale: Locale = 'ua'): TeamCard[] {
	return cardsRaw.map((c) => ({
		name: locale === 'en' && c.name_en ? c.name_en : c.name,
		image: c.image,
		description: locale === 'en' && c.description_en ? c.description_en : c.description,
	}))
}
