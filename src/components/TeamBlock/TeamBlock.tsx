import './style.css'

type TeamCard = {
	name: string
	image: string
	description: string
}

const TEAM_CARDS: TeamCard[] = [
	{
		name: 'Юрiй Симонов',
		image: '/team1.webp',
		description:
			'iнiцiатор проекта. Засновник ГО "Команда Днiпра", Голова ГО "Европейське поколiння". Ідейний натхненник і меценат багатьох проектів, які роблять наше життя гідним міста Дніпро. Людина, яка увійде в історію нашого мiста!',
	},
	{
		name: 'Павліна Недзвецька',
		image: '/team2.webp',
		description:
			'Спонсор проекту. Лідер у сфері розвитку талантів та управління командами. Має 10-ти річний досвід управління бізнесами. Втілює в життя найамбітніші комунікаційні виклики проектів',
	},
	{
		name: 'Роман Лапко',
		image: '/team3.webp',
		description:
			'Архітектор проекта. Найсміливіший в місті керiвник проектів з реконструкції будівель та споруд. Відкритість, наполегливість та відповідальність - основні якісті Романа, які з легкістю реалізують всі можливі та неможливі завдання проекта',
	},
	{
		name: 'Галина Недзвецька',
		image: '/team4.webp',
		description:
			"Керівник проекту. 10-ти річний досвід успішного управління проектами від впровадження системи обліку до реконструкції історичних пам'яток архітектури. Досвід нашого керівника - це гарантія втілення основної ідеї проекту",
	},
	{
		name: 'Дмитро Деменський',
		image: '/team5.webp',
		description: 'Співавтор концепції Fabrica L',
	},
	{
		name: 'Ілля Сухіна',
		image: '/team6.webp',
		description:
			'Координатор зв‘язків з партнерами. Енергійний та ефективний, Ілля робить можливою співпрацю десятків організацій та спеціалістів заради спільної мети',
	},
	{
		name: 'Ольга Макаренко',
		image: '/team7.webp',
		description:
			'Керуюча Fabrica L. Дуже віддана та любляча Fabrica L людина Всі процеси тут знаходяться під її чуйним контролем',
	},
	{
		name: 'Катерина Танченко',
		image: '/team8.webp',
		description:
			'Головний бухгалтер. Точність, відповідальність та суттєвий досвід в роботі з різними підприємствами гарантують якісний контроль та прозору роботу проекту',
	},
	{
		name: 'Лоліта',
		image: '/team9.webp',
		description:
			'Івент-менеджер Fabrica L. Відкрита, позитивна, гостинна - Саме вона наповнює життя подіями на Fabrica L',
	},
]

const TeamBlock = () => (
	<div id='team' className='team-block'>
		<div className='team-block-container'>
			<div className='team-block-title-wrap'>
				<h1 className='team-block-title'>НАША КОМАНДА</h1>
			</div>
			<div className='team-block-cards'>
				{TEAM_CARDS.map((card, index) => (
					<div key={index} className='team-block-card'>
						<img
							src={card.image}
							alt={card.name}
							className='team-block-card-image'
						/>
						<div className='team-block-card-overlay'>
							<h3 className='team-block-card-title'>{card.name}</h3>
							<span className='team-block-card-desc'>{card.description}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	</div>
)

export default TeamBlock
