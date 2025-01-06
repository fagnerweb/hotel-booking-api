import { Request, RequestHandler, Response } from "express";
import * as service from "../services/User";
import { userCreateSchema } from "../schemas/user";
import { signinSchema } from "../schemas/signin";
import { createJWT } from "../libs/jwt";

export const register: RequestHandler = async (req, res) => {
  const result = userCreateSchema.safeParse(req.body);

  if (!result.success) {
    res.json({ error: 'Erro ao cadastrar' });
    return
  }

  const hasEmail = await service.getUserByEmail(result.data.email)

  if (hasEmail) {
    res.json({ error: 'E-mail já existe'});
    return
  }

  const newUser = await service.createUser(result.data)

  const token = createJWT(newUser.id, newUser.email, newUser.role)
  
  res.status(201).json({ 
    token,
    user: {
      name: newUser.name,
      email: newUser.email      
    }
   })
}
export const authenticate: RequestHandler = async (req: Request, res: Response) => {
  const result = signinSchema.safeParse(req.body)
  if (!result.success) {
    res.json({ error: result.error.flatten().fieldErrors })
    return
  }

  const user = await service.getUserByEmail(result.data.email)
  if (!user) {
    res.status(401).json({ error: 'Acesso negado' })
    return
  }

  const token = createJWT(user.id, user.email, user.role)

  res.json({ 
    token,
    user: {
      name: user.name,
      email: user.email      
    }
  })
}