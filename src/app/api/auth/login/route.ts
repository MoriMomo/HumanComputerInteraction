import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_MAX_AGE_SECONDS, SESSION_COOKIE_NAME } from "@/lib/auth-cookie";
import { createSessionToken } from "@/lib/auth-session";
import { validateEmail, validatePassword } from "@/lib/auth-validation";
import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { authRateLimiter } from "@/lib/rate-limit";

export async function POST(request: Request) {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    if (!authRateLimiter.check(ip)) {
        return NextResponse.json({ message: "Too many login attempts, please try again later." }, { status: 429 });
    }

    const body = (await request.json().catch(() => null)) as
        | {
            email?: string;
            password?: string;
        }
        | null;

    const email = body?.email?.trim().toLowerCase() || "";
    const password = body?.password || "";

    if (!validateEmail(email) || !validatePassword(password)) {
        return NextResponse.json({ message: "Invalid email or password." }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    const isValidPassword = await verifyPassword(password, existingUser.passwordHash);
    if (!isValidPassword) {
        return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    const token = createSessionToken({
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name || undefined,
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: SESSION_COOKIE_MAX_AGE_SECONDS,
    });

    return NextResponse.json({
        user: {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name || undefined,
        },
    });
}
