import type { MetadataRoute } from 'next'
import { getLevels } from '@/data/levels'
import { SITE_URL } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date().toISOString()
	const levels = getLevels()

	return [
		{
			url: SITE_URL,
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${SITE_URL}/rents`,
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		...levels.map((level) => ({
			url: `${SITE_URL}/rents/${level.slug}`,
			lastModified: now,
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		})),
	]
}
