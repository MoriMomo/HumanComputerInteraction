; (async () => {
    // dynamic imports avoid `require()` style and satisfy ESLint rules
    const dotenv = await import('dotenv');
    dotenv.config();

    const { hash } = await import('bcryptjs');
    const { PrismaClient } = await import('@prisma/client');
    const fs = await import('fs/promises');
    const path = await import('path');

    const prisma = new PrismaClient();

    const email = process.env.DEV_SEED_EMAIL || 'john@example.com';
    const password = process.env.DEV_SEED_PASSWORD || 'password123';
    const name = process.env.DEV_SEED_NAME || 'John Doe';

    const passwordHash = await hash(password, 12);

    try {
        const existing = await prisma.user.findUnique({ where: { email } }).catch(() => null);
        if (existing) {
            console.log('Dev user already exists in Prisma DB:', existing.email);
            await prisma.$disconnect();
            return;
        }

        const created = await prisma.user.create({ data: { name, email, passwordHash } });
        console.log('Created dev user in Prisma DB:', created.email);
        await prisma.$disconnect();
        return;
    } catch {
        // Fallback to file-based dev users
        try {
            const dataPath = path.join(process.cwd(), 'src', 'data', 'dev-users.json');
            await fs.mkdir(path.dirname(dataPath), { recursive: true });
            let raw = '[]';
            try {
                raw = await fs.readFile(dataPath, 'utf8');
            } catch {
                raw = '[]';
            }
            const users = JSON.parse(raw || '[]');
            const exists = users.find((u) => u.email === email);
            if (exists) {
                console.log('Dev user already exists in dev-users store:', exists.email);
                return;
            }
            const id = `dev-${Date.now()}`;
            users.push({ id, name, email, passwordHash });
            await fs.writeFile(dataPath, JSON.stringify(users, null, 2), 'utf8');
            console.log('Created dev user in dev-users store:', email);
            return;
        } catch (e) {
            console.error('Failed to create dev user in fallback store:', e);
            process.exitCode = 1;
            return;
        }
    }
})().catch((e) => {
    console.error(e);
    process.exit(1);
});
