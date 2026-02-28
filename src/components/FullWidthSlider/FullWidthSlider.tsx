'use client'

import { useEffect, useRef, useState } from 'react'
import './style.css'

type FullWidthSliderProps = {
	slides: string[]
	className?: string
	/** Контроль снаружи: текущий индекс и колбэк при смене */
	currentIndex?: number
	onIndexChange?: (index: number) => void
}

export default function FullWidthSlider({
	slides: initialSlides,
	className = '',
	currentIndex: controlledIndex,
	onIndexChange,
}: FullWidthSliderProps) {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const trackRef = useRef<HTMLDivElement>(null)
	const [internalIndex, setInternalIndex] = useState(0)

	const isControlled = controlledIndex !== undefined && onIndexChange !== undefined
	const currentIndex = isControlled ? controlledIndex : internalIndex
	const setCurrentIndex = isControlled ? onIndexChange : setInternalIndex

	const slides = initialSlides.length ? initialSlides : ['/slide1.webp']
	const repeat = 3
	const extendedSlides = Array.from({ length: repeat }, () => [...slides]).flat()

	useEffect(() => {
		const track = trackRef.current
		if (!track || !wrapperRef.current) return

		if (!isControlled && currentIndex >= slides.length) {
			track.style.transition = 'none'
			track.style.transform = 'translateX(0)'
			const t = setTimeout(() => {
				setCurrentIndex(0)
				track.style.transition = ''
			}, 0)
			return () => clearTimeout(t)
		}

		track.style.transform = `translateX(-${currentIndex * 100}%)`
	}, [currentIndex, slides.length, isControlled])

	return (
		<div className={`full-width-slider ${className}`.trim()} ref={wrapperRef}>
			<div className="full-width-slider-track" ref={trackRef}>
				{extendedSlides.map((src, i) => (
					<div key={`${i}-${src}`} className="full-width-slider-slide">
						<img src={src} alt="" />
					</div>
				))}
			</div>
		</div>
	)
}
