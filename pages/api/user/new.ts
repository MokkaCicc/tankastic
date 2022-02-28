import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isEmailUsed } from '../../../helpers/api/validate'
import PrismaInstance from '../../../helpers/prismaInstance'


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<User>
) {
	if (req.method !== 'POST') {
		res.status(405).end(`Method ${req.method} Not Allowed`)
		return
	}

	const body = JSON.parse(req.body)
	const checks = ['name', 'email', 'password']
	for (let check of checks) {
		if (body[check] === undefined) {
			res.status(400).end(`The Request Body Is Missing Information: ${check}`)
			return
		}
	}
	if (await isEmailUsed(body.email)) {
		res.status(409).end(`The Email ${body.email} Is Already Used`)
		return
	}

	const prisma = PrismaInstance.get()
	const newUser = await prisma.user.create({
		data: {
			name: body.name,
			email: body.email,
			password: body.password
		}
	})
	res.status(200).json(newUser)
}