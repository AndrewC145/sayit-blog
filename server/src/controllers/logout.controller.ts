import { Request, Response } from 'express';

async function logoutUser(req: Request, res: Response) {
  res.clearCookie('refreshToken', {
    domain: 'localhost',
    path: '/',
  });

  return res.status(200).end();
}

export default logoutUser;
