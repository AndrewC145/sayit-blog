import { Request, Response } from 'express';
import path from 'path';
import { dirname } from 'path';
import multer from 'multer';
import {
  PostArray,
  PostTypes,
  addPost,
  getAllPosts,
  getPostByCategory,
} from '../db/postQueries';

async function createPost(req: Request, res: Response): Promise<any> {
  try {
    const { title, category, content, authorId } = req.body;
    const file: Express.Multer.File | undefined = req.file;
    console.log(req.file);

    if (!title || !category || !content || !file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const imagePath: string = file.path;

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

    if (!posts || posts.length === 0) {
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

export { upload, createPost, getPosts, categoryPosts };
