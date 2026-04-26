import { test, describe, it } from 'node:test';
import assert from 'node:assert';
import { validateEmail, validateName } from './auth-validation.ts';

describe('validateEmail', () => {
  it('should return true for valid email addresses', () => {
    assert.strictEqual(validateEmail("test@example.com"), true);
    assert.strictEqual(validateEmail("user.name+tag@domain.co.uk"), true);
    assert.strictEqual(validateEmail("123@numbers.com"), true);
  });

  it('should return true for valid email addresses with leading/trailing spaces', () => {
    assert.strictEqual(validateEmail("  test@example.com  "), true);
    assert.strictEqual(validateEmail("\ttest@example.com\n"), true);
  });

  it('should return false for invalid email addresses', () => {
    assert.strictEqual(validateEmail("test"), false);
    assert.strictEqual(validateEmail("test@"), false);
    assert.strictEqual(validateEmail("@example.com"), false);
    assert.strictEqual(validateEmail("test@example"), false);
    assert.strictEqual(validateEmail("test@.com"), false);
    assert.strictEqual(validateEmail("test@example."), false);
    assert.strictEqual(validateEmail("test @example.com"), false);
    assert.strictEqual(validateEmail("test@ example.com"), false);
  });

  it('should return false for empty string', () => {
    assert.strictEqual(validateEmail(""), false);
    assert.strictEqual(validateEmail("   "), false);
  });
});

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