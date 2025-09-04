import { Router } from 'express';
import logoutUser from '../controllers/logoutUser';

const logoutRoute = Router();

logoutRoute.post('/logout', logoutUser);

export default logoutRoute;
