import { Instagram, Facebook } from 'lucide-react'
import { FaTelegram } from 'react-icons/fa'
import './style.css'

type ContactCard = {
	title: string
	subtitle: string
	href: string
	icon: 'instagram' | 'facebook' | 'telegram'
}

const CONTACT_CARDS: ContactCard[] = [
	{
		title: 'Instagram',
		subtitle: 'дивіться наші фото',
		href: 'https://www.instagram.com/fabrica.l.dp/',
		icon: 'instagram',
	},
	{
		title: 'Facebook',
		subtitle: 'додавайте в друзі',
		href: 'https://www.facebook.com/DniproFabricaL',
		icon: 'facebook',
	},
	{
		title: 'Telegram',
		subtitle: 'отримуйте більше',
		href: 'https://t.me/FabricaL_bot',
		icon: 'telegram',
	},
]

const ContactIcon = ({ type }: { type: ContactCard['icon'] }) => {
	const className = 'contacts-block-card-icon'
	const size = 40
	switch (type) {
		case 'instagram':
			return <Instagram className={className} height={size} />
		case 'facebook':
			return <Facebook className={className} height={size} />
		case 'telegram':
			return <FaTelegram className={className} size={size} />
	}
}

const ContactsBlock = () => (
	<div id='contacts' className='contacts-block'>
		<div className='contacts-block-container'>
			<div className='contacts-block-title-wrap'>
				<h1 className='contacts-block-title'>контактуйте з нами</h1>
			</div>
			<div className='contacts-block-cards'>
				{CONTACT_CARDS.map((card, index) => (
					<a
						key={index}
						href={card.href}
						target='_blank'
						rel='noopener noreferrer'
						className={`contacts-block-card${card.icon === 'facebook' ? ' contacts-block-card--facebook' : ''}`}
					>
						<div className='contacts-block-card-icon-wrap'>
							<ContactIcon type={card.icon} />
						</div>
						<h3 className='contacts-block-card-title'>{card.title}</h3>
						<h4 className='contacts-block-card-subtitle'>{card.subtitle}</h4>
					</a>
				))}
			</div>
		</div>
	</div>
)

export default ContactsBlock
