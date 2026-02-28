import metricsData from './metrics.json'

export type MetricItem = {
	number: number
	text: string
	image: string
}

const items: MetricItem[] = metricsData.items as MetricItem[]

export function getMetrics(): MetricItem[] {
	return items
}
