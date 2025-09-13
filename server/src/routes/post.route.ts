import { Router } from 'express';
import {
  upload,
  createPost,
  getPosts,
  categoryPosts,
  postId,
  addComment,
} from '../controllers/post.controller';

const postRouter: Router = Router();

postRouter.get('/', getPosts);
postRouter.get('/category/:category', categoryPosts);
postRouter.get('/:id', postId);
postRouter.post('/:id', addComment);
postRouter.post('/', upload.single('file'), createPost);

export default postRouter;
