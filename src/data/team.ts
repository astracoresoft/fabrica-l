import teamData from './team.json'

export type TeamCard = {
	name: string
	image: string
	description: string
}

const cards: TeamCard[] = teamData.cards as TeamCard[]

export function getTeamCards(): TeamCard[] {
	return cards
}
