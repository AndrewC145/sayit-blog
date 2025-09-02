import jwt from 'jsonwebtoken';

function generateRefreshToken(user: any): Promise<any> {
  const payload: object = {
    sub: { id: user.id },
    iat: Date.now(),
  };

  const refreshSecret = process.env.JWT_REFRESH_SECRET as string;

  return new Promise((resolve, reject) => {
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
