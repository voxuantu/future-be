import {
  CREATE_CATEGORY_SUCCESS,
  ERROR_CATEGORY_EXISTED,
  ERROR_CREATE_CATEGORY,
} from "../constances/category-res-message";
import { HttpStatus } from "../constances/enum";
import { CategoryRes } from "../dto/response/category.dto";
import Category from "../models/category";
import { handleResFailure, handlerResSuccess } from "../utils/handle-response";
import HttpException from "../utils/http-exception";
import { CloudinaryService } from "./cloudinary.service";

export class CategoryService {
  static async create(name: string, image: Express.Multer.File) {
    try {
      const categoy = await Category.findOne({
        name: { $regex: name, $options: "i" },
      });

      if (categoy) {
        return handleResFailure(
          ERROR_CATEGORY_EXISTED,
          HttpStatus.NOT_ACCEPTABLE
        );
      }

      const res = await CloudinaryService.upload(image, "categories");

      const newCategory = await Category.create({
        name: name,
        image: res.public_id,
      });

      const result: CategoryRes = {
        _id: newCategory.id,
        name: newCategory.name,
        image: res.url,
      };

      return handlerResSuccess(CREATE_CATEGORY_SUCCESS, result);
    } catch (error: any) {
      return handleResFailure(
        error.error || ERROR_CREATE_CATEGORY,
        error.statuscode || HttpStatus.BAD_REQUEST
      );
    }
  }

  static async findCategoryById(id: string) {
    const cateFound = await Category.findById(id, "name");
    return cateFound;
  }
}
