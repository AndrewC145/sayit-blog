import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { jwtOptions } from './loginUser';

export async function authVerify(req: Request, res: Response) {
  const token: string | undefined = req.headers.authorization?.split(' ')[1];

  const verified = token ? await verifyToken(token, jwtOptions) : null;

  if (!verified) return res.status(403).json({ message: 'Unauthrozied' });

  return res.status(200).json({ message: 'Authorized', verified });
}

export async function verifyToken(token: string, options: typeof jwtOptions) {
  try {
    const verification = jwt.verify(token, options.secretOrKey);
  } catch (error: any) {
    throw new Error('Token verification failed');
  }
}
