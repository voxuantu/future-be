import Product, { IProductModel } from "../models/product";

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

      return newProduct as IProductModel;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  static async getProducts() {
    try {
      const products = await Product.find({});

      return products as IProductModel[];
    } catch (error) {
      console.log("error: ", error);
    }
  }
}
