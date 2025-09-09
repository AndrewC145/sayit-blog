import { Request, Response } from 'express';
import multer from 'multer';
import { addPost } from '../db/postQueries';

type PostTypes = {
  title: string;
  category: string;
  content: string;
  authorId: number;
  filepath: string | null;
  id: number;
  createdAt: Date;
};

async function createPost(req: Request, res: Response): Promise<any> {
  try {
    const { title, category, content, authorId } = req.body;
    const file: Express.Multer.File | undefined = req.file;

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
    cb(null, 'uploads/');
  },
  filename: function (req: Request, file: any, cb: any) {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldName + '-' + suffix);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export { upload, createPost };
