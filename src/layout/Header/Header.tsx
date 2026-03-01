'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiX } from 'react-icons/fi'

import { useLocale } from '@/context/LocaleContext'
import { getNavItems } from '@/data/nav'
import './style.css'

export default function Header() {
	const pathname = usePathname()
	const { t, locale } = useLocale()
	const navItems = useMemo(() => getNavItems(locale, t), [locale, t])
	const [visible, setVisible] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)

	const closeMenu = useCallback(() => setMenuOpen(false), [])

	const isHome = pathname === '/'
	const handleHashClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
		e.preventDefault()
		window.history.pushState(null, '', hash)
		const id = hash.slice(1)
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
		closeMenu()
	}, [closeMenu])

	useEffect(() => {
		if (pathname !== '/') return
		const onScroll = () => {
			setVisible(window.scrollY >= window.innerHeight - 60)
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		onScroll()
		return () => window.removeEventListener('scroll', onScroll)
	}, [pathname])

	const headerVisible = isHome ? visible : true

	return (
		<>
			<header className={headerVisible ? 'header visible' : 'header'}>
				<div className='header-container'>
					<Link href='/'>
						<img
							src='/logo-header.webp'
							alt='Fabrica L'
							className='header-logo'
						/>
					</Link>

					<nav className='desktop-nav'>
						<ul className='nav-menu'>
							{navItems.flatMap((item, i) => [
								<li
									key={item.href}
									className={item.children ? 'nav-item nav-item--dropdown' : 'nav-item'}
								>
									{item.href.startsWith('#') ? (
										isHome ? (
											<a
												href={item.href}
												onClick={(e) => handleHashClick(e, item.href)}
											>
												{item.label}
											</a>
										) : (
											<Link href={`/${item.href}`}>{item.label}</Link>
										)
									) : (
										<Link href={item.href}>{item.label}</Link>
									)}
									{item.children && (
										<div className='nav-dropdown'>
											<ul className='nav-dropdown-list'>
												{item.children.map((child) => (
													<li key={child.href}>
														<Link href={child.href}>{child.label}</Link>
													</li>
												))}
											</ul>
										</div>
									)}
								</li>,
								...(i < navItems.length - 1
									? [<li key={`sep-${i}`} className="nav-sep" aria-hidden />]
									: []),
							])}
						</ul>
					</nav>

					<button
						type='button'
						className='burger'
						onClick={() => setMenuOpen(true)}
						aria-label={t('header.openMenu')}
					>
						<img src='/burger-menu.webp' alt='' />
					</button>
				</div>
			</header>

			<div
				className={menuOpen ? 'overlay active' : 'overlay'}
				onClick={closeMenu}
				aria-hidden
			/>

			<aside className={menuOpen ? 'sidebar active' : 'sidebar'}>
				<button
					type='button'
					className='sidebar-close'
					onClick={closeMenu}
					aria-label={t('header.closeMenu')}
				>
					<FiX size={28} />
				</button>
				<nav>
					<ul className='sidebar-menu'>
						{navItems.map((item) => (
							<li key={item.href}>
								{item.href.startsWith('#') ? (
									isHome ? (
										<a
											href={item.href}
											onClick={(e) => handleHashClick(e, item.href)}
										>
											{item.label}
										</a>
									) : (
										<Link href={`/${item.href}`} onClick={closeMenu}>
											{item.label}
										</Link>
									)
								) : (
									<Link href={item.href} onClick={closeMenu}>
										{item.label}
									</Link>
								)}
								{item.children && (
									<ul className='sidebar-submenu'>
										{item.children.map((child) => (
											<li key={child.href}>
												<Link href={child.href} onClick={closeMenu}>
													{child.label}
												</Link>
											</li>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
				</nav>
			</aside>
		</>
	)
}
