import { PrismaClient, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<User[]>
) {
	if (req.method !== 'GET') {
		res.status(405).end(`Method ${req.method} Not Allowed`)
		return
	}

	const prisma = new PrismaClient()
	const users = await prisma.user.findMany()
	res.status(200).json(users)
	await prisma.$disconnect()
}
