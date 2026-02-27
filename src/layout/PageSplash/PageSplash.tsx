'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import './style.css'

export default function PageSplash() {
	const pathname = usePathname()
	const prevPathname = useRef<string | null>(null)
	const [visible, setVisible] = useState(true)

	useEffect(() => {
		const isNavigation =
			prevPathname.current !== null && prevPathname.current !== pathname
		prevPathname.current = pathname

		if (isNavigation) {
			setVisible(true)
		}
	}, [pathname])

	useEffect(() => {
		if (!visible) return
		const t = setTimeout(() => setVisible(false), 1500)
		return () => clearTimeout(t)
	}, [visible])

	if (!visible) return null

	return (
		<div className='page-splash' aria-hidden>
			<img src='/logo.webp' alt='' className='page-splash-logo' />
		</div>
	)
}
