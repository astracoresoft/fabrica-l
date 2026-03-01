'use client'

import { useState, useEffect, useRef } from 'react'

import { useLocale } from '@/context/LocaleContext'
import { getMetrics } from '@/data/metrics'
import './style.css'

const MetricBlock = () => {
	const { locale } = useLocale()
	const METRICS = getMetrics(locale)
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
