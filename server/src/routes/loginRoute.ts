import { Router } from 'express';
import { loginUser, loginValidation } from '../controllers/loginUser';

const loginRoute: Router = Router();

loginRoute.post('/login', ...loginValidation, loginUser);

export default loginRoute;
