import { test, describe, it } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { createSessionToken, readSessionToken } from "./auth-session.ts";

function sign(payloadB64: string) {
    const secret = process.env.AUTH_SESSION_SECRET?.trim();
    if (!secret) throw new Error("AUTH_SESSION_SECRET environment variable is required.");
    return createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

function toBase64Url(value: string) {
    return Buffer.from(value, "utf8").toString("base64url");
}

describe("auth-session", () => {
    it("should create and read a session token", () => {
        const user = { id: "1", email: "test@example.com", name: "Test User" };
        const token = createSessionToken(user);
        const decoded = readSessionToken(token);

        assert.ok(decoded);
        assert.equal(decoded.id, user.id);
        assert.equal(decoded.email, user.email);
        assert.equal(decoded.name, user.name);
    });

    it("should return null for invalid token", () => {
        assert.equal(readSessionToken("invalid.token"), null);
    });

    it("should throw error if secret is missing", () => {
        const originalSecret = process.env.AUTH_SESSION_SECRET;
        delete process.env.AUTH_SESSION_SECRET;
        try {
            assert.throws(() => createSessionToken({ id: "1", email: "test@example.com" }), /AUTH_SESSION_SECRET environment variable is required/);
        } finally {
            process.env.AUTH_SESSION_SECRET = originalSecret;
        }
    });

    it("should return null for malformed JSON payload", () => {
        const payloadB64 = toBase64Url("invalid json {");
        const signature = sign(payloadB64);
        const token = `${payloadB64}.${signature}`;

        assert.equal(readSessionToken(token), null);
    });

    it("should return null for expired token", () => {
        const payload = {
            id: "1",
            email: "test@example.com",
            name: "Test User",
            exp: Date.now() - 1000 // Expired 1 second ago
        };
        const payloadB64 = toBase64Url(JSON.stringify(payload));
        const signature = sign(payloadB64);
        const token = `${payloadB64}.${signature}`;

        assert.equal(readSessionToken(token), null);
    });
});
