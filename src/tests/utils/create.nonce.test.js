import generateNonce from '../../utils/create-nonce.js';
import crypto from 'crypto';
import { jest } from '@jest/globals';

describe('generateNonce', () => {
  const originalRandomBytes = crypto.randomBytes;

  beforeEach(() => {
    crypto.randomBytes = jest.fn();
  });

  afterEach(() => {
    crypto.randomBytes = originalRandomBytes;
  });

  it('should return a base64-encoded string', () => {
    const buffer = Buffer.from('1234567890abcdef');
    crypto.randomBytes.mockReturnValue(buffer);

    const nonce = generateNonce();

    expect(typeof nonce).toBe('string');
    expect(nonce).toBe(buffer.toString('base64'));
  });

  it('should return a string with 24 characters (base64 of 16 bytes)', () => {
    crypto.randomBytes = originalRandomBytes;

    const nonce = generateNonce();
    expect(nonce).toHaveLength(24);
  });

  it('should generate different values on consecutive calls', () => {
    crypto.randomBytes = originalRandomBytes;

    const nonce1 = generateNonce();
    const nonce2 = generateNonce();

    expect(nonce1).not.toBe(nonce2);
  });

  it('should call crypto.randomBytes with 16 as argument', () => {
    crypto.randomBytes = jest.fn(() => Buffer.from('1234567890abcdef'));

    generateNonce();

    expect(crypto.randomBytes).toHaveBeenCalledWith(16);
  });
});
