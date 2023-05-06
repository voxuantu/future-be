import mongoose, {
  Document,
  Schema,
  SchemaTimestampsConfig,
  model,
} from "mongoose";
import { IProductModel } from "./product";

export interface IWishlistItem {
  product: string | IProductModel;
  image: string;
  name: string;
  price: number;
  stock: boolean;
}

export interface IWishlistItemModel
  extends IWishlistItem,
    Document,
    SchemaTimestampsConfig {}

export const WishlistItemSchema: Schema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, require: true, ref: "Product" },
    image: { type: String, require: true },
    name: { type: String, require: true },
    price: { type: Number, require: true },
    stock: { type: Boolean, require: true },
  },
  { timestamps: true }
);

const WishlistItem = model<IWishlistItemModel>(
  "FavoriteItem",
  WishlistItemSchema
);

export default WishlistItem;
