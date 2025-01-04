import { Request, RequestHandler, Response } from "express";
import * as service from '../services/User'

export const getAllUsers: RequestHandler = async (req: Request, res: Response) => {

  const users = await service.getAllUsers()
  
  res.json(users)
}