import bcrypt from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isEmailUsed } from '../../../helpers/api/validate'
import PrismaInstance from '../../../helpers/prismaInstance'


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		res.status(405).end(`Method ${req.method} Not Allowed`)
		return
	}

	const body = req.body
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

	const salt = await bcrypt.genSalt()
	const hash = await bcrypt.hash(body.password, salt)

	const prisma = PrismaInstance.get()
	const newUser = await prisma.user.create({
		data: {
			name: body.name,
			email: body.email,
			hash: hash
		}, 
		select: {
			id: true,
			email: true,
			name: true
		}
	})
	res.status(200).json(newUser)
}