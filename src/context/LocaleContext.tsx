'use client'

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react'

import { LOCALE_COOKIE_NAME } from '@/lib/locale'
import type { Locale } from '@/lib/locale'
import ua from '@/locales/ua.json'
import en from '@/locales/en.json'

const STORAGE_KEY = 'fabrica-locale'

const messages: Record<Locale, Record<string, unknown>> = { ua, en }

function setLocaleCookie(locale: Locale) {
	if (typeof document === 'undefined') return
	document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; SameSite=Lax`
}

function getStoredLocale(): Locale {
	if (typeof window === 'undefined') return 'ua'
	try {
		const fromCookie = document.cookie
			.split('; ')
			.find((row) => row.startsWith(`${LOCALE_COOKIE_NAME}=`))
			?.split('=')[1]
		if (fromCookie === 'en' || fromCookie === 'ua') return fromCookie
		const stored = localStorage.getItem(STORAGE_KEY)
		if (stored === 'en' || stored === 'ua') {
			setLocaleCookie(stored)
			return stored
		}
	} catch {
		// ignore
	}
	return 'ua'
}

function getByPath(obj: Record<string, unknown>, path: string): string | undefined {
	const keys = path.split('.')
	let current: unknown = obj
	for (const key of keys) {
		if (current == null || typeof current !== 'object') return undefined
		current = (current as Record<string, unknown>)[key]
	}
	return typeof current === 'string' ? current : undefined
}

type LocaleContextValue = {
	locale: Locale
	setLocale: (locale: Locale) => void
	t: (key: string) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>('ua')
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setLocaleState(getStoredLocale())
		setMounted(true)
	}, [])

	useEffect(() => {
		if (!mounted) return
		try {
			localStorage.setItem(STORAGE_KEY, locale)
		} catch {
			// ignore
		}
		setLocaleCookie(locale)
		if (typeof document !== 'undefined') {
			document.documentElement.lang = locale === 'ua' ? 'uk' : 'en'
		}
	}, [locale, mounted])

	const setLocale = useCallback((next: Locale) => {
		setLocaleState(next)
	}, [])

	const t = useCallback(
		(key: string): string => {
			const value = getByPath(messages[locale] as Record<string, unknown>, key)
			return value ?? key
		},
		[locale]
	)

	const value = useMemo<LocaleContextValue>(
		() => ({ locale, setLocale, t }),
		[locale, setLocale, t]
	)

	return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
	const ctx = useContext(LocaleContext)
	if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
	return ctx
}
