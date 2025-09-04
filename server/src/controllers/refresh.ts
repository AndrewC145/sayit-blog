import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwtOptions } from './loginUser';

function generateAccessToken(user: any): Promise<any> {
  const userObj: object = { id: user.id, username: user.username };
  const payload: object = {
    sub: userObj,
    iat: Date.now(),
  };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      jwtOptions.secretOrKey,
      {
        algorithm: 'HS256',
        expiresIn: '30m',
      },
      function (err: Error | null, token: string | undefined) {
        if (err) {
          return reject(err);
        }

        resolve(token);
      }
    );
  });
}

function checkTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Response<any> | void {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    jwt.verify(token, jwtOptions.secretOrKey);
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }

    return res.status(403).json({ message: 'Invalid token' });
  }
}

function generateRefreshToken(user: any): Promise<any> {
  const payload: object = {
    sub: { id: user.id },
    iat: Date.now(),
  };

  const refreshSecret = process.env.JWT_REFRESH_SECRET as string;

  return new Promise((resolve: any, reject: any) => {
    jwt.sign(
      payload,
      refreshSecret,
      { algorithm: 'HS256', expiresIn: '1d' },
      function (err: Error | null, token: string | undefined) {
        if (err) return reject(err);

        resolve(token);
      }
    );
  });
}

async function sendTokens(user: any, res: Response) {
  try {
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return accessToken;
  } catch (error: any) {
    console.error('Error generating tokens:', error);
  }
}

async function refreshToken(
  req: Request,
  res: Response
): Promise<Response<any> | void> {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).redirect('/login');
  }

  const refreshSecret = process.env.JWT_REFRESH_SECRET as string;

  return jwt.verify(
    refreshToken,
    refreshSecret,
    async (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      const accessToken = await generateAccessToken(decoded.sub);
      return res.status(200).json({ accessToken });
    }
  );
}

export { sendTokens, generateAccessToken, refreshToken, checkTokenMiddleware };
