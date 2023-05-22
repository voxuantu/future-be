import { ICreateAdmin, ICreateUser } from "../request/user.dto";

export type UserResDTO = Pick<ICreateUser, "name"> & { _id: string };

export type AdminResDTO = Pick<ICreateAdmin, "name"> & { _id: string };
