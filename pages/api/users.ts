import type { NextApiRequest, NextApiResponse } from 'next'
import PrismaInstance from '../../helpers/prismaInstance'


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		res.status(405).end(`Method ${req.method} Not Allowed`)
		return
	}

	const prisma = PrismaInstance.get()
	const users = await prisma.user.findMany({
		select: {
			id: true,
			email: true,
			name: true
		}
	})
	res.status(200).json(users)
	await prisma.$disconnect()
}
