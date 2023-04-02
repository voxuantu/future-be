// src/users/usersService.ts
import { ICreateUser } from "../dto/request/user.dto";
import User, { IUserModel } from "../models/user";

export class UsersService {
  static async create(userCreationParams: ICreateUser): Promise<IUserModel> {
    const user = new User({
      name: userCreationParams.name,
    });

    await user.save();

    return user;
  }

  static async findUserById(userId: string) {
    const user = await User.findById(userId);
    return user;
  }
}
