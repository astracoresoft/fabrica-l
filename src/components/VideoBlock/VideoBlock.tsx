'use client'

import { ChevronsDown } from 'lucide-react'

import './style.css'

export default function VideoBlock() {
	const handleScroll = () => {
		if (typeof window === 'undefined') return
		const offset = window.innerHeight - 60
		window.scrollBy({ top: offset, left: 0, behavior: 'smooth' })
	}

	return (
		<section className='video-block'>
			<video
				className='video-block__bg'
				src='/background-video.mp4'
				autoPlay
				muted
				loop
				playsInline
			/>

			<div className='video-block__overlay' />

			<div className='video-block__content'>
				<img src='/logo.webp' alt='Logo' className='video-block__logo' />
				<p className='video-block__text'>
					Добробут міст збільшується, коли зростає <br /> покоління культурних і
					креативних людей
				</p>
			</div>
			<ChevronsDown
				className='video-block__button'
				onClick={handleScroll}
				aria-label='Scroll down'
			/>
		</section>
	)
}
