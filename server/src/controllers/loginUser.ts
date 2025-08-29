import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import { findUserByUsername } from '../db/loginQueries';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
  issuer: process.env.JWT_ISSUER as string,
  audience: process.env.JWT_AUDIENCE as string,
};

async function generateToken(user: any): Promise<any> {
  const payload: Object = {
    sub: { id: user.id, username: user.username },
    iat: Date.now(),
  };

  jwt.sign(
    payload,
    jwtOptions.secretOrKey,
    { expiresIn: '1d', algorithm: 'HS256' },
    (err, token) => {
      if (err) {
        throw new Error('Error generating token');
      }
      console.log('Generated Token:', token);
      return token;
    }
  );
}

/*
function readToken(passport: any) {
  passport.use(
    new JwtStrategy(jwtOptions, (jwt_payload: any, done: Function) => {
      const user = findUserById(jwt_payload.sub);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );
}
*/
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await findUserByUsername(username);

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err) return done(err);

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    } catch (error: any) {
      return done(error);
    }
  })
);

async function loginUser(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'local',
    { session: false },
    async (err: any, user: any, info: any) => {
      if (err) return next(err);

      if (!user) {
        return res
          .status(401)
          .json({ message: info?.message || 'Login failed' });
      }

      const token = await generateToken(user);

      return res.status(200).json({ user, token });
    }
  )(req, res, next);
}

export { loginUser };
