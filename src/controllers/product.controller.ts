// src/users/usersController.ts
import {
  Controller,
  Get,
  Post,
  Route,
  Tags,
  Path,
  Body,
  FormField,
  UploadedFiles,
  Put,
  Delete,
  UploadedFile,
} from "tsoa";
import { ProductService } from "../services";
import { CreateProductDTO, UpdateProductDTO } from "../dto/request/product.dto";

@Tags("Products")
@Route("products")
export class ProductsController extends Controller {
  @Post()
  public async createProduct(
    @FormField("name") name: string,
    @FormField("category") category: string,
    @FormField("quantity") quantity: number,
    @FormField("price") price: number,
    @FormField("description") description: string,
    @UploadedFiles("images")
    images: Express.Multer.File[],
    @UploadedFile("thumbnail")
    thumbnail: Express.Multer.File
  ) {
    const dto: CreateProductDTO = {
      category,
      description,
      name,
      price,
      quantity,
    };
    return ProductService.createProduct(dto, thumbnail, images);
  }

  @Put("/{productId}")
  public updateProduct(
    @Path("productId") productId: string,
    @FormField("name") name?: string,
    @FormField("category") category?: string,
    @FormField("quantity") quantity?: number,
    @FormField("price") price?: number,
    @FormField("description") description?: string,
    @UploadedFiles("images")
    images?: Express.Multer.File[]
  ) {
    const dto: UpdateProductDTO = {
      name,
      category,
      price,
      quantity,
      description,
    };
    return ProductService.updateProduct(productId, dto, images ? images : []);
  }

  @Delete("/{productId}")
  public deleteProduct(@Path("productId") productId: string) {
    return ProductService.deleteProduct(productId);
  }

  @Get()
  public async getProducts() {
    return ProductService.getProducts();
  }

  @Get("/{productId}")
  public async getProductById(@Path() productId: string) {
    return ProductService.getProductById(productId);
  }
}
