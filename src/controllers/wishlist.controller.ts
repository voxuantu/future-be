import { Controller, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { WishlistService } from "../services/wishlist.service";

@Tags("Wishlist")
@Route("wishlist")
export class ProductsController extends Controller {
  //CHỈ THỰC HIỆN TRÊN INTERFACE CỦA WISHLIST NÊN KHÔNG CÓ ROUTE
  @Post()
  public async insertWishlistItem(@Path() userId: string, productId: string) {
    return WishlistService.insert(userId, productId);
  }
  @Post()
  public async deleteWishlistItem(@Path() userId: string, productId: string) {
    return WishlistService.delete(userId, productId);
  }
  @Put()
  public async updateWishlistItem(@Path() userId: string, productId: string) {
    return WishlistService.update(userId, productId);
  }
}
