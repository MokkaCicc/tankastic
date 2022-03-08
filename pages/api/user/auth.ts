import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaInstance from '../../../helpers/prismaInstance';


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		res.status(405).end(`Method ${req.method} Not Allowed`)
		return
	}

	const body = req.body
	const checks = ['email', 'password']
	for (let check of checks) {
		if (body[check] === undefined) {
			res.status(400).end(`The Request Body Is Missing Information: ${check}`)
			return
		}
	}

	const prisma = PrismaInstance.get()
	const user = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	})

	if (!user) {
		res.status(401).end(`Incorrect Email`)
		return
	}

	const salt = bcrypt.getSalt(user.hash)
	const hash = await bcrypt.hash(body.password, salt)
	// BUG: `bcrypt.compareSync` always return false, I don't know why.
	if (hash !== user.hash) {
		res.status(401).end(`Incorrect Password`)
		return
	}

	console.log("success")
	res.status(200).json({
		id: user.id,
		name: user.name
	})
}