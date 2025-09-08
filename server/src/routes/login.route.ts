import { Router } from 'express';
import { loginUser, loginValidation } from '../controllers/login.controller';

const loginRoute: Router = Router();

loginRoute.post('/login', ...loginValidation, loginUser);

export default loginRoute;
