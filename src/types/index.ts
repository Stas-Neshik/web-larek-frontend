export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';









export interface IAppData {
  catalog: IProduct[];
  basket: string[];
  order: IOrder;
}

export interface Ipage {
  count: number,
  catalog: HTMLElement
}

export interface IDeliveryForm {
	payment: string; 
	address: string; 
}

export interface IContactsForm {
	email: string; 
	phone: string; 
}

export interface IOrder extends IDeliveryForm, IContactsForm {
  total: number,
  items: string[],
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IProductList<Type> {
  total : number;
  items : IItem[];
}

export interface IProduct {
  category: string;
  description : string;
  image : string;
  title : string;
  id : string;
  price : number | null;
  index?: number
}

export interface IItem {
  category: string;
  description : string;
  image : string;
  title : string;
  id : string;
  price : number | null;
  index?: number
}

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface IOrderTotal {
	payment: string;
	email?: string;
	phone?: string;
	address: string;
}

export interface IBasket {
	items: HTMLElement[]; // массив карточек в корзине
	total: number; // сумма заказа
}

export interface IOrderres extends IOrderTotal {
	items: string[];
	total: number;
}



export interface CardActions {
	onClick: (event: MouseEvent) => void;
}



export interface IModal {
	content: HTMLElement;
}


export interface IForm {
	valid: boolean;
	errors: string[];
}


export interface IFinishOrder {
	total: number;
}

export interface IFinishOrderActions {
	onClick: () => void;
}


export interface IOrderResult {
	total: number; // идентификатор заказа
}