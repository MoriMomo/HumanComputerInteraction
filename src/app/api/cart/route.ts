import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth-cookie";
import { readSessionToken } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/data/products";

interface CartMutationBody {
    slug?: string;
    color?: string;
    quantity?: number;
}

function getProduct(slug: string) {
    return PRODUCTS.find((entry) => entry.slug === slug);
}

function toResponseItem(entry: { slug: string; color: string | null; quantity: number }) {
    const product = getProduct(entry.slug);
    if (!product) {
        return null;
    }

    return {
        slug: entry.slug,
        name: product.name,
        price: product.price,
        quantity: entry.quantity,
        color: entry.color || undefined,
        imageSrc: product.image?.src,
    };
}

async function getAuthenticatedUserId() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const sessionUser = readSessionToken(token);

    return sessionUser?.id || null;
}

async function getCartResponse(userId: string) {
    const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        select: {
            slug: true,
            color: true,
            quantity: true,
        },
    });

    return NextResponse.json({
        items: cartItems
            .map((entry) => toResponseItem(entry))
            .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)),
    });
}

export async function GET() {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    return getCartResponse(userId);
}

export async function POST(request: Request) {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);

    if (Array.isArray(body)) {
        const items = body as CartMutationBody[];

        await prisma.$transaction(async (tx) => {
            // Optimization: Fetch all existing items for this user in one query to avoid N+1 inside transaction
            const existingItems = await tx.cartItem.findMany({
                where: { userId },
            });

            const existingMap = new Map(
                existingItems.map((item) => [`${item.slug}:${item.color ?? ""}`, item])
            );

            for (const item of items) {
                const slug = item.slug?.trim() || "";
                const color = item.color?.trim() || null;
                const quantity = Number.isFinite(item.quantity) ? Math.floor(item.quantity as number) : 1;

                if (!getProduct(slug) || quantity < 1) {
                    continue;
                }

                const existing = existingMap.get(`${slug}:${color ?? ""}`);

                if (existing) {
                    await tx.cartItem.update({
                        where: { id: existing.id },
                        data: { quantity: existing.quantity + quantity },
                    });
                } else {
                    await tx.cartItem.create({
                        data: { userId, slug, color, quantity },
                    });
                }
            }
        });

        return getCartResponse(userId);
    }

    const bodyItem = body as CartMutationBody | null;
    const slug = bodyItem?.slug?.trim() || "";
    const color = bodyItem?.color?.trim() || null;
    const quantity = Number.isFinite(bodyItem?.quantity) ? Math.floor(bodyItem?.quantity as number) : 1;

    const product = getProduct(slug);
    if (!product) {
        return NextResponse.json({ message: "Invalid product." }, { status: 400 });
    }

    if (quantity < 1) {
        return NextResponse.json({ message: "Quantity must be at least 1." }, { status: 400 });
    }

    const existing = await prisma.cartItem.findFirst({
        where: { userId, slug, color },
    });

    if (existing) {
        await prisma.cartItem.update({
            where: { id: existing.id },
            data: { quantity: existing.quantity + quantity },
        });
    } else {
        await prisma.cartItem.create({
            data: { userId, slug, color, quantity },
        });
    }

    return getCartResponse(userId);
}

export async function PUT(request: Request) {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const body = (await request.json().catch(() => null)) as CartMutationBody | null;
    const slug = body?.slug?.trim() || "";
    const color = body?.color?.trim() || null;
    const quantity = Number.isFinite(body?.quantity) ? Math.floor(body?.quantity as number) : 0;

    const product = getProduct(slug);
    if (!product) {
        return NextResponse.json({ message: "Invalid product." }, { status: 400 });
    }

    const existing = await prisma.cartItem.findFirst({
        where: {
            userId,
            slug,
            color,
        },
    });

    if (!existing) {
        return getCartResponse(userId);
    }

    if (quantity <= 0) {
        await prisma.cartItem.delete({ where: { id: existing.id } });
        return getCartResponse(userId);
    }

    await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity },
    });

    return getCartResponse(userId);
}

export async function DELETE(request: Request) {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const body = (await request.json().catch(() => null)) as CartMutationBody | null;
    const slug = body?.slug?.trim();
    const color = body?.color?.trim() || null;

    if (!slug) {
        await prisma.cartItem.deleteMany({ where: { userId } });
        return NextResponse.json({ items: [] });
    }

    await prisma.cartItem.deleteMany({
        where: {
            userId,
            slug,
            color,
        },
    });

    return getCartResponse(userId);
}
