import { Controller, FormField, Post, Route, Tags, UploadedFile } from "tsoa";
import { CategoryService } from "../services/category.service";

@Tags("Categories")
@Route("categories")
export class CategoryController extends Controller {
  @Post()
  public createCategory(
    @FormField() name: string,
    @UploadedFile("file") file: Express.Multer.File
  ) {
    return CategoryService.create(name, file);
  }
}
