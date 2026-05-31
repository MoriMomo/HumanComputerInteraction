import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_MAX_AGE_SECONDS, SESSION_COOKIE_NAME } from "@/lib/auth-cookie";
import { createSessionToken } from "@/lib/auth-session";
import { validateEmail, validatePassword } from "@/lib/auth-validation";
import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import * as devUsers from "@/lib/dev-users";
import { authRateLimiter } from "@/lib/rate-limit";

export async function POST(request: Request) {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    if (!authRateLimiter.check(ip)) {
        return NextResponse.json({ error: "Too many login attempts, please try again later." }, { status: 429 });
    }

    const body = (await request.json().catch(() => null)) as
        | {
              email?: string;
              password?: string;
          }
        | null;

    const email = (body?.email || "").toString().trim().toLowerCase();
    const password = (body?.password || "").toString();

    if (!validateEmail(email) || !validatePassword(password)) {
        return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
    }

    let userRecord: { id: string; email: string; name?: string; passwordHash: string } | null = null;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            userRecord = { id: existingUser.id, email: existingUser.email, name: existingUser.name || undefined, passwordHash: existingUser.passwordHash };
        }
    } catch {
        // ignore, fallback to dev users below
    }

    if (!userRecord) {
        const existingUser = await devUsers.findUserByEmail(email);
        if (existingUser) {
            userRecord = { id: existingUser.id, email: existingUser.email, name: existingUser.name || undefined, passwordHash: existingUser.passwordHash };
        }
    }

    if (!userRecord) {
        return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const isValidPassword = await verifyPassword(password, userRecord.passwordHash);
    if (!isValidPassword) {
        return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = createSessionToken({ id: userRecord.id, email: userRecord.email, name: userRecord.name || undefined });

    const response = NextResponse.json({ success: true, user: { id: userRecord.id, email: userRecord.email, name: userRecord.name || undefined } }, { status: 200 });

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
