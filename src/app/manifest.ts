import type { MetadataRoute } from 'next'
import { SITE_NAME, SITE_URL, SITE_DEFAULT_DESCRIPTION } from '@/config/site'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_NAME,
		short_name: SITE_NAME,
		description: SITE_DEFAULT_DESCRIPTION,
		start_url: SITE_URL,
		display: 'standalone',
		background_color: '#000000',
		theme_color: '#FFBF00',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
				purpose: 'any',
			},
		],
	}
}
