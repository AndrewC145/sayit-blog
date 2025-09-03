import { Router } from 'express';
import { refreshToken } from '../controllers/refresh';
const refreshRoute: Router = Router();

refreshRoute.get('/', refreshToken);

export default refreshRoute;
