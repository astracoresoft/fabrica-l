import navData from './nav.json'
import type { Locale } from './levels'
import { getRentsNavItems } from './levels'

export type NavItem = {
	href: string
	label: string
	children?: readonly { href: string; label: string }[]
}

export type NavConfigItem = {
	href: string
	labelKey: string
	withChildren?: boolean
}

const rawItems = navData.items as { href: string; labelKey: string; withChildren?: boolean }[]

export function getNavItems(locale: Locale, t: (key: string) => string): NavItem[] {
	return rawItems.map((item) => {
		if (item.withChildren && item.href === '/rents') {
			return { href: item.href, label: t(item.labelKey), children: getRentsNavItems(locale) }
		}
		return { href: item.href, label: t(item.labelKey) }
	})
}
