export interface IProductList {
  total: number;
  items : IItem[];
  preview: string | null;
  getItem(ItemId:string): void;
}


export interface IItem {
  category: string;
  product : string;
  description : string;
  image : string;
  title : string
  _id : string;
  price : number;
}
:HTMLTemplateElement
:HTMLElement
:HTMLFormElement

export interface IBusket {
  total: number;
  items : TItems[];
  payment: string;
  email: string;
  phone: string;
  address: string;
  checkValidation(data: string):boolean;
}

export type TItems = Pick<IProductList, 'items'>;
export type TCardInfoModal = Pick<IItem, 'image' | 'description' | 'category' | 'product' | 'price'>;
export type TAdessModal = Pick<IBusket, 'address'>;
export type TContactsModal = Pick<IBusket, 'email' | 'phone'>;



