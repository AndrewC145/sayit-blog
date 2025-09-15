import { Router } from 'express';
import { signupValidation, signUp } from '../controllers/signup.controller';

const signUpRoute = Router();

signUpRoute.post('/signup', ...signupValidation, signUp);

export default signUpRoute;
