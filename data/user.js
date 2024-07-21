import { PrismaClient } from "@prisma/client";

import { db } from "@/lib/db";

const prisma = new PrismaClient();

export const getUserByEmail = async (email) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: { contacts: true },
  });
};
