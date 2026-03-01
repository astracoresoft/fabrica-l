import contactsData from './contacts.json'

export type Locale = 'ua' | 'en'

type ContactCardRaw = {
	title: string
	title_en?: string
	subtitle: string
	subtitle_en?: string
	href: string
	icon: 'instagram' | 'facebook' | 'telegram'
}

export type ContactCard = {
	title: string
	subtitle: string
	href: string
	icon: 'instagram' | 'facebook' | 'telegram'
}

const cardsRaw: ContactCardRaw[] = contactsData.cards as ContactCardRaw[]

export function getContactCards(locale: Locale = 'ua'): ContactCard[] {
	return cardsRaw.map((c) => ({
		...c,
		title: locale === 'en' && c.title_en ? c.title_en : c.title,
		subtitle: locale === 'en' && c.subtitle_en ? c.subtitle_en : c.subtitle,
	}))
}
