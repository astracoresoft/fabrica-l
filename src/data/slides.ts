import slidesData from './slides.json'

const slides: string[] = slidesData.slides as string[]

export function getSlides(): string[] {
	return slides
}
