import { ICreateAdmin, ICreateUser } from "../request/user.dto";

export type UserResDTO = Pick<ICreateUser, "name"> & { _id: string };

export type AdminResDTO = Pick<ICreateAdmin, "name"> & { _id: string };
// export class UserResDTO implements ICreateUser {
//   _id: string;
//   name: string;
// }
export interface IUserInfo {
  name: string;
  avatar: string;
  email: string;
  birthday: string | Date;
}
