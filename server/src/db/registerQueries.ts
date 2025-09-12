import prisma from './prismaClient';

async function storeUser(
  username: string,
  hashedPassword: string
): Promise<any> {
  const user: any = await prisma.users.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return user;
}

async function findUserByUsername(username: string): Promise<boolean> {
  const user: any = await prisma.users.findUnique({
    where: { username },
  });

  if (user) return true;

  return false;
}

async function findUserById(id: number): Promise<any | null> {
  const user: any = await prisma.users.findUnique({
    where: { id },
  });

  return user;
}

export { storeUser, findUserById, findUserByUsername };
