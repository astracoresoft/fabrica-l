import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date().toISOString()

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
		...( [1, 2, 3, 4, 5].map((level) => ({
			url: `${SITE_URL}/rents/${level}`,
			lastModified: now,
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		})) ),
	]
}
