'use client'

import { useLocale } from '@/context/LocaleContext'
import './style.css'

export default function LanguageSwitcher() {
	const { locale, setLocale } = useLocale()

	return (
		<div className="language-switcher" role="group" aria-label="Мова / Language">
			<button
				type="button"
				className={`language-switcher-btn ${locale === 'ua' ? 'language-switcher-btn--active' : ''}`}
				onClick={() => setLocale('ua')}
				aria-current={locale === 'ua' ? 'true' : undefined}
			>
				UA
			</button>
			<span className="language-switcher-sep" aria-hidden />
			<button
				type="button"
				className={`language-switcher-btn ${locale === 'en' ? 'language-switcher-btn--active' : ''}`}
				onClick={() => setLocale('en')}
				aria-current={locale === 'en' ? 'true' : undefined}
			>
				EN
			</button>
		</div>
	)
}
