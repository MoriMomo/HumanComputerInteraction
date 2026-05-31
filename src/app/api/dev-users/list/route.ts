import { NextResponse } from "next/server";
import * as devUsers from "@/lib/dev-users";

function allowed() {
    return process.env.NODE_ENV !== "production" || process.env.ENABLE_DEV_AUTH === "true";
}

export async function GET() {
    if (!allowed()) {
        return NextResponse.json({ message: "Not allowed" }, { status: 403 });
    }

    const users = await devUsers.listUsers();
    return NextResponse.json({ users });
}
