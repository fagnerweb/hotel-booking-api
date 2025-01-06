import { z } from "zod";

export const signinSchema = z.object({
  email: z.string({ message: 'E-mail obrigatório'}).email({ message: 'E-mail inválido'}),
  password: z.string({ message: 'Informe sua senha para logar'})
  .min(2, 'A senha precisa ter mais de 2 caracteres.')
  .max(10, 'A senha precisa ter menos de 10 caracteres.')
})