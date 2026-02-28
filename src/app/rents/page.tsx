import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronsRight } from 'lucide-react'

import { getLevels } from '@/data/levels'
import { SITE_URL } from '@/config/site'
import './style.css'

const LEVELS = getLevels()

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
					{LEVELS.map((level) => (
						<div key={level.id} className='level-card'>
							<h2 className='level-title'>{level.label}</h2>
							<Link href={`/rents/${level.slug}`} className='level-cta'>
								<ChevronsRight size={18} strokeWidth={2} aria-hidden />
								переглянути {level.label}
							</Link>
							<img src={level.image} alt={level.label} className='level-image' />
							<div className='level-divider' />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
