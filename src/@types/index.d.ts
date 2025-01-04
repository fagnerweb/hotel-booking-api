type Role = 'RECEPCIONISTA' | 'GERENTE' | 'GOVERNATA';

export type UserDTO = {
  name: string;
  email: string;
  password: string;
  role: Role;
}