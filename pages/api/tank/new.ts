import { Tank } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import PrismaInstance from '../../../helpers/prismaInstance'


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Tank>
) {
	if (req.method !== 'POST') {
		res.status(405).end(`Method ${req.method} Not Allowed`)
		return
	}

	const body = JSON.parse(req.body)
	const checks = ['x', 'y', 'userId']
	for (let check of checks) {
		if (body[check] === undefined) {
			res.status(400).end(`The Request Body Is Missing Information: ${check}`)
			return
		}
	}

	const prisma = PrismaInstance.get()
	const tankUser = await prisma.user.findUnique({
		where: {
			id: body.userId
		}
	})
	if (!tankUser) {
		res.status(404).end(`User With ID ${body.userId} Not Found`)
		return
	}

	const newTank = await prisma.tank.create({
		data: {
			x: body.x,
			y: body.y,
			user: {
				connect: { id: body.userId }
			}
		}
	})
	res.status(200).json(newTank)
}