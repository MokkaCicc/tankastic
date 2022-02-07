// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isEmailUsed } from '../../../helpers/api/validate'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<User>
) {
	const id = Number(req.query.id)
	const { name, email, password } = req.body
	const prisma = new PrismaClient()
	const user = await prisma.user.findUnique({
		where: {
			id: id
		}
	})

	switch(req.method) {
		case 'GET':
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).end(`User With ID ${id} Not Found`)
			}
			break
		case 'PUT':
			if (user) {
				const updatedUser = await prisma.user.update({
					where: {
						id: id
					},
					data: {
						name: name,
						email: email,
						password: password
					}
				})
				res.status(200).json(updatedUser)
			} else {
				if (email === undefined || name === undefined) {
					res.status(400).end("The Request Body Is Missing Information")
				} else if (await isEmailUsed(email)) {
					res.status(409).end(`The Email ${email} Is Already Used`)
				} else {
					const newUser = await prisma.user.create({
						data: {
							name: name,
							email: email,
							password: password
						}
					})
					res.status(200).json(newUser)
				}
			}
			break
		case 'DELETE':
			if (user) {
				const deletedUser = await prisma.user.delete({
				where: {
					id: id
					}
				})
				res.status(200).json(deletedUser)
			} else {
				res.status(404).end(`User With ID ${id} Not Found`)
			}
			break
		default:
			res.status(405).end(`Method ${req.method} Not Allowed`)
			break
	}
}
