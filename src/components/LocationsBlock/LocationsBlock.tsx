'use client'

import { useState, useCallback } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import 'yet-another-react-lightbox/styles.css'
import './style.css'

const BOOKING_PHONE = '067 719 09 00'
const BOOKING_TEL = '0677190900'

type Hall = {
	title: string
	images: [string, string, string, string]
	area: string
	capacity: string
	extraLines?: string[]
	forConducting: string[]
	includedInRent: string[]
}

const HALLS: Hall[] = [
	{
		title: 'Івент-хол Small',
		images: ['/holl-small1.webp', '/holl-small2.webp', '/holl-small3.webp', '/holl-small4.webp'],
		area: 'Загальна площа 100 кв.м',
		capacity: 'Місткість до 80 посадкових місць',
		forConducting: [
			'Конференцій',
			'Тренінгів',
			'Виставок',
			'Показів',
			'Лекцій',
			'Індивідуальних свят',
		],
		includedInRent: [
			'Стільці, дивани, столи (кількість обговорюється індивідуально)',
			'Комплект музичної апаратури для супроводу: колонки, мікшер, мікрофон',
			'Проектор з екраном',
			'Фліпчарт',
			'Wi-fi',
		],
	},
	{
		title: 'Івент-хол Medium',
		images: ['/holl-medium1.webp', '/holl-medium2.webp', '/holl-medium3.webp', '/holl-medium4.webp'],
		area: 'Загальна площа 350 кв.м',
		capacity: 'Місткість до 200 посадкових місць',
		extraLines: ['Відкрита тераса'],
		forConducting: [
			'Конференцій',
			'Тренінгів',
			'Виставок',
			'Показів',
			'Лекцій',
			'Індивідуальних свят',
		],
		includedInRent: [
			'Стільці, дивани, столи (кількість обговорюється індивідуально)',
			'Комплект музичної апаратури для супроводу: колонки, мікшер, мікрофон',
			'Проектор з екраном',
			'Фліпчарт',
			'Wi-fi',
		],
	},
	{
		title: 'Івент-хол Large',
		images: ['/holl-large1.webp', '/holl-large2.webp', '/holl-large3.webp', '/holl-large4.webp'],
		area: 'Загальна площа 850 кв.м',
		capacity: 'Місткість до 400+ посадкових місць',
		extraLines: ['Відкрита тераса'],
		forConducting: ['Фестивалів', 'Виставок', 'Індивідуальних свят'],
		includedInRent: [
			'Стільці, дивани, столи (кількість обговорюється індивідуально)',
			'Комплект музичної апаратури для супроводу: колонки, мікшер, мікрофон',
			'Проектор з екраном',
			'Фліпчарт',
			'Wi-fi',
		],
	},
]

const LOCATION_IMAGES = [
	'/location1.webp',
	'/location2.webp',
	'/location3.webp',
	'/location4.webp',
	'/location5.webp',
	'/location6.webp',
	'/location7.webp',
	'/location8.webp',
]

const LocationsBlock = () => {
	const [lightboxOpen, setLightboxOpen] = useState(false)
	const [lightboxSlides, setLightboxSlides] = useState<{ src: string; alt?: string }[]>([])
	const [lightboxIndex, setLightboxIndex] = useState(0)

	const openGallery = useCallback((sources: string[], index: number, altPrefix?: string) => {
		setLightboxSlides(
			sources.map((src, i) => ({
				src,
				alt: altPrefix ? `${altPrefix} ${i + 1}` : `Фото ${i + 1}`,
			}))
		)
		setLightboxIndex(index)
		setLightboxOpen(true)
	}, [])

	return (
		<div className='locations-block'>
			<div className='locations-block-container'>
				<h1 className='locations-block-title'>
					Простори для проведення івентів та заходів
				</h1>
				<div className='locations-block-list'>
					{HALLS.map((hall, hallIndex) => (
						<div key={hallIndex} className='locations-hall'>
							<h2 className='locations-hall-title'>{hall.title}</h2>
							<div className='locations-hall-content'>
								<div>
									<div className='locations-hall-gallery'>
										{hall.images.map((src, i) => (
											<button
												key={i}
												type='button'
												className='locations-hall-gallery-btn'
												onClick={() => openGallery(hall.images, i, hall.title)}
											>
												<img
													src={src}
													alt={`${hall.title} ${i + 1}`}
												/>
											</button>
										))}
									</div>
								</div>
								<div className='locations-hall-info'>
								<strong>{hall.area}</strong>
								<span>{hall.capacity}</span>
								{hall.extraLines?.map((line, i) => (
									<span key={i}>{line}</span>
								))}
								<span>Для проведення:</span>
								<ul>
									{hall.forConducting.map((item, i) => (
										<li key={i}>{item}</li>
									))}
								</ul>
								<span>У вартості оренди враховано:</span>
								<ul>
									{hall.includedInRent.map((item, i) => (
										<li key={i}>{item}</li>
									))}
								</ul>
								</div>
							</div>
						<span className='locations-hall-booking'>
							Бронюйте за телефоном{' '}
							<a href={`tel:${BOOKING_TEL.replace(/\s/g, '')}`}>
								{BOOKING_PHONE}
							</a>
						</span>
						<div className='locations-hall-divider' />
					</div>
				))}
				<div className='locations-gallery'>
					{LOCATION_IMAGES.map((src, i) => (
						<button
							key={i}
							type='button'
							className='locations-gallery-btn'
							onClick={() => openGallery(LOCATION_IMAGES, i)}
						>
							<img src={src} alt={`location ${i + 1}`} />
						</button>
					))}
				</div>
			</div>
		</div>
		<Lightbox
			open={lightboxOpen}
			close={() => setLightboxOpen(false)}
			index={lightboxIndex}
			slides={lightboxSlides}
			plugins={[Fullscreen]}
			styles={{
				container: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
			}}
		/>
	</div>
	)
}

export default LocationsBlock
