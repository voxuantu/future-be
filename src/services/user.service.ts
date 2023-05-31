/* eslint-disable @typescript-eslint/no-explicit-any */
// src/users/usersService.ts
import {
  CREATE_USER_SUCCESS,
  ERROR_CREATE_USER,
  ERROR_GET_MY_ADDRESSES,
  ERROR_GET_USER_BY_ID,
  ERROR_USER_NOT_FOUND,
  FIND_USER_BY_ID_SUCCESS,
  GET_MY_ADDRESSES_SUCCESS,
} from "../constances";
import { HttpStatus } from "../constances/enum";
import { ICreateUser } from "../dto/request/user.dto";
import { UserResDTO } from "../dto/response/user.dto";
import { IProductModel } from "../models/product";
import User from "../models/user";
import { handleResFailure, handlerResSuccess } from "../utils/handle-response";
import { hashPasswords } from "../utils/hash-password";
import { AddressService } from "./address.service";

export class UsersService {
  static async create(userCreationParams: ICreateUser) {
    try {
      const user = new User({
        name: userCreationParams.name,
        email: userCreationParams.email,
        username: userCreationParams.username,
        password: hashPasswords(userCreationParams.password),
        birthday: new Date().toString(),
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

  static async wishlistProduct(userId: string) {
    try {
      const user = await User.findById(userId).populate("wishlist");

      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const result = user.wishlist as IProductModel[];
      return result;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  static async getMyAddresses(userId: string) {
    try {
      const user = await User.findById(userId);
      const addresses = await AddressService.getMany(
        user?.addresses as string[]
      );

      return handlerResSuccess(GET_MY_ADDRESSES_SUCCESS, addresses);
    } catch (error) {
      return handleResFailure(ERROR_GET_MY_ADDRESSES, HttpStatus.BAD_REQUEST);
    }
  }

  static async getCart(userId: string) {
    const user = await User.findById(userId).populate("cart.product");
    if (user) {
      for (const cartItem of user.cart) {
        console.log("cartItem: ", cartItem);
      }
    }

    return "haha";
  }
}
