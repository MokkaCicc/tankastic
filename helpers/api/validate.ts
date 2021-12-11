import { PrismaClient } from "@prisma/client";

export async function isEmailUsed(email: string): Promise<boolean> {
	const prisma = new PrismaClient()
	const user = await prisma.user.findUnique({
		where: {
			email: email
		}
	})
	return Boolean(user)
}