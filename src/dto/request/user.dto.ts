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

export type IEmailVerify = Pick<ICreateUser, "email">;
