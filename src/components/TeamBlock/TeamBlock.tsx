'use client'

import { useLocale } from '@/context/LocaleContext'
import { getTeamCards } from '@/data/team'
import './style.css'

const TeamBlock = () => {
	const { t, locale } = useLocale()
	const cards = getTeamCards(locale)
	return (
		<div id='team' className='team-block'>
			<div className='team-block-container'>
				<div className='team-block-title-wrap'>
					<h1 className='team-block-title'>{t('team.title')}</h1>
				</div>
				<div className='team-block-cards'>
					{cards.map((card, index) => (
					<div key={index} className='team-block-card'>
						<img
							src={card.image}
							alt={card.name}
							className='team-block-card-image'
						/>
						<div className='team-block-card-overlay'>
							<h3 className='team-block-card-title'>{card.name}</h3>
							<span className='team-block-card-desc'>{card.description}</span>
						</div>
					</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default TeamBlock
