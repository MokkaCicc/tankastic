const PrismaClient = require('@prisma/client')


const USERS = [
	{ 'name': "Whale", 'email': "whale@tankastic.com" },
	{ 'name': "Dog", 'email': "dog@tankastic.com" },
	{ 'name': "Monkey", 'email': "monkey@tankastic.com" },
	{ 'name': "Pigeon", 'email': "pigeon@tankastic.com" },
	{ 'name': "Pelican", 'email': "pelican@tankastic.com" },
]

const TANKS = [
	{ 'x': 0, 'y': 0, 'userEmail': "whale@tankastic.com" },
	{ 'x': 5, 'y': 3, 'userEmail': "dog@tankastic.com" },
	{ 'x': 8, 'y': 14, 'userEmail': "monkey@tankastic.com" },
	{ 'x': 9, 'y': 6, 'userEmail': "pigeon@tankastic.com" },
	{ 'x': 17, 'y': 8, 'userEmail': "pelican@tankastic.com" },
]

async function eraseDatabase(prisma) {
	console.log("Erasing data...")
	const users = prisma.user
	const tanks = prisma.tank
	await tanks.deleteMany({})
	await users.deleteMany({})
}

async function createUsers(prisma) {
	console.log("Creating users...")
	for (let user of USERS) {
		await prisma.user.create({
			data: {
				'name': user.name,
				'email': user.email
			}
		})
	}
}

async function createTanks(prisma) {
	console.log("Creating tanks...")
	for (let tank of TANKS) {
		await prisma.tank.create({
			data: {
				'x': tank.x,
				'y': tank.y,
				'user': {
					'connect': { email: tank.userEmail }
				}
			}
		})
	}
}

async function main() {
	const prisma = new PrismaClient.PrismaClient()
	await eraseDatabase(prisma)
	await createUsers(prisma)
	await createTanks(prisma)
}

main()