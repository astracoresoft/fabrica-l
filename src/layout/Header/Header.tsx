'use client'

import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import './style.css'

export default function Header() {
	const [visible, setVisible] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)

	useEffect(() => {
		const onScroll = () => {
			setVisible(window.scrollY >= window.innerHeight - 60)
		}

		window.addEventListener('scroll', onScroll)
		onScroll()

		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<>
			<header className={visible ? 'header visible' : 'header'}>
				<div className='header-container'>
					<a href='/'>
						<img
							src='/logo-header.webp'
							alt='Fabrica L'
							className='header-logo'
						/>
					</a>

					<nav className='desktop-nav'>
						<ul className='nav-menu'>
							<li className='nav-item'>
								<a href='#about'>про проект</a>
							</li>
							<div className='point' />
							<li className='nav-item'>
								<a href='#photos'>фото</a>
							</li>
							<div className='point' />
							<li className='nav-item'>
								<a href='#team'>команда</a>
							</li>
							<div className='point' />
							<li className='nav-item'>
								<a href='#contacts'>контакти</a>
							</li>
						</ul>
					</nav>

					<button
						className='burger'
						onClick={() => setMenuOpen(true)}
						aria-label='Открыть меню'
					>
						<img src='/burger-menu.webp' alt='Menu' />
					</button>
				</div>
			</header>

			<div
				className={menuOpen ? 'overlay active' : 'overlay'}
				onClick={() => setMenuOpen(false)}
			/>

			<aside className={menuOpen ? 'sidebar active' : 'sidebar'}>
				<button
					className='sidebar-close'
					onClick={() => setMenuOpen(false)}
					aria-label='Закрыть меню'
				>
					<FiX size={28} />
				</button>

				<nav>
					<ul className='sidebar-menu'>
						<li>
							<a href='#about' onClick={() => setMenuOpen(false)}>
								про проект
							</a>
						</li>
						<li>
							<a href='#photos' onClick={() => setMenuOpen(false)}>
								фото
							</a>
						</li>
						<li>
							<a href='#team' onClick={() => setMenuOpen(false)}>
								команда
							</a>
						</li>
						<li>
							<a href='#contacts' onClick={() => setMenuOpen(false)}>
								контакти
							</a>
						</li>
					</ul>
				</nav>
			</aside>
		</>
	)
}
