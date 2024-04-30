import { IItem, IOrder, IOrderResult, IProductList } from "../types";
import { Api } from "./base/api";

// Итоговый класс работы с сервером. 
export class ApiData extends Api {

  cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit ) {
    super(baseUrl, options)
    this.cdn = cdn;
  }

// Получаем обьект карточки.
	getData(): Promise<IItem[]> {
		return this.get('/product').then((data: IProductList<IItem>) =>  
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		)

	}

// Делаем заказ.
	makeOrder(value: IOrder): Promise<IOrderResult> {
		return this.post('/order', value).then((data: IOrderResult) => data);
	}

}