'use client'

import { Instagram, Facebook } from 'lucide-react'
import { FaTelegram } from 'react-icons/fa'

import type { ContactCard } from '@/data/contacts'
import { getContactCards } from '@/data/contacts'
import { useLocale } from '@/context/LocaleContext'
import './style.css'

const ContactIcon = ({ type }: { type: ContactCard['icon'] }) => {
	const className = 'contacts-block-card-icon'
	const size = 40
	switch (type) {
		case 'instagram':
			return <Instagram className={className} height={size} />
		case 'facebook':
			return <Facebook className={className} height={size} />
		case 'telegram':
			return <FaTelegram className={className} size={size} />
	}
}

const ContactsBlock = () => {
	const { t, locale } = useLocale()
	const cards = getContactCards(locale)
	return (
		<div id='contacts' className='contacts-block'>
			<div className='contacts-block-container'>
				<div className='contacts-block-title-wrap'>
					<h1 className='contacts-block-title'>{t('contacts.title')}</h1>
				</div>
				<div className='contacts-block-cards'>
					{cards.map((card, index) => (
					<a
						key={index}
						href={card.href}
						target='_blank'
						rel='noopener noreferrer'
						className={`contacts-block-card${card.icon === 'facebook' ? ' contacts-block-card--facebook' : ''}`}
					>
						<div className='contacts-block-card-icon-wrap'>
							<ContactIcon type={card.icon} />
						</div>
						<h3 className='contacts-block-card-title'>{card.title}</h3>
						<h4 className='contacts-block-card-subtitle'>{card.subtitle}</h4>
					</a>
					))}
				</div>
			</div>
		</div>
	)
}

export default ContactsBlock
