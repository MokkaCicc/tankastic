import { PrismaClient, Tank } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	_: NextApiRequest,
	res: NextApiResponse<Tank[]>
) {
	const prisma = new PrismaClient()
	const tanks = await prisma.tank.findMany()

	res.status(200).json(tanks)
}