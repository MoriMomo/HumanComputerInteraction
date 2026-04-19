import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_MAX_AGE_SECONDS, SESSION_COOKIE_NAME } from "@/lib/auth-cookie";
import { createSessionToken } from "@/lib/auth-session";
import { validateEmail, validateName, validatePassword } from "@/lib/auth-validation";
import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const body = (await request.json().catch(() => null)) as
        | {
            name?: string;
            email?: string;
            password?: string;
        }
        | null;

    const name = body?.name?.trim() || "";
    const email = body?.email?.trim().toLowerCase() || "";
    const password = body?.password || "";

    if (!validateName(name)) {
        return NextResponse.json({ message: "Please enter a valid name." }, { status: 400 });
    }

    if (!validateEmail(email) || !validatePassword(password)) {
        return NextResponse.json({ message: "Invalid email or password." }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return NextResponse.json({ message: "Email is already registered." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
        },
    });

    const token = createSessionToken({
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name || undefined,
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
            id: createdUser.id,
            email: createdUser.email,
            name: createdUser.name || undefined,
        },
    });
}
