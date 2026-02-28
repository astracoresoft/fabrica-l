import navData from './nav.json'
import { RENTS_NAV_ITEMS } from './levels'

export type NavItem = {
	href: string
	label: string
	children?: readonly { href: string; label: string }[]
}

const rawItems = navData.items as { href: string; label: string; withChildren?: boolean }[]

export function getNavItems(): NavItem[] {
	return rawItems.map((item) => {
		if (item.withChildren && item.href === '/rents') {
			return { href: item.href, label: item.label, children: RENTS_NAV_ITEMS }
		}
		return { href: item.href, label: item.label }
	})
}

export const NAV_ITEMS = getNavItems()
