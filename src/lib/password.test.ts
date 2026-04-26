import test from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword } from "./password.ts";

test("hashPassword and verifyPassword functionality", async (t) => {
    await t.test("hashPassword returns a hash different from the plain text", async () => {
        const plainText = "mySecurePassword123!";
        const hash = await hashPassword(plainText);

        assert.ok(hash, "Hash should not be empty");
        assert.notEqual(hash, plainText, "Hash should be different from plain text");
        assert.ok(hash.startsWith("$2a$") || hash.startsWith("$2b$") || hash.startsWith("$2y$"), "Hash should be a valid bcrypt format");
    });

    await t.test("hashPassword generates different hashes for the same password due to salting", async () => {
        const plainText = "mySecurePassword123!";
        const hash1 = await hashPassword(plainText);
        const hash2 = await hashPassword(plainText);

        assert.notEqual(hash1, hash2, "Hashes for the same password should be different");
    });

    await t.test("verifyPassword correctly verifies a valid password against its hash", async () => {
        const plainText = "mySecurePassword123!";
        const hash = await hashPassword(plainText);

        const isValid = await verifyPassword(plainText, hash);
        assert.equal(isValid, true, "verifyPassword should return true for correct password");
    });

    await t.test("verifyPassword rejects an invalid password", async () => {
        const plainText = "mySecurePassword123!";
        const hash = await hashPassword(plainText);

        const isValid = await verifyPassword("wrongPassword", hash);
        assert.equal(isValid, false, "verifyPassword should return false for incorrect password");
    });
});
