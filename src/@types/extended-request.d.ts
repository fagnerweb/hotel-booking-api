import { Role } from "@prisma/client";
import { Request } from "express";

export type ExtendedRequest = Request & {
  user?: {
    id: number,
    email: string,
    role: Role
  }
}
