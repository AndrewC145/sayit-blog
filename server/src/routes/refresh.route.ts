import { Router } from 'express';
import { refreshToken } from '../controllers/refresh.controller';
const refreshRoute: Router = Router();

refreshRoute.get('/', refreshToken);

export default refreshRoute;
