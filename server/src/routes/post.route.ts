import { Router } from 'express';
import {
  upload,
  createPost,
  getPosts,
  categoryPosts,
  postId,
  addComment,
  deleteCommentController,
  deletePostController,
} from '../controllers/post.controller';

const postRouter: Router = Router();

postRouter.get('/', getPosts);
postRouter.get('/category/:category', categoryPosts);
postRouter.get('/:id', postId);
postRouter.post('/:id/comments', addComment);
postRouter.delete('/:id', deletePostController);
postRouter.delete('/:id/comments/:commentId', deleteCommentController);
postRouter.post('/', upload.single('file'), createPost);

export default postRouter;
