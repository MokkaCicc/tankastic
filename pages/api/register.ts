import { PrismaClient, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<User>
) {
	const prisma = new PrismaClient()
	const { name, email, password } = req.body
	const user = await prisma.user.create({
		data: {
			name: name,
			email: email,
			password: password
		}
	})

	res.status(200).json(user)
}