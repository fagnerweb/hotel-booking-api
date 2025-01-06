import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";
import bcrypt from 'bcrypt';

export const createUser = async (data: Prisma.UserCreateInput) => {
  data.password = bcrypt.hashSync(data.password, 10);
  const newUser = await prisma.user.create({ data })  

  return {
    ...newUser    
  }
}

export const getAllUsers = async () => {
  try {
    return await prisma.user.findMany()
  } catch(err) {
    console.log(err);
    return false;
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        email
      }
    })
  } catch(err) {
    console.log(err)
    return false
  }
}