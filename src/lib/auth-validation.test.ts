import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePassword } from './auth-validation.ts';

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
import { test, describe } from 'node:test';
import assert from 'node:assert';
import { validateName } from './auth-validation.ts';

describe('validateName', () => {
  test('should return true for valid names', () => {
    assert.strictEqual(validateName('John Doe'), true);
    assert.strictEqual(validateName('Ab'), true); // Min length 2
    assert.strictEqual(validateName('A'.repeat(80)), true); // Max length 80
  });

  test('should return false for names shorter than 2 characters', () => {
    assert.strictEqual(validateName(''), false);
    assert.strictEqual(validateName('A'), false);
  });

  test('should return false for names longer than 80 characters', () => {
    assert.strictEqual(validateName('A'.repeat(81)), false);
  });

  test('should trim whitespace from names', () => {
    assert.strictEqual(validateName('  John Doe  '), true);
    assert.strictEqual(validateName(' A '), false); // "A" is too short after trimming
    assert.strictEqual(validateName('  '), false); // Empty after trimming
  });

  test('should return false for names that are only whitespace', () => {
    assert.strictEqual(validateName('   '), false);
  });
});
