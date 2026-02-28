import locationsData from './locations.json'

export type Hall = {
	title: string
	images: [string, string, string, string]
	area: string
	capacity: string
	extraLines?: string[]
	forConducting: string[]
	includedInRent: string[]
}

const halls: Hall[] = locationsData.halls as Hall[]
const locationImages: string[] = locationsData.locationImages as string[]
const bookingPhone = locationsData.bookingPhone as string

export { halls, locationImages, bookingPhone }

export function getBookingTel(): string {
	return bookingPhone.replace(/\s/g, '')
}
