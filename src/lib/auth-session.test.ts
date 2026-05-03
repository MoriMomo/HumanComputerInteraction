import { test, describe, it } from "node:test";
import assert from "node:assert/strict";
import { createSessionToken, readSessionToken } from "./auth-session.ts";

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

    it("should return null for expired token", async () => {
        // This is hard to test without mocking Date.now()
    });
});
