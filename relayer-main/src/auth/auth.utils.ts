import { randomBytes } from 'crypto';

export const toHexString = (data: Uint8Array) =>
  Buffer.from(data.buffer).toString('hex');

export const toUint8Array = (data: string) => new TextEncoder().encode(data);

export const toString = (data: Uint8Array) => new TextDecoder().decode(data);

const saltLength = 16;

export const generateSalt = () => {
  return randomBytes(saltLength).toString('hex');
};
