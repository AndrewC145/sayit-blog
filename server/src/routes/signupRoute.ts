import { Router } from 'express';
import { signupValidation, signUp } from '../controllers/signupUser';

const signUpRoute = Router();

signUpRoute.post('/signup', signupValidation, signUp);

export default signUpRoute;
