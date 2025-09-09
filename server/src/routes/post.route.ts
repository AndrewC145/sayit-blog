import { Router } from 'express';
import {
  upload,
  createPost,
  getPosts,
  categoryPosts,
} from '../controllers/post.controller';

const postRouter: Router = Router();

postRouter.get('/', getPosts);
postRouter.get('/:category', categoryPosts);
postRouter.post('/', upload.single('file'), createPost);

export default postRouter;
