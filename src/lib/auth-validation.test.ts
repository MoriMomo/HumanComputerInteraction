import { describe, it } from "node:test";
import assert from "node:assert";
import { validateEmail } from "./auth-validation.ts";

describe("validateEmail", () => {
  it("should return true for valid email addresses", () => {
    assert.strictEqual(validateEmail("test@example.com"), true);
    assert.strictEqual(validateEmail("user.name+tag@domain.co.uk"), true);
    assert.strictEqual(validateEmail("123@numbers.com"), true);
  });

  it("should return true for valid email addresses with leading/trailing spaces", () => {
    assert.strictEqual(validateEmail("  test@example.com  "), true);
    assert.strictEqual(validateEmail("\ttest@example.com\n"), true);
  });

  it("should return false for invalid email addresses", () => {
    assert.strictEqual(validateEmail("test"), false);
    assert.strictEqual(validateEmail("test@"), false);
    assert.strictEqual(validateEmail("@example.com"), false);
    assert.strictEqual(validateEmail("test@example"), false);
    assert.strictEqual(validateEmail("test@.com"), false);
    assert.strictEqual(validateEmail("test@example."), false);
    assert.strictEqual(validateEmail("test @example.com"), false);
    assert.strictEqual(validateEmail("test@ example.com"), false);
  });

  it("should return false for empty string", () => {
    assert.strictEqual(validateEmail(""), false);
    assert.strictEqual(validateEmail("   "), false);
  });
});
