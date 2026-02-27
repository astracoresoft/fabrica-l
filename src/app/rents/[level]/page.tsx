import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { SITE_URL } from '@/config/site'
import '../style.css'

const LEVELS = [1, 2, 3, 4, 5] as const

type Props = { params: Promise<{ level: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { level } = await params
	const n = Number(level)
	if (!LEVELS.includes(n as (typeof LEVELS)[number])) return {}
	const url = `${SITE_URL}/rents/${n}`
	return {
		title: `${n} рівень — Резидентство`,
		description: `Резидентство ${n} рівень Fabrica L. Умови оренди та резидентства. Дніпро.`,
		openGraph: {
			url,
			title: `${n} рівень резидентства | Fabrica L`,
			description: `Резидентство ${n} рівень — Fabrica L, Дніпро.`,
		},
		alternates: {
			canonical: url,
		},
	}
}

export default async function RentsLevelPage({ params }: Props) {
	const { level } = await params
	const n = Number(level)
	if (!LEVELS.includes(n as (typeof LEVELS)[number])) notFound()

	return (
		<div className='rents-page'>
			<div className='rents-page-container' style={{ padding: '100px 20px' }}>
				<h1 style={{ fontFamily: 'var(--font-comfortaa)', marginBottom: 24 }}>
					{n} рівень
				</h1>
				<p style={{ marginBottom: 24 }}>
					Сторінка {n} рівня. Контент можна додати пізніше.
				</p>
				<Link href='/rents' style={{ color: '#FFBF00', textDecoration: 'underline' }}>
					← Назад до оренди
				</Link>
			</div>
		</div>
	)
}
