import { Prisma } from "@prisma/client"
import { prisma } from "../lib/prisma"

export const createRoom = async (data: Prisma.RoomCreateInput) => {
  try {
    return await prisma.room.create({ data })
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getAllRooms = async () => {
  try {
    return await prisma.room.findMany();
  } catch(err) {
    console.log(err);
    return false
  }
}

export const updateRoom = async (data: Prisma.RoomUncheckedCreateInput) => {
  try {
    const room = await prisma.room.update({
      where: {
        id: data.id 
      },
      data   
    })

    return room
  } catch(err) {
    console.log(err)
    return false
  }
}

export const deleteRoom = async (id: number) => {
  try {
    await prisma.room.delete({
      where: {
        id
      }
    })
    return true
  } catch(err) {
    console.log(err);
    return false
  }

}