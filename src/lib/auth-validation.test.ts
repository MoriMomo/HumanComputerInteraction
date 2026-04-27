import { test, describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateEmail, validateName, validatePassword } from "./auth-validation";

describe('validateEmail', () => {
  it('should return true for valid email addresses', () => {
    assert.equal(validateEmail("test@example.com"), true);
    assert.equal(validateEmail("user.name+tag@domain.co.uk"), true);
    assert.equal(validateEmail("123@numbers.com"), true);
  });

  it('should return true for valid email addresses with leading/trailing spaces', () => {
    assert.equal(validateEmail("  test@example.com  "), true);
    assert.equal(validateEmail("\ttest@example.com\n"), true);
  });

  it('should return false for invalid email addresses', () => {
    assert.equal(validateEmail("test"), false);
    assert.equal(validateEmail("test@"), false);
    assert.equal(validateEmail("@example.com"), false);
    assert.equal(validateEmail("test@example"), false);
    assert.equal(validateEmail("test@.com"), false);
    assert.equal(validateEmail("test@example."), false);
    assert.equal(validateEmail("test @example.com"), false);
    assert.equal(validateEmail("test@ example.com"), false);
  });

  it('should return false for empty string', () => {
    assert.equal(validateEmail(""), false);
    assert.equal(validateEmail("   "), false);
  });
});

test('validatePassword', async (t) => {
    await t.test('returns true for password exactly 8 characters long', () => {
        assert.equal(validatePassword('12345678'), true);
    });

    await t.test('returns true for password more than 8 characters long', () => {
        assert.equal(validatePassword('123456789'), true);
    });

    await t.test('returns false for password less than 8 characters long', () => {
        assert.equal(validatePassword('1234567'), false);
    });

    await t.test('returns false for empty password', () => {
        assert.equal(validatePassword(''), false);
    });
});

describe('validateName', () => {
  test('should return true for valid names', () => {
    assert.equal(validateName('John Doe'), true);
    assert.equal(validateName('Ab'), true); // Min length 2
    assert.equal(validateName('A'.repeat(80)), true); // Max length 80
  });

  test('should return false for names shorter than 2 characters', () => {
    assert.equal(validateName(''), false);
    assert.equal(validateName('A'), false);
  });

  test('should return false for names longer than 80 characters', () => {
    assert.equal(validateName('A'.repeat(81)), false);
  });

  test('should trim whitespace from names', () => {
    assert.equal(validateName('  John Doe  '), true);
    assert.equal(validateName(' A '), false); // "A" is too short after trimming
    assert.equal(validateName('  '), false); // Empty after trimming
  });

  test('should return false for names that are only whitespace', () => {
    assert.equal(validateName('   '), false);
  });
});
