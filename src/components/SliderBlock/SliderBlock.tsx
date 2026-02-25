'use client'

import { useEffect, useRef, useState } from 'react'
import './style.css'

const SLIDE_WIDTH = 210
const MIN_GAP = 30
const AUTO_PLAY_MS = 3000

const SLIDES = ['/slide1.webp', '/slide2.webp', '/slide3.webp', '/slide4.webp']

// Дублируем слайды для бесшовного бесконечного скролла
const REPEAT = 10
const SLIDES_EXTENDED = Array.from({ length: REPEAT }, () => [...SLIDES]).flat()

// Пороги: при ширине строго больше — показываем больше слайдов; на границе — меньше (1 слайд по центру)
function getSlidesToShow(containerWidth: number): number {
	if (containerWidth <= 0) return 4
	// 4 слайда: gap = (w - 4*210)/3 >= 30  => w > 930
	if (containerWidth > SLIDE_WIDTH * 4 + MIN_GAP * 3) return 4
	// 3 слайда: gap = (w - 630)/2 >= 30  => w > 690
	if (containerWidth > SLIDE_WIDTH * 3 + MIN_GAP * 2) return 3
	// 2 слайда: gap = (w - 420) >= 30  => w > 450 (при 430 и меньше — 1 слайд)
	if (containerWidth > SLIDE_WIDTH * 2 + MIN_GAP) return 2
	return 1
}

const SliderBlock = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const trackRef = useRef<HTMLDivElement>(null)
	const [slidesToShow, setSlidesToShow] = useState(4)
	const [gap, setGap] = useState(0)
	const [currentIndex, setCurrentIndex] = useState(0)
	const oneSlideStep = SLIDE_WIDTH + (slidesToShow > 1 ? gap : 0)

	// Размер контейнера и пересчёт слайдов/гепа
	useEffect(() => {
		const el = containerRef.current
		if (!el) return

		const update = () => {
			const w = el.clientWidth
			const n = getSlidesToShow(w)
			setSlidesToShow(n)
			if (n === 1) {
				setGap(0)
			} else {
				const g = (w - n * SLIDE_WIDTH) / (n - 1)
				setGap(Math.max(0, g))
			}
		}

		// После поворота экрана layout обновляется с задержкой — пересчитываем через rAF
		const onOrientationChange = () => {
			requestAnimationFrame(() => {
				requestAnimationFrame(update)
			})
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

	// Автопрокрутка каждые 3 секунды
	useEffect(() => {
		if (slidesToShow < 1) return
		const id = setInterval(() => {
			setCurrentIndex(prev => prev + 1)
		}, AUTO_PLAY_MS)
		return () => clearInterval(id)
	}, [slidesToShow])

	// Применяем transform; при достижении конца цикла — мгновенный сброс для бесконечности
	useEffect(() => {
		const track = trackRef.current
		if (!track) return

		if (currentIndex >= SLIDES.length) {
			track.style.transition = 'none'
			track.style.transform = 'translateX(0px)'
			const t = setTimeout(() => {
				setCurrentIndex(0)
				track.style.transition = ''
			}, 0)
			return () => clearTimeout(t)
		}

		track.style.transform = `translateX(${-currentIndex * oneSlideStep}px)`
	}, [currentIndex, oneSlideStep])

	const isSingleSlide = slidesToShow === 1

	return (
		<div className='slider-block'>
			<div className='slider-block-container' ref={containerRef}>
				<div
					className='slider-track-wrapper'
					style={{
						width: isSingleSlide ? SLIDE_WIDTH : '100%',
						justifyContent: isSingleSlide ? 'center' : undefined,
					}}
				>
					<div
						ref={trackRef}
						className='slider-track'
						style={{
							gap: gap,
							width: isSingleSlide ? SLIDE_WIDTH : undefined,
						}}
					>
						{SLIDES_EXTENDED.map((src, i) => (
							<div
								key={`${i}-${src}`}
								className='slider-slide'
								style={{
									flex: isSingleSlide ? 'none' : `0 0 ${SLIDE_WIDTH}px`,
									width: SLIDE_WIDTH,
									minWidth: SLIDE_WIDTH,
								}}
							>
								<img src={src} alt='' />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SliderBlock
