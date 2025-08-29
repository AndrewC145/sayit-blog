import prisma from './prismaClient';

async function findUserByUsername(username: string) {
  return await prisma.users.findUnique({
    where: { username },
  });
}

export { findUserByUsername };
