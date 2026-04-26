import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { hashPassword, verifyPassword } from "./password.ts";

describe("Password Utility", () => {
    it("should return true for a correct password", async () => {
        const plainPassword = "mySecretPassword123";
        const hash = await hashPassword(plainPassword);

        const isMatch = await verifyPassword(plainPassword, hash);
        assert.equal(isMatch, true);
    });

    it("should return false for an incorrect password", async () => {
        const plainPassword = "mySecretPassword123";
        const wrongPassword = "wrongPassword123";
        const hash = await hashPassword(plainPassword);

        const isMatch = await verifyPassword(wrongPassword, hash);
        assert.equal(isMatch, false);
    });
});
