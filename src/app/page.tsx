import { VideoBlock, AboutBlock } from '@/components'

export default function Home() {
	return (
		<>
			<VideoBlock />
			<div style={{ height: '1000px', backgroundColor: '#ccc' }}></div>
			<AboutBlock />
		</>
	)
}
