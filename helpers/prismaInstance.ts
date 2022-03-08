import { PrismaClient } from '@prisma/client'

export default class PrismaInstance {
	public client: PrismaClient
	public static instance: PrismaInstance

	private constructor() {
		this.client = new PrismaClient()
	}

	public static get(): PrismaClient {
		if (!PrismaInstance.instance) {
			PrismaInstance.instance = new PrismaInstance()
		}
		return PrismaInstance.instance.client
	}
}
