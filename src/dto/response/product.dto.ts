export class ProdutResDTO {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
  price: number;
  quantity: number;
}

export class ProductUpdateRes {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  thumbnail: string;
  images: string[];
}
