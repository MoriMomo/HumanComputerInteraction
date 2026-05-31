import fs from "fs/promises";
import path from "path";

export type DevUser = {
    id: string;
    name?: string;
    email: string;
    passwordHash: string;
};

const dataPath = path.join(process.cwd(), "src", "data", "dev-users.json");

async function ensureFile() {
    try {
        await fs.mkdir(path.dirname(dataPath), { recursive: true });
        await fs.stat(dataPath);
    } catch {
        await fs.writeFile(dataPath, "[]", "utf8");
    }
}

async function readUsers(): Promise<DevUser[]> {
    await ensureFile();
    const raw = await fs.readFile(dataPath, "utf8");
    try {
        return JSON.parse(raw) as DevUser[];
    } catch {
        return [];
    }
}

async function writeUsers(users: DevUser[]) {
    await ensureFile();
    await fs.writeFile(dataPath, JSON.stringify(users, null, 2), "utf8");
}

export async function findUserByEmail(email: string): Promise<DevUser | null> {
    const users = await readUsers();
    return users.find((u) => u.email === email) ?? null;
}

export async function createUser(name: string | undefined, email: string, passwordHash: string) {
    const users = await readUsers();
    const id = `dev-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const user: DevUser = { id, name, email, passwordHash };
    users.push(user);
    await writeUsers(users);
    return user;
}

export async function listUsers() {
    return readUsers();
}

export async function clearUsers() {
    await writeUsers([]);
}

const defaultExport = { findUserByEmail, createUser, listUsers };
export default defaultExport;
