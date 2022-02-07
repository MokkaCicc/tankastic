import { PrismaClient, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<User>
) {
	const id = Number(req.query.id)
	const body = JSON.parse(req.body)

	const prisma = new PrismaClient()
	const user = await prisma.user.findUnique({
		where: {
			id: id
		}
	})

	if (!user) {
		res.status(404).end(`User With ID ${id} Not Found`)
		return
	}

	switch(req.method) {
		case 'GET':
			res.status(200).json(user)
			break
		case 'PUT':
			// TODO: fail if email already being used
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
			// TODO: fail if foreign key
			const deletedUser = await prisma.user.delete({
			where: {
				id: id
				}
			})
			res.status(200).json(deletedUser)
			break
		default:
			res.status(405).end(`Method ${req.method} Not Allowed`)
			break
	}
}
