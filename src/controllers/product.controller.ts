// src/users/usersController.ts
import { Controller, Get, Post, Route, Tags, Path } from "tsoa";
import { ProductService } from "../services";

@Tags("Products")
@Route("products")
export class ProductsController extends Controller {
  @Post()
  public async createProduct() {
    return ProductService.createProduct();
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
