import Link from 'next/link'
import './style.css'

const AboutBlock = () => {
	return (
		<div id='about' className='about-block'>
			<div className='about-block-container'>
				<div className='about-block-hero'>
					<div>
						<h2 className='about-block-title'>про проект</h2>
						<span className='about-block-intro'>
							Fabrica L — креативний хаб для бизнеса та івентів. <br />
							<br /> Об'єднуючи представників креативних індустрій, ми створюємо
							нове творче ком'юніті у Дніпрі. <br />
							<br /> Ми ревіталізуємо колишню Фабрику головних уборів у Дніпрі і
							надаємо цій будівлі нової функції, зберігаючі індустріальну
							естетику. <br />
							<br /> На площі в понад 11 тис. кв. м створюємо умови для
							комерційних та соціальних ініціатив, націлених на розвиток нової
							економіки, сучасного мистецтва, неформальної освіти тощо. <br />
							<br /> Fabrica L — найбільший подібний центр у Дніпровському
							регіоні.
						</span>
					</div>
					<img
						src='/evening-fabrica.webp'
						alt='Evening Fabrica'
						className='about-block-image'
					/>
				</div>
				<div className='about-block-cards'>
					<div className='about-block-card'>
						<img src="/rocket.webp" alt="Rocket" className="about-block-card-icon about-block-card-icon--rocket" />
						<div>
							<h3 className='about-block-card-title'>Стань частиною змін</h3>
							<span className='about-block-card-desc'>
								Fabrica L це ідея перезавантаження, місце для самореалізації
								людей та причина, щоб залишатися в місті.
							</span>
						</div>
					</div>
					<div className='about-block-card'>
						<img src="/message.webp" alt="Message" className="about-block-card-icon about-block-card-icon--message" />
						<div>
							<h3 className='about-block-card-title'>Знайди однодумців</h3>
							<span className='about-block-card-desc'>
								Проект об'єднує спільноту людей зі схожими цінностями, стимулює
								разом знаходити рішення проблем, надає доступ до талантів та
								унікальної експертизи.
							</span>
						</div>
					</div>
				</div>
				<div className='about-block-cta-wrap'>
					<Link href='/rents' className='about-block-cta'>
						оренда приміщення
					</Link>
				</div>
			</div>
		</div>
	)
}

export default AboutBlock
