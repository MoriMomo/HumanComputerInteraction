require('dotenv').config();
const { hash } = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs/promises');
const path = require('path');

const prisma = new PrismaClient();

async function seed() {
  const email = process.env.DEV_SEED_EMAIL || 'john@example.com';
  const password = process.env.DEV_SEED_PASSWORD || 'password123';
  const name = process.env.DEV_SEED_NAME || 'John Doe';

  const passwordHash = await hash(password, 12);

  try {
    // Try to create in Prisma DB first
    const existing = await prisma.user.findUnique({ where: { email } }).catch(() => null);
    if (existing) {
      console.log('Dev user already exists in Prisma DB:', existing.email);
      return;
    }

    const created = await prisma.user.create({ data: { name, email, passwordHash } });
    console.log('Created dev user in Prisma DB:', created.email);
  } catch (err) {
    // Fallback to file-based dev users
    try {
      const dataPath = path.join(process.cwd(), 'src', 'data', 'dev-users.json');
      await fs.mkdir(path.dirname(dataPath), { recursive: true });
      let raw = '[]';
      try {
        raw = await fs.readFile(dataPath, 'utf8');
      } catch {}
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
    } catch (e) {
      console.error('Failed to create dev user in fallback store:', e);
      throw e;
    }
  }
}

seed().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
