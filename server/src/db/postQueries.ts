import prisma from './prismaClient';

type PostTypes = {
  title: string;
  category: string;
  content: string;
  authorId: number;
  file: string | null;
  id: number;
  createdAt: Date;
  comments?: CommentArray;
};

type CommentTypes = {
  postId: number;
  author: string;
  content: string;
  id: number;
  createdAt: Date;
};

type CommentArray = CommentTypes[];
type PostArray = PostTypes[];

async function addPost(
  title: string,
  content: string,
  category: string,
  imagePath: string | null,
  authorId: number
): Promise<PostTypes> {
  const post = await prisma.post.create({
    data: {
      title,
      content,
      category,
      file: imagePath,
      authorId,
    },
  });
  return post;
}

async function getAllPosts(): Promise<PostArray> {
  return await prisma.post.findMany();
}

async function getPostByCategory(category: string): Promise<PostArray> {
  return await prisma.post.findMany({
    where: {
      category,
    },
  });
}

async function getPostById(id: number): Promise<PostTypes | null> {
  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
}

async function getComments(postId: number): Promise<CommentArray | null> {
  return await prisma.comments.findMany({
    where: {
      postId,
    },
  });
}

async function uploadComment(
  username: string,
  postId: number,
  content: string
) {
  return await prisma.comments.create({
    data: {
      author: username,
      postId,
      content,
    },
  });
}

async function deleteComment(id: number): Promise<CommentTypes | null> {
  return await prisma.comments.delete({
    where: {
      id,
    },
  });
}

export {
  PostTypes,
  PostArray,
  addPost,
  getAllPosts,
  getPostByCategory,
  getPostById,
  getComments,
  uploadComment,
  CommentTypes,
  deleteComment,
  CommentArray,
};
