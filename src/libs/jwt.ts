import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Role } from '@prisma/client'
import { ExtendedRequest } from '../@types/extended-request'

export const createJWT = (id: number, email: string, role: Role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET as string)  
}

export const authorizeAdmin = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'GERENTE') {
    res.status(401).json({ error: 'Acesso restrito a administradores'})
    return        
  }

  next()
}

export const authenticate = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    res.status(401).json({ error: 'Acesso negado'})
    return    
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    // eslint-disable-next-line
    (error, decoded: any) => {
      if (error) {
        res.status(401).json({ error: 'Acesso negado'})      
        return
      }

      req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
      next()
    }
  )
}