import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import { body, Result, validationResult } from 'express-validator';
import { storeUser, findUserById } from '../db/registerQueries';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
  issuer: process.env.JWT_ISSUER as string,
  audience: process.env.JWT_AUDIENCE as string,
};

const signupValidation = [
  body('username')
    .isString()
    .notEmpty()
    .withMessage('Username is required')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .bail()
    .isLength({ max: 20 })
    .withMessage('Username must be at most 20 characters long'),

  body('password')
    .isString()
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .bail()
    .isLength({ max: 25 })
    .withMessage('Password must be at most 25 characters long'),
];

async function signUp(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;
  const errors: Result = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await hashPassword(password);
    let user = await storeUser(username, hashedPassword);

    user = { id: user.id, username: user.username };

    req.login(user, (err) => {
      if (err) return next(err);
      const token = generateToken(user);
      return res.status(201).json({ token, user });
    });
  } catch (error: any) {
    return res.status(400).json({ error });
  }
}

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

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

export { signupValidation, signUp };
