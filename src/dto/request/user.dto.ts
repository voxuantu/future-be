export interface ICreateUser {
  name: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
}

export interface ISignJWT {
  userId: string;
  role: string;
}

export interface ICreateAdmin {
  name: string;
  username: string;
  password: string;
}

export interface IUpdateAdmin {
  name?: string;
  username: string;
  password?: string;
}

export type AdminLogin = Pick<ICreateAdmin, "username" | "password">;
