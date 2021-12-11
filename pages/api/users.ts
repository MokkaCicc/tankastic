import { PrismaClient, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	_: NextApiRequest,
	res: NextApiResponse<User[]>
) {
	const prisma = new PrismaClient()
	const users = await prisma.user.findMany()

	res.status(200).json(users)
}
