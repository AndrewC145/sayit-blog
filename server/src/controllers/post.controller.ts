import { Request, Response } from 'express';
import path from 'path';
import { dirname } from 'path';
import multer from 'multer';
import { unlink } from 'fs';
import {
  PostArray,
  PostTypes,
  addPost,
  getAllPosts,
  getPostByCategory,
  getPostById,
  getComments,
  uploadComment,
  deleteComment,
  CommentArray,
  deletePost,
  CommentTypes,
} from '../db/postQueries';

async function createPost(req: Request, res: Response): Promise<any> {
  try {
    const { title, category, content, authorId } = req.body;
    const file: Express.Multer.File | undefined = req.file;

    if (!title || !category || !content || !file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const imagePath: string = path.join('/uploads', file.filename);

    const post: PostTypes = await addPost(
      title,
      content,
      category,
      imagePath,
      Number(authorId)
    );
    return res.status(201).json({ message: 'Post created', post });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: 'Error while uploading file', error: error });
  }
}

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    const __dirname = dirname(new URL(import.meta.url).pathname);
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req: Request, file: any, cb: any) {
    const suffix = Date.now() + path.extname(file.originalname);
    cb(null, suffix);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

async function getPosts(req: Request, res: Response): Promise<any> {
  try {
    const posts: PostArray = await getAllPosts();

    if (!posts) {
      return res.status(404).json({ message: 'No posts found' });
    }

    return res.status(200).json({ posts });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: 'Error fetching posts', error: error });
  }
}

async function categoryPosts(req: Request, res: Response): Promise<any> {
  try {
    const category: string = req.params.category;

    if (!category) {
      return res.status(404).json({ message: 'Category is required' });
    }

    const posts: PostArray = await getPostByCategory(category);

    if (!posts) {
      return res
        .status(404)
        .json({ message: 'No posts found for this category' });
    }

    return res.status(200).json({ posts });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: 'Error fetching posts by category', error: error });
  }
}

async function postId(req: Request, res: Response): Promise<any> {
  try {
    const id: number = Number(req.params.id);

    if (!id) {
      return res.status(404).json({ message: 'Post ID is required' });
    }

    const post: PostTypes | null = await getPostById(id);

    if (!post) {
      return res.status(404).json({ message: 'No post found with this ID' });
    }

    const comments: CommentArray | null = await getComments(id);

    if (comments) post.comments = comments;

    return res.status(200).json({ post });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: 'Error fetching post by id', error: error });
  }
}

async function addComment(req: Request, res: Response): Promise<any> {
  try {
    const postId: number = Number(req.params.id);

    const { author, comment } = req.body;

    if (!postId || !author || !comment) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newComment = await uploadComment(author, postId, comment);

    return res.status(201).json({ message: 'Comment added', newComment });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: 'Error adding comment', error: error });
  }
}

async function deleteCommentController(
  req: Request,
  res: Response
): Promise<any> {
  const commentId: number = Number(req.body.commentId);

  if (!commentId) {
    return res.status(400).json({ message: 'Comment ID is required' });
  }

  const deletedComment: CommentTypes | null = await deleteComment(commentId);

  if (!deletedComment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  return res.status(200).json({ message: 'Comment deleted' });
}

async function deletePostController(req: Request, res: Response): Promise<any> {
  const postId: number = Number(req.body.id);

  if (!postId) {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  const deletedPost: PostTypes | null = await deletePost(postId);

  if (!deletedPost) {
    return res.status(404).json({ message: 'Post not found' });
  }
  const __dirname: string = dirname(new URL(import.meta.url).pathname);

  const fullPath: string = path.join(__dirname, '../', deletedPost.file!);

  unlink(fullPath, (err) => {
    if (err) {
      throw err;
    }
  });

  return res.status(200).json({ message: 'Post deleted' });
}

export {
  upload,
  createPost,
  getPosts,
  categoryPosts,
  postId,
  addComment,
  deleteCommentController,
  deletePostController,
};
