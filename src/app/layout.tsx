import './globals.css'
import type { Metadata } from 'next'

import Header from '@/layout/Header'

export const metadata: Metadata = {
	title: 'Fabrica L - Фотостудия',
	description:
		'Профессиональная фотостудия Fabrica L. Фотосессии, портреты, коммерческая фотография. Команда профессионалов.',
	keywords: [
		'фотостудия',
		'фотосессия',
		'портрет',
		'коммерческая фотография',
		'Fabrica L',
	],
	authors: [{ name: 'Fabrica L' }],
	openGraph: {
		title: 'Fabrica L - Фотостудия',
		description:
			'Профессиональная фотостудия Fabrica L. Фотосессии, портреты, коммерческая фотография.',
		type: 'website',
		locale: 'ru_RU',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<head>
				<link rel='icon' href='/favicon.ico' />
			</head>
			<body>
				<Header />
				{children}
			</body>
		</html>
	)
}
