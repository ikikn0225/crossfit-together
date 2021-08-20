import { sign, verify } from 'jsonwebtoken';

export function generateAccessToken(id: number) {
  return sign({ userId: id }, process.env.PRIVATE_KEY!, { expiresIn: '15m' });
}

export function verifyAccessToken(token: string) {
  return verify(token, process.env.PRIVATE_KEY!);
}