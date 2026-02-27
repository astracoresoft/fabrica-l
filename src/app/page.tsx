import type { Metadata } from 'next'

import {
	VideoBlock,
	AboutBlock,
	MetricBlock,
	LocationsBlock,
	GetStartedBlock,
	TeamBlock,
	ContactsBlock,
	SliderBlock,
} from '@/components'
import { SITE_URL } from '@/config/site'

export const metadata: Metadata = {
	title: 'Головна — Фотостудія та креативний хаб',
	description:
		'Fabrica L — креативний хаб у Дніпрі. Фотосесії, оренда простору, резидентство. Про проект, команда, контакти.',
	openGraph: {
		url: SITE_URL,
		title: 'Fabrica L — Фотостудія та креативний хаб, Дніпро',
	},
	alternates: {
		canonical: SITE_URL,
	},
}

export default function Home() {
	return (
		<>
			<VideoBlock />
			<AboutBlock />
			<MetricBlock />
			<LocationsBlock />
			<GetStartedBlock />
			<TeamBlock />
			<ContactsBlock />
			<SliderBlock />
		</>
	)
}
