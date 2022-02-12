import { Tank } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import PrismaInstance from '../../../helpers/prismaInstance'


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Tank>
) {
	if (req.method !== 'PUT') {
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}

	const body = JSON.parse(req.body)
	if (body.x === undefined) {
		res.status(400).end("The Request Body Is Missing Information: x")
		return
	}
	if (body.y === undefined) {
		res.status(400).end("The Request Body Is Missing Information: y")
		return
	}
	if (body.userId === undefined) {
		res.status(400).end("The Request Body Is Missing Information: userId")
		return
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