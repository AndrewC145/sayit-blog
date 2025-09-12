import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { body, Result, validationResult } from 'express-validator';
import { storeUser, findUserByUsername } from '../db/registerQueries';

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

type LoginProps = {
  username: string;
  password: string;
};

async function signUp(req: Request, res: Response) {
  const { username, password }: LoginProps = req.body;
  const errors: Result = validationResult(req);

  const findingUser = username.toLowerCase();

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingUser: boolean = await findUserByUsername(findingUser);

    if (existingUser) {
      return res
        .status(403)
        .json({ message: 'An account with this username already exists' });
    }

    const hashedPassword: string = await hashPassword(password);
    let user: object = await storeUser(username, hashedPassword);

    return res
      .status(201)
      .json({ user, message: 'Account created successfully' });
  } catch (error: any) {
    return res.status(400).json({ error });
  }
}

async function hashPassword(password: string): Promise<string> {
  const salt: string = await bcrypt.genSalt(10);
  const hash: string = await bcrypt.hash(password, salt);
  return hash;
}

export { signupValidation, signUp };
