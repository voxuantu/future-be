import {
  Controller,
  Post,
  Route,
  Security,
  Tags,
  Request,
  Path,
  Delete,
} from "tsoa";
import { WishlistService } from "../services/wishlist.service";
import { IGetUserAuthInfoRequest } from "../types/express";

@Tags("Wishlist")
@Route("wishlist")
export class WishlistController extends Controller {
  @Security("jwt", ["user"])
  @Post("/{productId}")
  public async insertWishlistItem(
    @Request() request: IGetUserAuthInfoRequest,
    @Path() productId: string
  ) {
    return WishlistService.insert(request.user.userId, productId);
  }
  @Security("jwt", ["user"])
  @Delete("/{productId}")
  public async deleteWishlistItem(
    @Request() request: IGetUserAuthInfoRequest,
    @Path() productId: string
  ) {
    return WishlistService.delete(request.user.userId, productId);
  }
}
