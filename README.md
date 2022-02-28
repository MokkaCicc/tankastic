## Tankastic

This is a web version of the game `Tank Tactics`, inspired from this [People Make Game video](https://www.youtube.com/watch?v=aOYbR-Q_4Hs).


## Stack
The current stack used is:
 - [NextJS](https://nextjs.org/) w/ Typescript
 - [React](https://reactjs.org/)
 - [Prisma](https://www.prisma.io/) as an ORM
 - [SQLite](https://sqlite.org/index.html) for the database


## Getting Started

First, clone the project and install all dependencies:
```bash
git clone https://github.com/MokkaCicc/Tankastic
cd Tankastic/
npm install
```
> Make sure to have sqlite3 installed too!

Then, create the database from the prisma migrations:
```bash
npx prisma db push
```
It will create the file `dev.db` in the `/prisma` directory.

A custom script can be call to generate fixtures:
```bash
npm run fixtures
```

Lastly, run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Working with prisma
You can easily monitor and change the database entries with prisma studio:
```bash
npx prisma studio
```
Open [http://localhost:5555/](http://localhost:5555/) to access a web version of prisma studio

If you modify the `prisma/schema.prisma` file, you will need to create a new migration:
```bash
npx prisma migrate dev --name [migration_name]
```
> The changes will not appear in prisma studio, you will need to relaunch it
