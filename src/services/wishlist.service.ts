import {
  ERROR_PRODUCT_NOT_FOUND,
  ERROR_USER_NOT_FOUND,
  DELETE_WISHLIST_ITEM_SUCCESS,
  ERROR_WISHLIST_ITEM_NOT_FOUND,
  INSERT_WISHLIST_ITEM_SUCCESS,
  UPDATE_WISHLIST_ITEM_SUCCESS,
} from "../constances";
import { HttpStatus } from "../constances/enum";
import Product from "../models/product";
import User from "../models/user";
import WishlistItem, { IWishlistItemModel } from "../models/wishlist-item";
import { handleResFailure, handlerResSuccess } from "../utils/handle-response";

export class WishlistService {
  static async insert(userId: string, productId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const product = await Product.findById(productId);
      if (!product) {
        return handleResFailure(ERROR_PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const wishlist = user.wishlist as IWishlistItemModel[];

      const newWishlistItem = new WishlistItem({
        product: product.id,
        image: product.thumbnail,
        name: product.name,
        price: product.price,
        stock: false, //ĐỢI LÀM CART SẼ SET THEO LOGIC
      });
      wishlist.push(newWishlistItem);
      await User.updateOne({ _id: userId }, { $set: { wishlist: wishlist } });
      return handlerResSuccess(INSERT_WISHLIST_ITEM_SUCCESS, HttpStatus.OK);
    } catch (error) {
      console.log("error: ", error);
    }
  }
  static async delete(userId: string, productId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      const wishlist = user.wishlist;
      if (!wishlist) {
        return handleResFailure(
          ERROR_WISHLIST_ITEM_NOT_FOUND,
          HttpStatus.NOT_FOUND
        );
      }
      const itemIndex = (wishlist as IWishlistItemModel[]).findIndex((item) => {
        return item.product == productId;
      });

      wishlist.splice(itemIndex, 1);
      await User.updateOne({ _id: userId }, { $set: { wishlist: wishlist } });
      return handlerResSuccess(DELETE_WISHLIST_ITEM_SUCCESS, HttpStatus.OK);
    } catch (error) {
      console.log("error: ", error);
    }
  }
  // UPDATE DÙNG ĐỂ CHUYỂN ĐỔI TRẠNG THÁI IN STOCK | OUT STOCK
  static async update(userId: string, productId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return handleResFailure(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      const wishlist = user.wishlist;
      if (!wishlist) {
        return handleResFailure(
          ERROR_WISHLIST_ITEM_NOT_FOUND,
          HttpStatus.NOT_FOUND
        );
      }
      (wishlist as IWishlistItemModel[]).findIndex((item) => {
        if (item.product == productId) {
          item.stock = !item.stock;
        }
      });

      await User.updateOne({ _id: userId }, { $set: { wishlist: wishlist } });
      return handlerResSuccess(UPDATE_WISHLIST_ITEM_SUCCESS, HttpStatus.OK);
    } catch (error) {
      console.log("error: ", error);
    }
  }
}
