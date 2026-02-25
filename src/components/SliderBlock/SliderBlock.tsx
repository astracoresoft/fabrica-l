'use client'

import { useState, useEffect, useRef } from 'react'
import './style.css'

const SLIDES = ['/slide1.webp', '/slide2.webp', '/slide3.webp', '/slide4.webp']
const MIN_GAP_PX = 40
const SLIDE_WIDTH_PX = 210
const SINGLE_SLIDE_BREAKPOINT_PX = 540
const INTERVAL_MS = 3000

const TRACK_BY_COUNT: Record<number, string[]> = {
	1: [SLIDES[0], SLIDES[1], SLIDES[2], SLIDES[3], SLIDES[0]],
	2: [SLIDES[0], SLIDES[1], SLIDES[2], SLIDES[3], SLIDES[0], SLIDES[1]],
	3: [
		SLIDES[0],
		SLIDES[1],
		SLIDES[2],
		SLIDES[3],
		SLIDES[0],
		SLIDES[1],
		SLIDES[0],
		SLIDES[1],
		SLIDES[2],
	],
	4: [...SLIDES, ...SLIDES],
}

const MAX_INDEX_BY_COUNT: Record<number, number> = {
	1: 4,
	2: 4,
	3: 6,
	4: 4,
}

const SliderBlock = () => {
	const [index, setIndex] = useState(0)
	const [stepPx, setStepPx] = useState(SLIDE_WIDTH_PX)
	const [visibleCount, setVisibleCount] = useState(4)
	const trackRef = useRef<HTMLDivElement>(null)
	const viewportRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	const maxIndex = MAX_INDEX_BY_COUNT[visibleCount] ?? 4
	const trackSlides = TRACK_BY_COUNT[visibleCount] ?? TRACK_BY_COUNT[4]

	const updateGap = () => {
		const container = containerRef.current
		const viewport = viewportRef.current
		if (!container || !viewport) return
		const w = container.clientWidth
		const count =
			w <= SINGLE_SLIDE_BREAKPOINT_PX
				? 1
				: Math.max(
						1,
						Math.min(
							4,
							Math.floor((w + MIN_GAP_PX) / (SLIDE_WIDTH_PX + MIN_GAP_PX)),
						),
					)
		const gapCount = count - 1
		const totalSlideWidth = count * SLIDE_WIDTH_PX
		// Запас по ширине, чтобы правый слайд не обрезался — гэп делаем меньше
		const reservePx = 24
		const gap =
			gapCount <= 0
				? 0
				: Math.max(0, Math.floor((w - totalSlideWidth - reservePx) / gapCount))
		viewport.style.setProperty('--slide-gap', `${gap}px`)
		if (count === 1) {
			viewport.style.width = ''
			viewport.style.justifyContent = ''
		} else {
			viewport.style.width = ''
			viewport.style.justifyContent = 'center'
		}
		setStepPx(SLIDE_WIDTH_PX + gap)
		setVisibleCount(count)
	}

	useEffect(() => {
		const el = containerRef.current
		if (!el) return
		updateGap()
		const ro = new ResizeObserver(updateGap)
		ro.observe(el)
		return () => ro.disconnect()
	}, [])

	useEffect(() => {
		const id = setInterval(() => {
			setIndex(i => {
				if (i >= maxIndex) {
					trackRef.current?.classList.add('slider-block-track--no-transition')
					return 0
				}
				return i + 1
			})
		}, INTERVAL_MS)
		return () => clearInterval(id)
	}, [maxIndex])

	useEffect(() => {
		if (index === 0 && trackRef.current) {
			const track = trackRef.current
			requestAnimationFrame(() => {
				track.classList.remove('slider-block-track--no-transition')
			})
		}
	}, [index])

	useEffect(() => {
		setIndex(i => Math.min(i, maxIndex))
	}, [maxIndex])

	return (
		<div className='slider-block'>
			<div ref={containerRef} className='slider-block-container'>
				<div
					ref={viewportRef}
					className={`slider-block-viewport${visibleCount === 1 ? ' slider-block-viewport--single' : ''}`}
				>
					<div
						ref={trackRef}
						className='slider-block-track'
						style={{ transform: `translateX(-${index * stepPx}px)` }}
					>
						{trackSlides.map((src, i) => (
							<div key={i} className='slider-block-slide'>
								<img src={src} alt={`Slide ${i + 1}`} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SliderBlock
