/**
 * Серверная i18n: getServerT для использования в Server Components.
 * Не импортировать в клиентские компоненты.
 */

import type { Locale } from './locale'
import ua from '@/locales/ua.json'
import en from '@/locales/en.json'

const messages: Record<Locale, Record<string, unknown>> = { ua, en }

function getByPath(obj: Record<string, unknown>, path: string): string | undefined {
	const keys = path.split('.')
	let current: unknown = obj
	for (const key of keys) {
		if (current == null || typeof current !== 'object') return undefined
		current = (current as Record<string, unknown>)[key]
	}
	return typeof current === 'string' ? current : undefined
}

/** Возвращает функцию t(key) для заданной локали (только для серверных компонентов). */
export function getServerT(locale: Locale): (key: string) => string {
	return (key: string) => {
		const value = getByPath(messages[locale] as Record<string, unknown>, key)
		return value ?? key
	}
}
