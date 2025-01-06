import { Request, RequestHandler, Response } from "express";
import * as service from "../services/Reservation";
import { reservationCreateSchema, reservationSchema, roomReservationSchema } from "../schemas/reservation";
import { prisma } from "../libs/prisma";
import { ExtendedRequest } from "../@types/extended-request";
import { getRoomById } from "../services/Room";

export const createReservation: RequestHandler = async (req: Request, res: Response) => {
  const result = reservationCreateSchema.safeParse(req.body)

  if (!result.success) {
    res.status(400).json({
      message: "Erro na validação",
      errors: result.error.issues
    })
    return 
  }

  const room = await getRoomById(result.data.roomId)
  if (!room) {
    res.json({ message: 'Não existe o quarto informado'})
    return 
  }

  const reservation = await service.createReservation(result.data)

  if (!reservation) {
    res.json({ message: "Já existe uma reserva para este horário neste quarto"});
    return
  }

  res.json(reservation)
}
export const getUserReservations = async (req: ExtendedRequest, res: Response) => {
  if (!req.user!.id) {
    res.json({ error: 'Erro, se autentifique na plataforma'})
    return
  }
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id }
  })

  const reservations = await prisma.reservation.findMany({
    where: {
      userId: user?.id
    }
  })

  res.json({ reservations })
}
export const getRoomReservations: RequestHandler = async (req: Request, res: Response) => {
  const result = roomReservationSchema.safeParse(req.params)

  if (!result.success) {
    res.json({
      error: "Erro ao buscar",
      message: result.error.issues
    })
    return 
  }

  const roomReservation = await service.listRoomReservations(result.data.roomId)

  if (!roomReservation) {
    res.json({ error: "Erro ao buscar"})
    return 
  }
  res.json(roomReservation)
}
export const cancelReservation: RequestHandler = async (req: Request, res: Response) => {
  const result = reservationSchema.safeParse(req.params)

  if (!result.success) {
    res.json({
      error: "Erro",
      message: result.error.issues
    })
    return
  }

  const reservationRemove = await service.removeReservationById(result.data.id)
  if (!reservationRemove) {
    res.json({
      error: "Esta reserva não existe"
    })
    return 
  }

  res.json({
    message: 'Reserva cancelada com sucesso'
  })
}