import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'ml8_commissioner';
const SESSION_SECONDS = 60 * 60 * 24 * 7;

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) throw new Error('AUTH_SECRET is not configured.');
  return value;
}

function sign(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

function equalText(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function createToken() {
  const payload = Buffer.from(JSON.stringify({ expires: Date.now() + SESSION_SECONDS * 1000 })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function validToken(token?: string) {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature || !equalText(sign(payload), signature)) return false;
  try {
    const value = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { expires?: number };
    return typeof value.expires === 'number' && value.expires > Date.now();
  } catch {
    return false;
  }
}

export async function isCommissioner() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return validToken(token);
}

export async function requireCommissioner() {
  if (!(await isCommissioner())) redirect('/admin/login');
}

export async function openCommissionerSession(password: string) {
  const expected = process.env.COMMISSIONER_PASSWORD;
  if (!expected || !equalText(password, expected)) return false;
  (await cookies()).set(COOKIE_NAME, createToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_SECONDS,
    path: '/',
  });
  return true;
}

export async function closeCommissionerSession() {
  (await cookies()).delete(COOKIE_NAME);
}
