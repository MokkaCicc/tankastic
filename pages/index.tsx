import { PrismaClient, Tank } from '@prisma/client'
import Link from 'next/link'
import Map from '../components/map'

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
	const prisma = new PrismaClient()
	const tanks = await prisma.tank.findMany()

	return {
		props: { tanks }
	}
}
