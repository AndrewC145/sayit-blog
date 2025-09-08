import { Router } from 'express';
import logoutUser from '../controllers/logout.controller';

const logoutRoute = Router();

logoutRoute.post('/logout', logoutUser);

export default logoutRoute;
