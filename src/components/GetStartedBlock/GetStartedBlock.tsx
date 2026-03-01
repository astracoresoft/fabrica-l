'use client'

import { useState, useEffect, useRef } from 'react'

import { useLocale } from '@/context/LocaleContext'
import './style.css'

const GetStartedBlock = () => {
	const { t } = useLocale()
	const [runAnimation, setRunAnimation] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!ref.current) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return
				setRunAnimation(true)
			},
			{ threshold: 0.2 }
		)
		observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])

	return (
		<div ref={ref} className='get-started-block'>
			<div className='get-started-block-container'>
				<div className='get-started-block-content'>
					<div
						className={`get-started-block-text-wrap${runAnimation ? ' get-started-block-text-wrap--in-view' : ''}`}
					>
						<div className='get-started-block-overlay' aria-hidden />
						<p>{t('getStarted.line1')},</p>
						<br />
						<p className='get-started-block-highlight'>
							{t('getStarted.line2')}
						</p>
					</div>
					<button type='button' className='get-started-block-cta'>
						{t('getStarted.cta')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default GetStartedBlock
