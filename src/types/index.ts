

export interface IAppData {
  catalog: IItem[],
  basket: string[],
  order: IOrder
}

export interface IOrder {
  total: number,
  items: string[],
}


export interface IProductList<Type> {
  total : number;
  items : IItem[];
}


export interface IItem {
  category: string;
  product : string;
  description : string;
  image : string;
  title : string;
  _id : string;
  price : number | null;
}


export interface IOrderTotal {
	payment: string;
	email?: string;
	phone?: string;
	address: string;
}

export interface IOrder extends IOrderTotal {
	items: string[];
	total: number;
}

export interface IOrderres extends IOrderTotal {
	items: string[];
	total: number;
}



export interface CardActions {
	onClick: (event: MouseEvent) => void;
}

export type TCardInfoModal = Pick<IItem, 'image' | 'description' | 'category' | 'product' | 'price'>;



