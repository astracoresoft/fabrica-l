'use client'

import { useState, useEffect, useRef } from 'react'
import './style.css'

const METRICS = [
	{ number: 100, text: 'фотоіндустрія', image: '/metric1.webp' },
	{ number: 630, text: 'it-компанії', image: '/metric2.webp' },
	{ number: 700, text: 'Міжнародна логістика', image: '/metric3.webp' },
	{ number: 700, text: 'Регіональні ЗМI', image: '/metric4.webp' },
	{ number: 250, text: "Кав'ярня та коворкінг", image: '/metric5.webp' },
	{ number: 1600, text: 'Івент-хол', image: '/metric6.webp' },
	{ number: 570, text: 'Креативні майстерні', image: '/metric7.webp' },
	{ number: 1750, text: 'Виставкові простори', image: '/metric8.webp' },
] as const

const MetricBlock = () => {
	const [displayedNumbers, setDisplayedNumbers] = useState<number[]>(
		METRICS.map(() => 0)
	)
	const [hasAnimated, setHasAnimated] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (hasAnimated) return

		const el = ref.current
		if (!el) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return
				setHasAnimated(true)
			},
			{
				threshold: 0.15,
				rootMargin: '0px 0px -50px 0px',
			}
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [hasAnimated])

	useEffect(() => {
		if (!hasAnimated) return

		const startTime = performance.now()
		const targets = METRICS.map((m) => m.number)

		const tick = (now: number) => {
			const elapsedMs = now - startTime
			const increment = Math.floor(elapsedMs / 1.5)

			setDisplayedNumbers(
				targets.map((target) => Math.min(increment, target))
			)

			const allDone = targets.every((t) => increment >= t)
			if (!allDone) requestAnimationFrame(tick)
		}

		requestAnimationFrame(tick)
	}, [hasAnimated])

	return (
		<div ref={ref} className='metric-block'>
			<div className='metric-block-container'>
				{METRICS.map(({ text, image }, index) => (
					<div
						key={index}
						className='metric-block-item'
						style={{ backgroundImage: `url(${image})` }}
					>
						<span className='metric-block-item-number'>
							{displayedNumbers[index]}
							<span className='metric-block-item-unit'>m</span>
							<sup className='metric-block-item-sup'>2</sup>
						</span>
						<span className='metric-block-item-text'>{text}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default MetricBlock
