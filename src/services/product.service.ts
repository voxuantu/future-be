/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  ERROR_CATEGORY_NOT_FOUND,
  ERROR_CREATE_PRODUCT,
  ERROR_DELETE_PRODUCT,
  ERROR_PRODUCT_NOT_FOUND,
  ERROR_UPDATE_PRODUCT,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
} from "../constances";
import { HttpStatus } from "../constances/enum";
import { CreateProductDTO, UpdateProductDTO } from "../dto/request/product.dto";
import { ProdutResDTO } from "../dto/response/product.dto";
import Product, { IProductModel } from "../models/product";
import { handleResFailure, handlerResSuccess } from "../utils/handle-response";
import { CategoryService } from "./category.service";
import { CloudinaryService } from "./cloudinary.service";

export class ProductService {
  static async createProduct(
    dto: CreateProductDTO,
    thumbnail: Express.Multer.File,
    images: Express.Multer.File[]
  ) {
    try {
      const cateFound = await CategoryService.findCategoryById(dto.category);
      if (!cateFound) {
        return handleResFailure(ERROR_CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const imageURLs: string[] = [];
      for (const img of images) {
        const { public_id } = await CloudinaryService.upload(img, "products");
        imageURLs.push(public_id);
      }
      const thumbnailUpload = await CloudinaryService.upload(
        thumbnail,
        "products"
      );

      const newProduct = new Product({
        name: dto.name,
        category: dto.category,
        price: dto.price,
        quantity: dto.quantity,
        description: dto.description,
        rating: 0,
        images: imageURLs,
        thumbnail: thumbnailUpload.public_id,
      });

      const productRes: ProdutResDTO = {
        _id: newProduct.id,
        category: {
          _id: cateFound.id,
          name: cateFound.name,
        },
        name: newProduct.name,
        price: newProduct.price,
        quantity: newProduct.quantity,
      };

      await newProduct.save();

      return handlerResSuccess(CREATE_PRODUCT_SUCCESS, productRes);
    } catch (error: any) {
      console.log("error: ", error);
      return handleResFailure(
        error.error || ERROR_CREATE_PRODUCT,
        error.statusCode || HttpStatus.BAD_REQUEST
      );
    }
  }

  static async updateProduct(
    prodId: string,
    dto: UpdateProductDTO,
    images: Express.Multer.File[]
  ) {
    try {
      const { category, description, name, price, quantity } = dto;
      const product = await Product.findById(prodId);
      if (!product) {
        return handleResFailure(ERROR_PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      if (category) {
        const cateFound = await CategoryService.findCategoryById(category);
        if (!cateFound) {
          return handleResFailure(
            ERROR_CATEGORY_NOT_FOUND,
            HttpStatus.NOT_FOUND
          );
        }

        product.category = category;
      }

      if (description) {
        product.description = description;
      }
      if (name) {
        product.name = name;
      }
      if (price) {
        product.price = price;
      }
      if (quantity) {
        product.quantity = quantity;
      }

      if (images.length > 0) {
        for (const img of product.images) {
          await CloudinaryService.deleteImage(img);
        }
        product.images = [];

        for (const img of images) {
          const { public_id } = await CloudinaryService.upload(img, "products");
          product.images.push(public_id);
        }
      }

      await product.save();

      return handlerResSuccess(
        UPDATE_PRODUCT_SUCCESS,
        product as IProductModel
      );
    } catch (error: any) {
      console.log("error: ", error);
      return handleResFailure(
        error.error || ERROR_UPDATE_PRODUCT,
        error.statusCode || HttpStatus.BAD_REQUEST
      );
    }
  }

  static async deleteProduct(productId: string) {
    try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return handleResFailure(ERROR_PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      for (const img of product.images) {
        await CloudinaryService.deleteImage(img);
      }

      return handlerResSuccess(DELETE_PRODUCT_SUCCESS, productId);
    } catch (error) {
      console.log("error: ", error);
      return handleResFailure(ERROR_DELETE_PRODUCT, HttpStatus.BAD_REQUEST);
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
}
