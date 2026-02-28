'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/** Задержка прокрутки к якорю после перехода на главную: после того как заставка показалась и скрылась (должно совпадать с длительностью заставки в PageSplash ~1500ms + небольшой буфер) */
const SCROLL_AFTER_SPLASH_MS = 1600

const SCROLL_RETRY_INTERVAL_MS = 100
const SCROLL_RETRY_MAX = 15

function scrollToHash(smooth = true): boolean {
	if (typeof window === 'undefined') return false
	const hash = window.location.hash
	if (!hash) return false
	const id = hash.slice(1)
	const el = document.getElementById(id)
	if (el) {
		el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
		return true
	}
	return false
}

export default function HashScroll() {
	const pathname = usePathname()
	const prevPathname = useRef<string | null>(null)
	const cameFromOtherPage = useRef(false)

	// Переход с другой страницы на главную с якорем: ждём пока заставка покажется и уберётся, потом прокручиваем к блоку
	useEffect(() => {
		if (pathname !== '/') {
			prevPathname.current = pathname
			return
		}

		const hadHash = typeof window !== 'undefined' && window.location.hash
		if (!hadHash) {
			prevPathname.current = pathname
			return
		}

		cameFromOtherPage.current =
			prevPathname.current !== null && prevPathname.current !== '/'
		prevPathname.current = pathname

		if (cameFromOtherPage.current) {
			window.scrollTo({ top: 0, behavior: 'instant' })
			// Прокрутку к якорю делаем после заставки (SCROLL_AFTER_SPLASH_MS), с повторными попытками если элемент ещё не в DOM
			let retryCount = 0
			let cancelled = false
			const tryScroll = () => {
				if (cancelled) return
				if (scrollToHash(true)) return
				retryCount += 1
				if (retryCount < SCROLL_RETRY_MAX) {
					setTimeout(tryScroll, SCROLL_RETRY_INTERVAL_MS)
				}
			}
			const t = setTimeout(tryScroll, SCROLL_AFTER_SPLASH_MS)
			return () => {
				cancelled = true
				clearTimeout(t)
			}
		}

		// Уже на главной — прокрутить после рендера
		const id = requestAnimationFrame(() => {
			requestAnimationFrame(() => scrollToHash(true))
		})
		return () => cancelAnimationFrame(id)
	}, [pathname])

	// На главной кликнули по другому якорю — плавная прокрутка
	useEffect(() => {
		const onHashChange = () => scrollToHash(true)
		window.addEventListener('hashchange', onHashChange)
		return () => window.removeEventListener('hashchange', onHashChange)
	}, [])

	return null
}
