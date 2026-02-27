import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronsRight } from 'lucide-react'

import { SITE_URL } from '@/config/site'
import './style.css'

const LEVELS = [
	{ level: 1, image: '/lvl1.webp' },
	{ level: 2, image: '/lvl2.webp' },
	{ level: 3, image: '/lvl3.webp' },
	{ level: 4, image: '/lvl4.webp' },
	{ level: 5, image: '/lvl5.webp' },
] as const

export const metadata: Metadata = {
	title: 'Оренда — Резидентство',
	description:
		'Оренда простору Fabrica L. Резидентство 1–5 рівнів. Професійне обладнання та простір для зйомок у Дніпрі.',
	keywords: ['оренда фотостудії', 'резидентство', 'Fabrica L', 'оренда простору Дніпро'],
	openGraph: {
		url: `${SITE_URL}/rents`,
		title: 'Оренда та резидентство | Fabrica L',
		description: 'Оренда простору Fabrica L. Резидентство 1–5 рівнів. Дніпро.',
	},
	alternates: {
		canonical: `${SITE_URL}/rents`,
	},
}

export default function RentsPage() {
	return (
		<div className='rents-page'>
			<div className='rents-page-container'>
				<div className='rents-page-title-wrap'>
					<h1 className='rents-page-title'>Оренда</h1>
				</div>
				<div className='level-cards'>
					{LEVELS.map(({ level, image }) => (
						<div key={level} className='level-card'>
							<h2 className='level-title'>{level} рівень</h2>
							<Link href={`/rents/${level}`} className='level-cta'>
								<ChevronsRight size={18} strokeWidth={2} aria-hidden />
								переглянути {level} рівень
							</Link>
							<img src={image} alt={`${level} рівень`} className='level-image' />
							<div className='level-divider' />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
