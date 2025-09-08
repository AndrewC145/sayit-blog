import { Request, Response } from 'express';
import { jwtOptions } from './login.controller';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { findUserById } from '../db/registerQueries';

passport.use(
  new JwtStrategy(jwtOptions, (jwt_payload: any, done: Function) => {
    try {
      const userId = jwt_payload.sub;
      const user = findUserById(userId);

      if (user) return done(null, user);

      return done(null, false);
    } catch (error: any) {
      return done(error, false);
    }
  })
);

async function authenticateToken(req: Request, res: Response, next: Function) {
  passport.authenticate(
    'jwt',
    { session: false },
    async (err: any, user: any, info: any) => {
      if (err) return next(err);

      if (!user) {
        return res.redirect('/login');
      }

      return res.status(200).json({ user });
    }
  )(req, res, next);
}

export { authenticateToken };
