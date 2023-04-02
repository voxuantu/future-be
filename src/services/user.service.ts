// src/users/usersService.ts
import {
  CREATE_USER_SUCCESS,
  ERROR_CREATE_USER,
  ERROR_GET_USER_BY_ID,
  ERROR_USER_NOT_FOUND,
  FIND_USER_BY_ID_SUCCESS,
} from "../constances";
import { HttpStatus } from "../constances/status-code";
import { ICreateUser } from "../dto/request/user.dto";
import { UserResDTO } from "../dto/response/user.dto";
import User from "../models/user";
import { handleResFailure, handlerResSuccess } from "../utils/handle-response";

export class UsersService {
  static async create(userCreationParams: ICreateUser) {
    try {
      const user = new User({
        name: userCreationParams.name,
      });

      await user.save();

      const userRes: UserResDTO = {
        _id: user._id.toString(),
        name: user.name,
      };

      return handlerResSuccess<UserResDTO>(CREATE_USER_SUCCESS, userRes);
    } catch (error) {
      return handleResFailure(ERROR_CREATE_USER, HttpStatus.BAD_REQUEST);
    }
  }

  static async findUserById(userId: string) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const userRes: UserResDTO = {
        _id: user._id.toString(),
        name: user.name,
      };

      return handlerResSuccess<UserResDTO>(FIND_USER_BY_ID_SUCCESS, userRes);
    } catch (error: any) {
      console.log("error: ", error);
      return handleResFailure(
        error.error ? error.error : ERROR_GET_USER_BY_ID,
        error.statusCode ? error.statusCode : HttpStatus.BAD_REQUEST
      );
    }
  }
}
