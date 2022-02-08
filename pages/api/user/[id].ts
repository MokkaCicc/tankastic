import { PrismaClient, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isEmailUsed } from '../../../helpers/api/validate'


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<User>
) {
	const id = Number(req.query.id)
	const prisma = new PrismaClient()
	const user = await prisma.user.findUnique({
		where: {
			id: id
		},
		include: {
			tank: true
		}
	})

	if (!user) {
		res.status(404).end(`User With ID ${id} Not Found`)
		await prisma.$disconnect()
		return
	}

	switch(req.method) {
		case 'GET':
			res.status(200).json(user)
			break

		case 'PUT':
			const body = JSON.parse(req.body)
			if (await isEmailUsed(body.email)) {
				res.status(409).end(`The Email ${body.email} Is Already Used`)
			}

			const updatedUser = await prisma.user.update({
				where: {
					id: id
				},
				data: {
					name: body.name,
					email: body.email
				}
			})
			res.status(200).json(updatedUser)
			break

		case 'DELETE':
			if (user.tank) {
				res.status(409).end("The User Is Linked To A Tank")
				await prisma.$disconnect()
				return
			}
			const deletedUser = await prisma.user.delete({
				where: {
					id: id
				}
			})
			res.status(200).json(deletedUser)
			break
		default:
			res.status(405).end(`Method ${req.method} Not Allowed`)
			await prisma.$disconnect()
			return
	}
	await prisma.$disconnect()
}
