import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const createReservation = async (data: Prisma.ReservationUncheckedCreateInput) => {
  try {
    const existingReservation = await checkRoomAvailability(new Date(data.start), new Date(data.end), data.roomId)
    
    if (existingReservation) {
      return false;
    }

    await prisma.reservation.create({ data })
    return true
  } catch (err) {
    console.log(err)
    return false;
  }
}

export const checkRoomAvailability = async (start: Date, end: Date, roomId: number) => {
  try {
    return await prisma.reservation.findFirst({
      where: {
        roomId,
        OR: [
          {
            start: { lte: end },
            end: { gte: start },
          }
        ]
      }
    })  
  } catch (err) {
    console.log(err)
    return false
  }  
}

export const listRoomReservations = async (roomId: number) => {
  try {
    return await prisma.reservation.findMany({
      where: {
        roomId: roomId
      }
    })
  } catch(err) {
    console.log(err)
    return false
  }  
}

export const removeReservationById = async (id: number) => {
  try {
    const reservation = await prisma.reservation.delete({
      where: {
        id: id
      }
    })
    return reservation.id
  } catch(err) {
    console.log(err)
    return false;
  }
}