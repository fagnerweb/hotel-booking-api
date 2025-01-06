import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6).max(12),
  role: z.enum(['RECEPCIONISTA', 'GERENTE','GOVERNATA'])
})