import { z } from "zod";

export const reservationCreateSchema = z.object({
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

export const roomReservationSchema = z.object({
  roomId: z.coerce.number()
})

export const reservationSchema = z.object({
  id: z.coerce.number()
})