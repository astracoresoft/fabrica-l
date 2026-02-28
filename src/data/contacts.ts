import contactsData from './contacts.json'

export type ContactCard = {
	title: string
	subtitle: string
	href: string
	icon: 'instagram' | 'facebook' | 'telegram'
}

const cards: ContactCard[] = contactsData.cards as ContactCard[]

export function getContactCards(): ContactCard[] {
	return cards
}
