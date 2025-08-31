import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import { findUserByUsername } from '../db/loginQueries';
import { body, validationResult } from 'express-validator';

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

function generateToken(user: any): Promise<any> {
  const userObj: Object = { id: user.id, username: user.username };
  const payload: Object = {
    sub: userObj,
    iat: Date.now(),
  };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      jwtOptions.secretOrKey,
      {
        expiresIn: '1d',
        algorithm: 'HS256',
      },
      function (err, token) {
        if (err) {
          return reject(err);
        }

        resolve(token);
      }
    );
  });
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
          console.log('User logged in successfully');
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
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

export { loginUser, loginValidation };
