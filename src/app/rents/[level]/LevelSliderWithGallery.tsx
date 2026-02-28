'use client'

import { useCallback, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'

import { FullWidthSlider } from '@/components'

type LevelSliderWithGalleryProps = {
	slides: string[]
}

export default function LevelSliderWithGallery({ slides }: LevelSliderWithGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [lightboxOpen, setLightboxOpen] = useState(false)

	const goPrev = useCallback(() => {
		setCurrentIndex((i) => (i - 1 + slides.length) % slides.length)
	}, [slides.length])

	const goNext = useCallback(() => {
		setCurrentIndex((i) => (i + 1) % slides.length)
	}, [slides.length])

	const openGallery = useCallback(() => {
		setLightboxOpen(true)
	}, [])

	const lightboxSlides = slides.map((src, i) => ({
		src,
		alt: `Фото ${i + 1}`,
	}))

	return (
		<div className="level-page-slider-wrap">
			<button
				type="button"
				className="full-screen"
				onClick={openGallery}
				aria-label="Відкрити галерею на весь екран"
			>
				<Expand size={22} strokeWidth={2} aria-hidden color="#FFFFFF" />
			</button>
			<button
				type="button"
				className="left-arrow"
				onClick={goPrev}
				aria-label="Попередній слайд"
			>
				<ChevronLeft
					size={30}
					strokeWidth={2}
					aria-hidden
					color="#FFFFFF"
					style={{ marginRight: '2px' }}
				/>
			</button>
			<button
				type="button"
				className="right-arrow"
				onClick={goNext}
				aria-label="Наступний слайд"
			>
				<ChevronRight
					size={30}
					strokeWidth={2}
					aria-hidden
					color="#FFFFFF"
					style={{ marginLeft: '2px' }}
				/>
			</button>
			<FullWidthSlider
				slides={slides}
				currentIndex={currentIndex}
				onIndexChange={setCurrentIndex}
			/>
			<Lightbox
				open={lightboxOpen}
				close={() => setLightboxOpen(false)}
				index={currentIndex}
				slides={lightboxSlides}
				plugins={[Fullscreen, Counter]}
				styles={{
					container: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
				}}
			/>
		</div>
	)
}
