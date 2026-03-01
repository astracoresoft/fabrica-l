import locationsData from './locations.json'

export type Locale = 'ua' | 'en'

type HallRaw = {
	title: string
	title_en?: string
	images: [string, string, string, string]
	area: string
	area_en?: string
	capacity: string
	capacity_en?: string
	extraLines?: string[]
	extraLines_en?: string[]
	forConducting: string[]
	forConducting_en?: string[]
	includedInRent: string[]
	includedInRent_en?: string[]
}

export type Hall = {
	title: string
	images: [string, string, string, string]
	area: string
	capacity: string
	extraLines?: string[]
	forConducting: string[]
	includedInRent: string[]
}

const data = locationsData as {
	bookingPhone: string
	halls: HallRaw[]
	locationImages: string[]
}

const hallsRaw: HallRaw[] = data.halls
export const locationImages: string[] = data.locationImages
export const bookingPhone = data.bookingPhone

export function getHalls(locale: Locale = 'ua'): Hall[] {
	return hallsRaw.map((h) => ({
		title: locale === 'en' && h.title_en ? h.title_en : h.title,
		images: h.images,
		area: locale === 'en' && h.area_en ? h.area_en : h.area,
		capacity: locale === 'en' && h.capacity_en ? h.capacity_en : h.capacity,
		extraLines: locale === 'en' && h.extraLines_en ? h.extraLines_en : h.extraLines,
		forConducting: locale === 'en' && h.forConducting_en ? h.forConducting_en : h.forConducting,
		includedInRent: locale === 'en' && h.includedInRent_en ? h.includedInRent_en : h.includedInRent,
	}))
}

export function getBookingTel(): string {
	return bookingPhone.replace(/\s/g, '')
}
