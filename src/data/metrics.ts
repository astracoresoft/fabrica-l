import metricsData from './metrics.json'

export type Locale = 'ua' | 'en'

type MetricItemRaw = {
	number: number
	text: string
	text_en?: string
	image: string
}

export type MetricItem = {
	number: number
	text: string
	image: string
}

const itemsRaw: MetricItemRaw[] = metricsData.items as MetricItemRaw[]

export function getMetrics(locale: Locale = 'ua'): MetricItem[] {
	return itemsRaw.map((m) => ({
		number: m.number,
		text: locale === 'en' && m.text_en ? m.text_en : m.text,
		image: m.image,
	}))
}
