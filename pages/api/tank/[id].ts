import { PrismaClient, Tank } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Tank>
) {
	const id = Number(req.query.id)
	const body = JSON.parse(req.body)

	const prisma = new PrismaClient()
	const tank = await prisma.tank.findUnique({
		where: {
			id: id
		}
	})

	if (!tank) {
		res.status(404).end(`Tank With ID ${id} Not Found`)
		return
	}

	switch(req.method) {
		case 'GET':
			res.status(200).json(tank)
			break
		case 'PUT':
			// TODO: fail if user don't exist
			const updatedTank = await prisma.tank.update({
				where: {
					id: id
				},
				data: {
					x: body.x,
					y: body.y,
					user: {
						connect: { id: body.userId }
					}
				}
			})
			res.status(200).json(updatedTank)
			break
		case 'DELETE':
			const deletedTank = await prisma.tank.delete({
			where: {
				id: id
				}
			})
			res.status(200).json(deletedTank)
			break
		default:
			res.status(405).end(`Method ${req.method} Not Allowed`)
			break
	}
}
