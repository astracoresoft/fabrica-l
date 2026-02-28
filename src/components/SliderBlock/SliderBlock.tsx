'use client'

import { useEffect, useRef, useState } from 'react'

import { getSlides } from '@/data/slides'
import './style.css'

const SLIDE_WIDTH = 200
const MIN_GAP = 30
const RIGHT_OFFSET = 40
const AUTO_PLAY_MS = 3000

const SLIDES = getSlides()
// Два полных повтора — в конце анимации показываем второй набор, визуально тот же что и первый
const SLIDES_EXTENDED = [...SLIDES, ...SLIDES]

function getSlidesToShow(containerWidth: number): number {
	if (containerWidth <= 0) return 4
	if (containerWidth > SLIDE_WIDTH * 4 + MIN_GAP * 3) return 4
	if (containerWidth > SLIDE_WIDTH * 3 + MIN_GAP * 2) return 3
	if (containerWidth > SLIDE_WIDTH * 2 + MIN_GAP) return 2
	return 1
}

export default function SliderBlock() {
	const containerRef = useRef<HTMLDivElement>(null)
	const [slidesToShow, setSlidesToShow] = useState(4)
	const [gap, setGap] = useState(0)

	useEffect(() => {
		const el = containerRef.current
		if (!el) return

		const update = () => {
			const w = Math.max(0, el.clientWidth - RIGHT_OFFSET)
			const n = getSlidesToShow(w)
			setSlidesToShow(n)
			if (n === 1) {
				setGap(0)
			} else {
				const g = (w - n * SLIDE_WIDTH) / (n - 1)
				setGap(Math.max(0, g))
			}
		}

		const onOrientationChange = () => {
			requestAnimationFrame(() => requestAnimationFrame(update))
		}

		update()
		const ro = new ResizeObserver(update)
		ro.observe(el)
		window.addEventListener('orientationchange', onOrientationChange)
		window.addEventListener('resize', update)
		return () => {
			ro.disconnect()
			window.removeEventListener('orientationchange', onOrientationChange)
			window.removeEventListener('resize', update)
		}
	}, [])

	if (SLIDES.length === 0) return null

	// Округляем до целого, чтобы в точке зацикливания не было субпиксельного сдвига
	const cycleWidthPx = Math.round(SLIDES.length * SLIDE_WIDTH + (SLIDES.length - 1) * gap)
	const durationMs = SLIDES.length * AUTO_PLAY_MS
	const isSingleSlide = slidesToShow === 1

	return (
		<div className="slider-block">
			<div className="slider-block-container" ref={containerRef}>
				<div
					className="slider-track-wrapper"
					style={{
						width: isSingleSlide ? SLIDE_WIDTH : '100%',
						justifyContent: isSingleSlide ? 'center' : undefined,
					}}
				>
					<div
						className="slider-track"
						style={{
							gap,
							width: isSingleSlide ? SLIDE_WIDTH : undefined,
							['--cycle-width' as string]: `${cycleWidthPx}px`,
							animation: `slideLoop ${durationMs}ms linear infinite`,
						}}
					>
						{SLIDES_EXTENDED.map((src, i) => (
							<div
								key={`${i}-${src}`}
								className="slider-slide"
								style={{
									flex: isSingleSlide ? 'none' : `0 0 ${SLIDE_WIDTH}px`,
									width: SLIDE_WIDTH,
									minWidth: SLIDE_WIDTH,
								}}
							>
								<img src={src} alt="" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
