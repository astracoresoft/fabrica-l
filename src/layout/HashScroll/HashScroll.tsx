'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const SCROLL_DELAY_AFTER_NAVIGATION_MS = 150

function scrollToHash(smooth = true) {
	if (typeof window === 'undefined') return
	const hash = window.location.hash
	if (!hash) return
	const id = hash.slice(1)
	const el = document.getElementById(id)
	if (el) el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
}

export default function HashScroll() {
	const pathname = usePathname()
	const prevPathname = useRef<string | null>(null)
	const cameFromOtherPage = useRef(false)

	// Переход с другой страницы на главную с якорем: сначала показываем верх, потом плавно к блоку
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

		cameFromOtherPage.current = prevPathname.current !== null && prevPathname.current !== '/'
		prevPathname.current = pathname

		if (cameFromOtherPage.current) {
			// Сначала скролл вверх, даём увидеть верх страницы
			window.scrollTo({ top: 0, behavior: 'instant' })
			const t = setTimeout(() => {
				scrollToHash(true)
			}, SCROLL_DELAY_AFTER_NAVIGATION_MS)
			return () => clearTimeout(t)
		}

		// Уже на главной (обновление/редирект) — просто прокрутить после рендера
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
