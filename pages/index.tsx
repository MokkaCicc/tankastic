import { Tank } from '@prisma/client'
import NavBar from '../components/navbar'
import Map from '../components/map'
import PrismaInstance from '../helpers/prismaInstance'


export default function Home(props: { tanks: Tank[] }) {
	return (
		<>
			<NavBar />
			<Map cols={20} rows={15} tanks={props.tanks} />
		</>
	)
}

export async function getStaticProps() {
	const prisma = PrismaInstance.get()
	const tanks = await prisma.tank.findMany()

	return {
		props: { tanks }
	}
}
