import { SITE_NAME, SITE_URL, SITE_DEFAULT_DESCRIPTION } from '@/config/site'

const organizationSchema = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: SITE_NAME,
	url: SITE_URL,
	description: SITE_DEFAULT_DESCRIPTION,
	logo: `${SITE_URL}/logo-header.webp`,
	image: `${SITE_URL}/logo-header.webp`,
}

export default function JsonLd() {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(organizationSchema),
			}}
		/>
	)
}
