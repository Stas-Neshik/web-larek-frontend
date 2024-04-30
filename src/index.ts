import './scss/styles.scss';
import { ApiData } from './components/ApiData';
import { AppData } from './components/AppData';
import { BusketItem } from './components/BusketItem';
import { Card } from './components/Card';
import { CardPreview } from './components/CardPreview';
import { Modal } from './components/Modal';
import { ModalBasket } from './components/ModalBasket';
import { Page } from './components/Page';
import { EventEmitter } from './components/base/events';
import { IContactsForm, IDeliveryForm, IItem, IOrder } from './types';
import { CDN_URL, API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import {Order} from './components/Order'
import { Contacts } from './components/Contacts';
import { Success } from './components/Success';

// Брокер событий
const events = new EventEmitter();
// Работа с сервером getData()
const api = new ApiData(CDN_URL, API_URL);

events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});


// Все Темплейты. 
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
// Все Темплейты. 

// Классы модальных окон. 
const basket = new ModalBasket(cloneTemplate<HTMLTemplateElement>(basketTemplate),events);
const order = new Order(cloneTemplate<HTMLFormElement>(orderTemplate), events);


// контейнер с данными и с их обработкой.
const appData = new AppData({}, events);

// Контейнеры. 
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);




// Рендерринг карточек на главную страницу после события 'items:changed'. 
events.on('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});
// Рендерринг карточек на главную страницу после события 'items:changed'. 






// Первое модальное окно с информацией о карточке.
events.on('card:select', (item: IItem) => {
	const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => events.emit('card:add', item),
	});
	modal.render({
		content: card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
			description: item.description,
		}),
	});

	// Проверка на есть ли товар в корзине, есть ли цена.
	if (item.price === null) {
		card.setDisabled(card.buttonElement, true);
		card.changeBasketName('Не продается');
	} else if (appData.isInBasket(item)) {
		card.setDisabled(card.buttonElement, true);
		card.changeBasketName('Уже в корзине');
	}
});

// Добавление товара в корзину, счетчик товаров в корзине. 
events.on('card:add', (item: IItem) => {
	appData.addItemOrder(item);
	appData.addToBusket(item);
	page.counter = appData.basket.length;
	modal.close();
});
// Первое модальное окно с информацией о карточке.

// открытие корзины
events.on('basket:open', () => {
	basket.total = appData.getTotalPrice();
console.log(basket.total) // сюда не приходит 

	
	basket.setDisabled(basket.button, appData.isBasketEmpty);
	let i = 1;



	basket.items = appData.basket.map((item) => {
		console.log(item.price)
		
		const card = new BusketItem(cloneTemplate(cardBasketTemplate), {
			onClick: () => events.emit('card:remove', item),
		});
		return card.render({
			title: item.title,
			price: item.price,
			index: i++,
		});
	});
	modal.render({
		content: basket.render(),
	});
});
// открытие корзины

// удаление товара из корзины
events.on('card:remove', (item: IItem) => {
	appData.removeInBusket(item);  
	appData.removeItemOrder(item); 
	page.counter = appData.basket.length;
	basket.setDisabled(basket.button, appData.isBasketEmpty);
	basket.total = appData.getTotalPrice();
	let i = 1;


	basket.items = appData.basket.map((item) => {
		const card = new BusketItem(cloneTemplate(cardBasketTemplate), {
			onClick: () => events.emit('card:remove', item),
		});
		return card.render({
			title: item.title,
			price: item.price,
			index: i++,
		});
	});
	modal.render({
		content: basket.render(),
	});
});
// удаление товара из корзины


// Рендер оформление заказа
events.on('order:open', () => {
	modal.render({
		content: order.render({
			address: '',
			payment: '',
			valid: false,
			errors: [],
		}),
	});
});

// Рендер заполнения контактов 
events.on('order:submit', () => {
	appData.order.total = appData.getTotalPrice();
	modal.render({
		content: contacts.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});


// запуск валидации 
events.on('formErrors:change', (errors: Partial<IOrder>) => {
	const { email, phone, address, payment } = errors;
	order.valid = !address && !payment;
	contacts.valid = !email && !phone;
	order.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});
// запуск валидации


// реакция на выбор способа оплаты
events.on('payment:change', (item: HTMLButtonElement) => {
	appData.order.payment = item.name;
	appData.validateOrder();
});
// реакция на выбор способа оплаты


// Изменение поля ввода доставки
events.on(
	/^order\..*:change/,
	(data: { field: keyof IContactsForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);
// Изменение поля ввода доставки

// Изменение поля ввода контактов
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IDeliveryForm; value: string }) => {
		appData.setContactsField(data.field, data.value);
	}
);
// Изменение поля ввода контактов




// Отправляем форму контактов и открываем окно с успешным заказом.
events.on('contacts:submit', () => {
	api.makeOrder(appData.order)
		.then((res) => {
			const success = new Success(cloneTemplate(successTemplate), {onClick: () => {
					modal.close();
				},
			});

			modal.render({content: success.render({total: res.total,}),
			});

			appData.clearBasket();
			page.counter = 0;
		})
		.catch((err) => {
			console.error(err);
		});
});
events.on('items:test', (item) => {
	console.log(item);
});
// Отправляем форму контактов и открываем окно с успешным заказом.





// Отключаем возможность прокрутки страницы.
events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});
// Включаем возможность прокрутки страницы.



// Сохраняем карточки в appData, инициируем событие items:changed. 
api
	.getData()
	.then(appData.setCatalog.bind(appData));
// Сохраняем карточки в appData, инициируем событие items:changed. 