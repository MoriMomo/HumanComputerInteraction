import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_MAX_AGE_SECONDS, SESSION_COOKIE_NAME } from "@/lib/auth-cookie";
import { createSessionToken } from "@/lib/auth-session";
import { validateEmail, validateName, validatePassword } from "@/lib/auth-validation";
import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import * as devUsers from "@/lib/dev-users";
import { authRateLimiter } from "@/lib/rate-limit";

export async function POST(request: Request) {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    if (!authRateLimiter.check(ip)) {
        return NextResponse.json({ error: "Too many signup attempts, please try again later." }, { status: 429 });
    }

    const body = (await request.json().catch(() => null)) as
        | {
              name?: string;
              email?: string;
              password?: string;
          }
        | null;

    const name = (body?.name || "").toString().trim();
    const email = (body?.email || "").toString().trim().toLowerCase();
    const password = (body?.password || "").toString();

    if (!validateName(name) || !validateEmail(email) || !validatePassword(password)) {
        return NextResponse.json({ error: "Invalid signup data." }, { status: 400 });
    }

    let createdUser: { id: string; email: string; name?: string } | null = null;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "Email is already registered." }, { status: 409 });
        }

        const passwordHash = await hashPassword(password);
        const u = await prisma.user.create({ data: { name, email, passwordHash } });
        createdUser = { id: u.id, email: u.email, name: u.name || undefined };
    } catch {
        const existingUser = await devUsers.findUserByEmail(email);
        if (existingUser) {
            return NextResponse.json({ error: "Email is already registered." }, { status: 409 });
        }
        const passwordHash = await hashPassword(password);
        const u = await devUsers.createUser(name || undefined, email, passwordHash);
        createdUser = { id: u.id, email: u.email, name: u.name || undefined };
    }

    const token = createSessionToken({ id: createdUser.id, email: createdUser.email, name: createdUser.name || undefined });

    const response = NextResponse.json({ success: true, user: createdUser }, { status: 201 });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: SESSION_COOKIE_MAX_AGE_SECONDS,
    });

    return response;
}
