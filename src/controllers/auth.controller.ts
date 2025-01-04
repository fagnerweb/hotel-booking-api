import { Request, RequestHandler, Response } from "express";
import { z } from 'zod';
import * as service from "../services/User";

export const register: RequestHandler = async (req, res) => {
  const userSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6).max(12),
    role: z.enum(['RECEPCIONISTA', 'GERENTE','GOVERNATA'])
  })

  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    res.json({ error: 'Erro ao cadastrar' });
    return
  }

  const user = await service.createUser(result.data)

  if (!user) {
    res.status(400).json({ message: 'Não foi possível cadastrar' })
    return
  }
  
  res.status(201).json({ create: true })
}
export const authenticate: RequestHandler = (req: Request, res: Response) => {
  res.json({
    message: 'Usuário logado com sucesso'
  })
}