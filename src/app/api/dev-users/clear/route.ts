import { NextResponse } from "next/server";
import * as devUsers from "@/lib/dev-users";

function allowed() {
    return process.env.NODE_ENV !== "production" || process.env.ENABLE_DEV_AUTH === "true";
}

export async function POST() {
    if (!allowed()) {
        return NextResponse.json({ message: "Not allowed" }, { status: 403 });
    }

    await devUsers.clearUsers();
    return NextResponse.json({ message: "cleared" });
}
