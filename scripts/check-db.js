/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

async function main() {
    const prisma = new PrismaClient();
    try {
        console.log('DATABASE_URL=', process.env.DATABASE_URL);
        const users = await prisma.user.findMany({ take: 1 });
        console.log('Successfully queried user table, sample rows:', users.length);
    } catch (err) {
        console.error('Prisma error:', err.message || err);
        process.exitCode = 2;
    } finally {
        await prisma.$disconnect();
    }
}

main();
