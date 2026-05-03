import { createHmac } from "node:crypto";

export interface SessionUser {
    id: string;
    email: string;
    name?: string;
}

interface SessionPayload extends SessionUser {
    exp: number;
}

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function getSessionSecret() {
    const secret = process.env.AUTH_SESSION_SECRET?.trim();

    if (!secret) {
        throw new Error("AUTH_SESSION_SECRET environment variable is required.");
    }

    return secret;
}

function toBase64Url(value: string) {
    return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value: string) {
    return Buffer.from(value, "base64url").toString("utf8");
}

function sign(payloadB64: string) {
    return createHmac("sha256", getSessionSecret()).update(payloadB64).digest("base64url");
}

export function createSessionToken(user: SessionUser) {
    const payload: SessionPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        exp: Date.now() + SESSION_TTL_MS,
    };

    const payloadB64 = toBase64Url(JSON.stringify(payload));
    const signature = sign(payloadB64);

    return `${payloadB64}.${signature}`;
}

export function readSessionToken(token: string | undefined): SessionUser | null {
    if (!token) {
        return null;
    }

    const [payloadB64, signature] = token.split(".");

    if (!payloadB64 || !signature || sign(payloadB64) !== signature) {
        return null;
    }

    try {
        const payload = JSON.parse(fromBase64Url(payloadB64)) as SessionPayload;

        if (!payload.id || !payload.email || payload.exp <= Date.now()) {
            return null;
        }

        return {
            id: payload.id,
            email: payload.email,
            name: payload.name,
        };
    } catch {
        return null;
    }
}
