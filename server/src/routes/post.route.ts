import { Router } from 'express';
import { upload, createPost } from '../controllers/post.controller';

const postRouter: Router = Router();

postRouter.post('/', upload.single('file'), createPost);

export default postRouter;
