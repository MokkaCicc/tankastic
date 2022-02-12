import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isEmailUsed } from '../../../helpers/api/validate'
import PrismaInstance from '../../../helpers/prismaInstance'


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<User>
) {
	if (req.method !== 'PUT') {
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}

	const body = JSON.parse(req.body)
	if (body.name === undefined) {
		res.status(400).end("The Request Body Is Missing Information: name")
		return
	}
	if (body.email === undefined) {
		res.status(400).end("The Request Body Is Missing Information: email")
		return
	}
	if (await isEmailUsed(body.email)) {
		res.status(409).end(`The Email ${body.email} Is Already Used`)
		return
	}

	const prisma = PrismaInstance.get()
	const newUser = await prisma.user.create({
		data: {
			name: body.name,
			email: body.email
		}
	})
	res.status(200).json(newUser)
}