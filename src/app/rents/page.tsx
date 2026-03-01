import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { ChevronsRight } from 'lucide-react'

import { LOCALE_COOKIE_NAME } from '@/lib/locale'
import { getServerT } from '@/lib/i18n-server'
import { getLevels } from '@/data/levels'
import { SITE_URL } from '@/config/site'
import './style.css'

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

export default async function RentsPage() {
	const cookieStore = await cookies()
	const locale = cookieStore.get(LOCALE_COOKIE_NAME)?.value === 'en' ? 'en' : 'ua'
	const t = getServerT(locale)
	const LEVELS = getLevels(locale)

	return (
		<div className='rents-page'>
			<div className='rents-page-container'>
				<div className='rents-page-title-wrap'>
					<h1 className='rents-page-title'>{t('rents.title')}</h1>
				</div>
				<div className='level-cards'>
					{LEVELS.map((level) => (
						<div key={level.id} className='level-card'>
							<h2 className='level-title'>{level.label}</h2>
							<Link href={`/rents/${level.slug}`} className='level-cta'>
								<ChevronsRight size={18} strokeWidth={2} aria-hidden />
								{t('rents.viewLevel')} {level.label}
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
