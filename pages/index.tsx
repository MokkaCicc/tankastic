import { Tank } from '@prisma/client'
import Link from 'next/link'
import Map from '../components/map'
import PrismaInstance from '../helpers/prismaInstance'


export default function Home(props: { tanks: Tank[] }) {
	return (
		<div>
			<Link href="/account/register">
				Register
			</Link>
			<Link href="/account/login">
				Login
			</Link>

			<Map cols={20} rows={15} tanks={props.tanks} />
		</div>
	)
}

export async function getStaticProps() {
	const prisma = PrismaInstance.get()
	const tanks = await prisma.tank.findMany()

	return {
		props: { tanks }
	}
}
