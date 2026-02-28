import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getLevelBySlug, getLevels } from '@/data/levels'
import { SITE_URL } from '@/config/site'
import LevelSliderWithGallery from './LevelSliderWithGallery'
import './style.css'

type Props = { params: Promise<{ level: string }> }

export async function generateStaticParams() {
	return getLevels().map((l) => ({ level: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { level } = await params
	const levelData = getLevelBySlug(level)
	if (!levelData) return {}
	const url = `${SITE_URL}/rents/${levelData.slug}`
	return {
		title: `${levelData.title} — Резидентство`,
		description: `Резидентство ${levelData.title} Fabrica L. Умови оренди та резидентства. Дніпро.`,
		openGraph: {
			url,
			title: `${levelData.title} резидентства | Fabrica L`,
			description: `Резидентство ${levelData.title} — Fabrica L, Дніпро.`,
		},
		alternates: {
			canonical: url,
		},
	}
}

export default async function RentsLevelPage({ params }: Props) {
	const { level } = await params
	const levelData = getLevelBySlug(level)
	if (!levelData) notFound()

	return (
		<div className="level-page">
			<div className="level-page-container" style={{ padding: '100px 20px' }}>
				<div className="level-page-title-wrap">
					<h1 className="level-page-title">{levelData.title}</h1>
				</div>
				{levelData.cards.map((card, cardIndex) => (
					<div key={cardIndex} className="level-page-card">
						<div className="level-page-content">
							<LevelSliderWithGallery slides={card.slides} />
							<div className="level-page-info">
								<h2 className="level-page-info-title">{card.infoTitle}</h2>
								<ul>
									{card.listItems.map((item, i) => (
										<li
											key={i}
											dangerouslySetInnerHTML={{ __html: item }}
										/>
									))}
								</ul>
								{card.cta && (
									<span className="level-page-info-cta">{card.cta}</span>
								)}
							</div>
						</div>
						<div className="level-page-divider" />
					</div>
				))}
			</div>
		</div>
	)
}
