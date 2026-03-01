import './globals.css'
import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { Comfortaa, Montserrat_Alternates } from 'next/font/google'

import { LOCALE_COOKIE_NAME } from '@/lib/locale'
import { SITE_NAME, SITE_URL, SITE_DEFAULT_DESCRIPTION } from '@/config/site'
import { LocaleProvider } from '@/context/LocaleContext'
import Header from '@/layout/Header'
import HashScroll from '@/layout/HashScroll'
import LanguageSwitcher from '@/layout/LanguageSwitcher'
import PageSplash from '@/layout/PageSplash'
import SideIcons from '@/layout/SideIcons'
import JsonLd from '@/layout/JsonLd'

const comfortaa = Comfortaa({
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-comfortaa',
	display: 'swap',
})

const montserratAlternates = Montserrat_Alternates({
	subsets: ['latin', 'cyrillic'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-montserrat-alternates',
	display: 'swap',
})

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#FFBF00',
}

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: `${SITE_NAME} — Фотостудія та креативний хаб, Дніпро`,
		template: `%s | ${SITE_NAME}`,
	},
	description: SITE_DEFAULT_DESCRIPTION,
	keywords: [
		'фотостудія',
		'фотосесія',
		'Дніпро',
		'оренда фотостудії',
		'резидентство',
		'креативний хаб',
		'Fabrica L',
		'портрет',
		'івенти',
	],
	authors: [{ name: SITE_NAME, url: SITE_URL }],
	creator: SITE_NAME,
	publisher: SITE_NAME,
	formatDetection: { email: false, address: false, telephone: false },
	openGraph: {
		type: 'website',
		locale: 'uk_UA',
		alternateLocale: ['ru_RU'],
		siteName: SITE_NAME,
		title: `${SITE_NAME} — Фотостудія та креативний хаб`,
		description: SITE_DEFAULT_DESCRIPTION,
		url: SITE_URL,
		images: [
			{
				url: '/logo-header.webp',
				width: 156,
				height: 60,
				alt: SITE_NAME,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: `${SITE_NAME} — Фотостудія та креативний хаб`,
		description: SITE_DEFAULT_DESCRIPTION,
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
	alternates: {
		canonical: SITE_URL,
	},
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const cookieStore = await cookies()
	const locale = cookieStore.get(LOCALE_COOKIE_NAME)?.value === 'en' ? 'en' : 'ua'
	const htmlLang = locale === 'ua' ? 'uk' : 'en'

	return (
		<html lang={htmlLang} className={`${montserratAlternates.variable} ${comfortaa.variable}`}>
			<head>
				<link rel='icon' href='/favicon.ico' />
			</head>
			<body className={montserratAlternates.className}>
				<LocaleProvider>
					<JsonLd />
					<PageSplash />
					<Header />
					<HashScroll />
					<SideIcons />
					<main id="main-content">{children}</main>
					<LanguageSwitcher />
				</LocaleProvider>
			</body>
		</html>
	)
}
