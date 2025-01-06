import { z } from "zod";

export const roomSchema = z.object({
  name: z.string(),
  capacity: z.number(),
  resources: z.string(),
})

export const roomUpdateSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  capacity: z.number(),
  resources: z.string(),
})

export const roomDeleteSchema = z.object({
  id: z.coerce.number()
})