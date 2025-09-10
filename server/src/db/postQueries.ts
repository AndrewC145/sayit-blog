import prisma from './prismaClient';

type PostTypes = {
  title: string;
  category: string;
  content: string;
  authorId: number;
  filepath: string | null;
  id: number;
  createdAt: Date;
};

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
      filepath: imagePath,
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

export { PostTypes, PostArray, addPost, getAllPosts, getPostByCategory };
