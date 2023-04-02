import { ICreateUser } from "../request/user.dto";

export class UserResDTO implements ICreateUser {
  _id: string;
  name: string;
}
