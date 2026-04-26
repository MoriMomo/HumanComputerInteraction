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
});
