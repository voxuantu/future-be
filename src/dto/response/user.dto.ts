import { AutoMap } from "@automapper/classes";
import { ICreateUser } from "../request/user.dto";

export class UserResDTO implements ICreateUser {
  name: string;
  createdAt: string;
}
