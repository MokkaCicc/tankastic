import { PrismaClient, Tank } from '@prisma/client'
import Map from '../components/map'

export default function Home(props: { tanks: Tank[] }) {
	return (
		<Map cols={20} rows={15} tanks={props.tanks} />
	)
}

export async function getStaticProps() {
	const prisma = new PrismaClient()
	const tanks = await prisma.tank.findMany()

	return {
		props: { tanks }
	}
}
