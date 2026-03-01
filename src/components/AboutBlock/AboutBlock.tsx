'use client'

import Link from 'next/link'

import { useLocale } from '@/context/LocaleContext'
import './style.css'

const AboutBlock = () => {
	const { t } = useLocale()
	return (
		<div id='about' className='about-block'>
			<div className='about-block-container'>
				<div className='about-block-hero'>
					<div>
						<h2 className='about-block-title'>{t('about.title')}</h2>
						<span className='about-block-intro' style={{ whiteSpace: 'pre-line' }}>
							{t('about.intro')}
						</span>
					</div>
					<img
						src='/evening-fabrica.webp'
						alt='Evening Fabrica'
						className='about-block-image'
					/>
				</div>
				<div className='about-block-cards'>
					<div className='about-block-card'>
						<img src="/rocket.webp" alt="Rocket" className="about-block-card-icon about-block-card-icon--rocket" />
						<div>
							<h3 className='about-block-card-title'>{t('about.card1Title')}</h3>
							<span className='about-block-card-desc'>{t('about.card1Desc')}</span>
						</div>
					</div>
					<div className='about-block-card'>
						<img src="/message.webp" alt="Message" className="about-block-card-icon about-block-card-icon--message" />
						<div>
							<h3 className='about-block-card-title'>{t('about.card2Title')}</h3>
							<span className='about-block-card-desc'>{t('about.card2Desc')}</span>
						</div>
					</div>
				</div>
				<div className='about-block-cta-wrap'>
					<Link href='/rents' className='about-block-cta'>
						{t('about.ctaRent')}
					</Link>
				</div>
			</div>
		</div>
	)
}

export default AboutBlock
