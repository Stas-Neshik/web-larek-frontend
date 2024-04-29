import { IAppData, IItem, IOrder } from "../types";
import { Model } from "./base/Model";


export class AppData extends Model<IAppData>{
  protected items: IItem[] = [];
  protected basket: IItem[] = [];
  protected order: IOrder = {
    total: 0,
		items: [],
		payment: '',
		address: '',
		email: '',
		phone: '',
  }

  addItems(items:IItem[]): void {
    this.items = items;
    this.emitChanges(`cards:changed`);
  }

  addItemOrder(item: IItem): void {
    this.order.items.push(item._id);
  }

  removeItemOrder(item:IItem): void {
		const index = this.order.items.indexOf(item._id);
		if (index >= 0) {
			this.order.items.splice(index, 1);
		}
  }

	addBasket(item: IItem): void {
		this.basket.push(item);
	}

  removeInBusket(item: IItem): void {
		const index = this.basket.indexOf(item);
		if (index >= 0) {
			this.basket.splice(index, 1);
		}
  }

  getTotalPrice() {
		return this.order.items.reduce(
			(accumulator, currentValue) => accumulator + this.items.find((it) => it._id === currentValue).price,
			0
		);
  };

  validateOrder() {

  }

  validateContacts() {
    
  }

}