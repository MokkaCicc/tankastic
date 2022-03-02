import PrismaInstance from "../prismaInstance";


export async function isEmailUsed(email: string): Promise<boolean> {
	const prisma = PrismaInstance.get()
	const user = await prisma.user.findUnique({
		where: {
			email: email
		}
	})
	return Boolean(user)
}