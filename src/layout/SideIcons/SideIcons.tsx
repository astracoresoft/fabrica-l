'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Facebook, Instagram, Phone } from 'lucide-react'
import { FaTelegram } from 'react-icons/fa'

import { getContactCards } from '@/data/contacts'
import { getBookingTel } from '@/data/locations'
import './style.css'

const ICON_SIZE = 24

export default function SideIcons() {
	const [open, setOpen] = useState(true)
	const cards = getContactCards()
	const tel = getBookingTel()

	return (
		<aside className='side-icons' aria-label='Контакти'>
			<button
				type='button'
				className='side-icons-arrow'
				onClick={() => setOpen(v => !v)}
				aria-label={open ? 'Сховати контакти' : 'Показати контакти'}
			>
				{open ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
			</button>
			<div className={`side-icons-inner ${open ? '' : 'side-icons-inner--closed'}`}>
				{cards.map(card => (
					<a
						key={card.icon}
						href={card.href}
						target='_blank'
						rel='noopener noreferrer'
						className='side-icons-link'
						aria-label={card.title}
					>
						{card.icon === 'instagram' && <Instagram size={ICON_SIZE} />}
						{card.icon === 'facebook' && <Facebook size={ICON_SIZE} />}
						{card.icon === 'telegram' && <FaTelegram size={ICON_SIZE} />}
					</a>
				))}
				<a
					href={`tel:${tel}`}
					className='side-icons-link'
					aria-label='Зателефонувати'
				>
					<Phone size={ICON_SIZE} />
				</a>
			</div>
		</aside>
	)
}
