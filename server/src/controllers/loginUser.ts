import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { findUserById } from '../db/registerQueries';

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

function loginUser(req: Request, res: Response, next: NextFunction) {}
