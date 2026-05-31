import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth-cookie";
import { readSessionToken } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const sessionUser = readSessionToken(token);

    if (!sessionUser) {
        return NextResponse.json({ user: null });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { id: sessionUser.id },
            select: { id: true, email: true, name: true },
        });

        if (!existingUser) {
            return NextResponse.json({ user: null });
        }

        return NextResponse.json({ user: existingUser });
    } catch {
        // If the database/table isn't available (e.g. local dev without migrations),
        // return `null` instead of crashing the route. This keeps the app usable
        // while encouraging running Prisma migrations or `prisma db push`.
        return NextResponse.json({ user: null });
    }
}
