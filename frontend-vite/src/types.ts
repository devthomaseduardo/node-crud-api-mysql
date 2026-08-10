export interface User {
  id: number;
  nome: string;
  email: string;
  fone: string;
  data_nascimento: string;
}

export type UserFormData = Omit<User, "id">;
