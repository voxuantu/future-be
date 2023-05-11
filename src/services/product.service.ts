/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import {
  CREATE_PRODUCT_SUCCESS,
  ERROR_CREATE_PRODUCT,
  ERROR_PRODUCT_NOT_FOUND,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_SUCCESS,
} from "../constances";
import { HttpStatus } from "../constances/enum";
import Product, { IProductModel } from "../models/product";
import { handleResFailure, handlerResSuccess } from "../utils/handle-response";

export class ProductService {
  static async createProduct() {
    try {
      const newProduct = new Product({
        name: "slkdjfwioe",
        category: "6444a0fdcdcd8f39b4f5dfb5",
        price: 123132,
        quantity: 100,
        description: "sldkjfw",
        rating: 0,
        images: [],
      });

      await newProduct.save();

      return handlerResSuccess(
        CREATE_PRODUCT_SUCCESS,
        newProduct as IProductModel
      );
    } catch (error: any) {
      return handleResFailure(
        error.error || ERROR_CREATE_PRODUCT,
        error.statusCode || HttpStatus.BAD_REQUEST
      );
    }
  }

  static async getProducts() {
    try {
      const products = await Product.find({});

      return handlerResSuccess(
        GET_PRODUCT_SUCCESS,
        products as IProductModel[]
      );
    } catch (error: any) {
      return handleResFailure(
        error.error || ERROR_PRODUCT_NOT_FOUND,
        error.statusCode || HttpStatus.NOT_FOUND
      );
    }
  }

  static async getProductById(id: string) {
    try {
      const product = await Product.findById(id).populate({
        path: "comments",
        select: "user content createdAt rate",
        populate: {
          path: "user",
          select: "avatar name",
        },
      });

      return handlerResSuccess(
        GET_PRODUCT_BY_ID_SUCCESS,
        product as IProductModel
      );
    } catch (error: any) {
      return handleResFailure(
        error.error || ERROR_PRODUCT_NOT_FOUND,
        error.statusCode || HttpStatus.NOT_FOUND
      );
    }
  }

  static async checkCategoryIdIsBeingUsed(categoryId: string) {
    const products = await Product.find({
      category: new mongoose.Types.ObjectId(categoryId),
    });

    return products.length > 0 ? true : false;
  }
}
