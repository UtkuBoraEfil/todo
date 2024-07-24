import {prisma} from "./prisma";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    cacheStrategy: { swr:60 ,ttl: 60 },
  });

  return user;
}