import { UserDTO } from "../@types";
import { prisma } from "../lib/prisma";
import bcrypt from 'bcrypt';

export const createUser = async (data: UserDTO) => {
  try {  
    const user = await getUserByEmail(data.email)

    if (!user) {
      data.password = bcrypt.hashSync(data.password, 10);
      return await prisma.user.create({ data })
    } else {
      return false;
    }

  } catch (err) {
    console.log(err)
    return false;
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