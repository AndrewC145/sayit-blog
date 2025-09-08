import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import { findUserByUsername } from '../db/loginQueries';
import { body, validationResult } from 'express-validator';
import { sendTokens } from './refresh.controller';

const loginValidation = [
  body('username').isString().notEmpty().withMessage('Username is required'),

  body('password').isString().notEmpty().withMessage('Password is required'),
];

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
  issuer: process.env.JWT_ISSUER as string,
  audience: process.env.JWT_AUDIENCE as string,
};

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
          return done(null, false, {
            message: 'Incorrect username or password',
          });
        }
      });
    } catch (error: any) {
      return done(error);
    }
  })
);

async function loginUser(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  passport.authenticate(
    'local',
    { session: false },
    async (err: any, user: any, info: any) => {
      if (err) return next(err);

      const token: any = req.headers.authorization?.split(' ')[1];
      if (token) {
        return res.status(400).json({ message: 'You are already logged in.' });
      }

      if (!user) {
        return res
          .status(401)
          .json({ message: info?.message || 'Login failed' });
      }

      const newToken: Function | undefined = await sendTokens(user, res);

      return res
        .status(200)
        .json({ user, accessToken: newToken, message: 'Login Successful!' });
    }
  )(req, res, next);
}

export { loginUser, loginValidation, jwtOptions };
