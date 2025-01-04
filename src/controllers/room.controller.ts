import { Request, RequestHandler, Response } from "express";
import z from 'zod';
import * as service from '../services/Room'

export const getAllRooms = async (req: Request, res: Response) => {
  const rooms = await service.getAllRooms();  
  res.json(rooms)
}
export const createRoom: RequestHandler = async (req: Request, res: Response) => {
  const roomSchema = z.object({
    name: z.string(),
    capacity: z.number(),
    resources: z.string(),
  })

  const result = roomSchema.safeParse(req.body)

  if (!result.success) {
    res.json({ message: 'Erro ao cadastrar, dados inválidos'});
    return
  }

  const room = await service.createRoom(result.data)

  if (!room) {
    res.json({ message: 'Erro ao cadastrar.'});
    return
  }

  res.status(201).json({ create: true })
}
export const updateRoom: RequestHandler = async (req: Request, res: Response) => {
  const roomSchema = z.object({
    id: z.coerce.number(),
    name: z.string(),
    capacity: z.number(),
    resources: z.string(),
  })
  
  const data = {
    id: req.params.id,
    ...req.body
  }

  const result = roomSchema.safeParse(data)

  if (!result.success) {
    res.json({
      error: "Erro ao atualizar",
      message: result.error.issues
    });
    return
  }

  const roomUpdate = await service.updateRoom(result.data)

  if (!roomUpdate) {
    res.json({
      error: "Erro ao atualizar quarto"
    })
    return 
  }

  res.json({
    message: 'Quarto atualizado com sucesso'
  })
}
export const deleteRoom: RequestHandler = async (req: Request, res: Response) => {
  const roomDeleteSchema = z.object({
    id: z.coerce.number()
  })

  const result = roomDeleteSchema.safeParse(req.params)

  if (!result.success) {
    res.json({
      error: "Erro ao deletar quarto",
      message: result.error.issues
    })
    return
  }

  await service.deleteRoom(result.data.id)  

  res.json({
    message: 'Quarto deletado com sucesso'
  })
} 