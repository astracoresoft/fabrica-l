'use client'

import { useState, useCallback } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import { useLocale } from '@/context/LocaleContext'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'

import { bookingPhone, getBookingTel, getHalls, locationImages } from '@/data/locations'
import './style.css'

const LocationsBlock = () => {
	const { t, locale } = useLocale()
	const halls = getHalls(locale)
	const [lightboxOpen, setLightboxOpen] = useState(false)
	const [lightboxSlides, setLightboxSlides] = useState<{ src: string; alt?: string }[]>([])
	const [lightboxIndex, setLightboxIndex] = useState(0)

	const openGallery = useCallback((sources: string[], index: number, altPrefix?: string) => {
		setLightboxSlides(
			sources.map((src, i) => ({
				src,
				alt: altPrefix ? `${altPrefix} ${i + 1}` : `${t('locations.photo')} ${i + 1}`,
			}))
		)
		setLightboxIndex(index)
		setLightboxOpen(true)
	}, [t])

	return (
		<div id='photos' className='locations-block'>
			<div className='locations-block-container'>
				<h1 className='locations-block-title'>
					{t('locations.title')}
				</h1>
				<div className='locations-block-list'>
					{halls.map((hall, hallIndex) => (
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
								<span>{t('locations.forConducting')}</span>
								<ul>
									{hall.forConducting.map((item, i) => (
										<li key={i}>{item}</li>
									))}
								</ul>
								<span>{t('locations.includedInRent')}</span>
								<ul>
									{hall.includedInRent.map((item, i) => (
										<li key={i}>{item}</li>
									))}
								</ul>
								</div>
							</div>
						<span className='locations-hall-booking'>
							{t('locations.booking')}{' '}
							<a href={`tel:${getBookingTel()}`}>
								{bookingPhone}
							</a>
						</span>
						<div className='locations-hall-divider' />
					</div>
				))}
				<div className='locations-gallery'>
					{locationImages.map((src, i) => (
						<button
							key={i}
							type='button'
							className='locations-gallery-btn'
							onClick={() => openGallery(locationImages, i)}
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
			plugins={[Fullscreen, Counter]}
			styles={{
				container: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
			}}
		/>
	</div>
	)
}

export default LocationsBlock
