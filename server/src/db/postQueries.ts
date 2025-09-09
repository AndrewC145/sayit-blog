import prisma from './prismaClient';

async function addPost(
  title: string,
  content: string,
  category: string,
  imagePath: string | null,
  authorId: number
) {
  const post = await prisma.post.create({
    data: {
      title,
      content,
      category,
      filepath: imagePath,
      authorId,
    },
  });

  console.log('Post added:', post);
  return post;
}

async function getAllPosts() {
  return await prisma.post.findMany();
}

export { addPost, getAllPosts };
