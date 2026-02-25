'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'

type Props = { slides: string[] }

export function SliderBlockSwiper({ slides }: Props) {
	return (
		<Swiper
			className='slider-block-swiper'
			modules={[Autoplay]}
			spaceBetween={40}
			slidesPerView={4}
			loop
			autoplay={{
				delay: 5000,
				disableOnInteraction: false,
				waitForTransition: true,
			}}
			onSwiper={(swiper: SwiperType) => {
				swiper.autoplay?.start()
			}}
			speed={600}
			breakpoints={{
				0: {
					slidesPerView: 1,
					spaceBetween: 0,
					centeredSlides: true,
				},
				501: {
					slidesPerView: 2,
					spaceBetween: 40,
					centeredSlides: false,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 40,
				},
				1024: {
					slidesPerView: 4,
					spaceBetween: 40,
				},
			}}
		>
			{slides.map((src, i) => (
				<SwiperSlide key={i} className='slider-block-slide'>
					<img src={src} alt={`Slide ${i + 1}`} />
				</SwiperSlide>
			))}
		</Swiper>
	)
}
