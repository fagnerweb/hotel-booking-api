import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const createReservation = async (data: Prisma.ReservationUncheckedCreateInput) => {
  try {
    const existingReservation = await checkRoomAvailability(new Date(data.start), new Date(data.end), data.roomId)

    if (existingReservation) {
      return false;
    }

    return await prisma.reservation.create({ data })
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
        AND: [
          {
            start: {
              lte: start, // O início da reserva deve ser anterior ou igual ao fim do intervalo solicitado
            },
          },
          {
            end: {
              gte: end, // O fim da reserva deve ser posterior ou igual ao início do intervalo solicitado
            },
          },
        ],
      },
    });
  } catch (err) {
    console.error('Erro ao verificar disponibilidade:', err);
    return false;
  }
};


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