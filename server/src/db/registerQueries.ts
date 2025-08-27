import prisma from './prismaClient';

async function storeUser(
  username: string,
  hashedPassword: string
): Promise<any> {
  const existingUser: any = await findUserByUsername(username);

  if (existingUser) {
    throw new Error('Username already exists');
  }

  const user: any = await prisma.users.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  console.log('Created user:', user);
  return user;
}

async function findUserByUsername(username: string): Promise<any | null> {
  const user: any = await prisma.users.findUnique({
    where: { username },
  });

  return user;
}

async function findUserById(id: number): Promise<any | null> {
  const user: any = await prisma.users.findUnique({
    where: { id },
  });

  return user;
}

export { storeUser, findUserById };
