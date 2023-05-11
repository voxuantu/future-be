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
