export interface IOrderHistoryRes {
  _id: string;
  shortId: string;
  total: number;
  createdAt: string;
  firstProduct: {
    _id: string;
    name: string;
    thumbnail: string;
    quantity: number;
    price: number;
  };
  orderItemsLength: number;
}

export interface ICreateMAC {
  app_id: number;
  app_trans_id: string;
  app_user: string;
  amount: number;
  app_time: number;
  embed_data: JSON;
  item: JSON[];
}
