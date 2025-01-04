import { Request, RequestHandler, Response } from "express";
import { z } from "zod";
import * as service from "../services/Reservation";

export const createReservation: RequestHandler = async (req: Request, res: Response) => {
  const reservationSchema = z.object({
    userId: z.number(),
    roomId: z.number(),
    start: z.coerce.date(),
    end: z.coerce.date()
  })
  .refine((data) => data.start < data.end, {
    message: "A data de início deve ser menor que a data de término.",
    path: ["start"]
  })
  .refine(
    (data) => {
      const diffInMs = data.end.getTime() - data.start.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);
      return diffInHours >= 1;
    }, {
      message: "A reserva deve ter pelo menos 1 hora de duração.",
      path: ["end"]
    }
  )
  

  const result = reservationSchema.safeParse(req.body)

  if (!result.success) {
    res.status(400).json({
      message: "Erro na validação",
      errors: result.error.issues
    })
    return
  }

  const reservation = await service.createReservation(result.data)

  if (!reservation) {
    res.json({ message: "Já existe uma reserva para este horário neste quarto"});
    return
  }

  res.json(reservation)
}
export const getUserReservations: RequestHandler = (req: Request, res: Response) => {
  res.json({
    reservations: []
  })
}
export const getRoomReservations: RequestHandler = async (req: Request, res: Response) => {
  const roomReservationSchema = z.object({
    roomId: z.coerce.number()
  })

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
  const reservationSchema = z.object({
    id: z.coerce.number()
  })

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