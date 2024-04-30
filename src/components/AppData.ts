import { FormErrors, IAppData, IContactsForm, IDeliveryForm, IItem, IOrder, IProduct } from "../types";
import { Model } from "./base/Model";

// Класс AppData является контейнером с данными, умеет работать с ними.

export class AppData extends Model<IAppData>{
	catalog: IProduct[];
	basket: IProduct[] = [];
	formErrors: FormErrors = {};
	order: IOrder = {
		total: 0,
		items: [],
		payment: '',
		address: '',
		email: '',
		phone: '',
	};

	// Добавляем карточки.
	setCatalog(items: IProduct[]) {
		this.catalog = items;
		this.emitChanges('items:changed');
	}


	addItemOrder(item: IProduct) {
		this.order.items.push(item.id);
		console.log(this.order.items);
	}

	removeItemOrder(item: IProduct) {
		const index = this.order.items.indexOf(item.id);
		if (index >= 0) {
			this.order.items.splice(index, 1);
		}
	}

	addToBusket(item: IProduct) {
		this.basket.push(item);
	}

	removeInBusket(item: IProduct) {
		const index = this.basket.indexOf(item);
		if (index >= 0) {
			this.basket.splice(index, 1);
		}
	}

	clearBasket() {
		this.basket = [];
		this.order.items = [];
	}

	getTotalPrice() {
		return this.order.items.reduce(
			(a, c) => a + this.catalog.find((it) => it.id === c).price,
			0
		);
	}

	setOrderField(field: keyof IContactsForm, value: string) {
		this.order[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	setContactsField(field: keyof IDeliveryForm, value: string) {
		this.order[field] = value;

		if (this.validateContacts()) {
			this.events.emit('order:ready', this.order);
		}
	}

	isInBasket(item: IProduct) {
		return this.basket.includes(item);
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}

		if (!this.order.payment) {
			errors.address = 'Необходимо выбрать способ оплаты';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateContacts() {
		const errors: typeof this.formErrors = {};

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}

		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	get isBasketEmpty(): boolean {
		return this.basket.length === 0;
	}

}