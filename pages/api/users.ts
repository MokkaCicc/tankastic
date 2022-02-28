import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import PrismaInstance from '../../helpers/prismaInstance'


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<User[]>
) {
	if (req.method !== 'GET') {
		res.status(405).end(`Method ${req.method} Not Allowed`)
		return
	}

	const prisma = PrismaInstance.get()
	const users = await prisma.user.findMany()
	res.status(200).json(users)
	await prisma.$disconnect()
}
