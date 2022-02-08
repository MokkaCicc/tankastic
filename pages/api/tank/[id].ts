import { PrismaClient, Tank } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Tank>
) {
	const id = Number(req.query.id)
	const prisma = new PrismaClient()
	const tank = await prisma.tank.findUnique({
		where: {
			id: id
		}
	})

	if (!tank) {
		res.status(404).end(`Tank With ID ${id} Not Found`)
		await prisma.$disconnect()
		return
	}

	switch(req.method) {
		case 'GET':
			res.status(200).json(tank)
			break
		case 'PUT':
			const body = JSON.parse(req.body)
			const user = await prisma.user.findUnique({
				where: {
					id: tank.userId
				}
			})
			if (!user) {
				res.status(404).end(`User With ID ${tank.userId} Not Found`)
				await prisma.$disconnect()
				return
			}

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
			await prisma.$disconnect()
			return
	}
	await prisma.$disconnect()
}
