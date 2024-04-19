# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей (поправил)
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных, используемые в приложении


Список товаров.
```
export interface IProductList {
  total : number;
  items : IItem[];
}
```

Карточка товара.
```
export interface IItem {
  category: string;
  product : string;
  description : string;
  image : string;
  title : string
  _id : string;
  price : number;
}
```

Корзина.
```
export interface IBusket {
  total: number;
  items : TItems[];
  payment: string;
  email: string;
  phone: string;
  address: string;
}
```


Массив товаров.
```
TItems = Pick<IProductList, 'items'>;
```

Информация о товаре в модальном окне.
```
export type TCardInfoModal = Pick<ICard, 'image' | 'description' | 'category' | 'product' | 'price'>;
```

Модальное окно адреса.
```
export type TAdessModal = Pick<IBusket, 'address'>;
```

Модальное окно контактов.
```
export type TContactsModal = Pick<IBusket, 'email' | 'phone'>;
```



## Архитектура приложения.
Код приложения разделен на слои в парадигме MPV. 
1. Слой представления View (отображение, работа с версткой).
2. Слой данны Modal (работа с данными).
3. Слой презентер (связывающее звено).

### Базовый код. 

#### Класс API.

Класс API предоставляет базовую логику работы с запросами. Он позволяет выполнять `GET` и `POST`, `DELETE` запросы к серверу.
Конструктор принимает 2 аргумента - адресс сервера, заголовки запроса (headers).

Методы: 

`GET` - Выполняет GET запрос к указанному URL. Возвращает ответ от сервера в виде объекта.
`POST` - Выполняет запрос в зависимости от переданного method. принимает на вход индпоинт, данные, вид запроса.  

#### Класс EventEmitter.

Класс представляет собой брокер событий, который позволяет отправлять и получать события между различными частями приложения. Это классическая реализация брокера событий, которая широко используется в разработке программного обеспечения.

Методы: 

`on` - Регистрирует функцию обратного вызова (callback) для обработки события (event). Функция обратного вызова будет вызываться каждый раз, когда происходит событие.\
`off` - Удаляет функцию обратного вызова (callback) из списка обработчиков события (event). Если функция обратного вызова не найдена, метод ничего не делает.\
`trigger` - Генерирует событие (event) с заданным контекстом (context). Контекст может быть использован для передачи дополнительной информации обработчикам события.\


### Слой данных. 

#### Class ItemsData.
Класс ItemsData предназначен для хранения данных о карточках товаров. Он обеспечивает удобный доступ к этим данным и позволяет инициировать события при изменении данных.\
Конструктор класса принимает данные, полученные с сервера, и брокер событий. Это позволяет классу ItemsData автоматически обновлять данные о товарах и инициировать соответствующие события.\

В полях класса хранятся следующие данные -
  - _total: number; - количество товаров.
  - _items: IItem[] - массив обьектов товаров. 
  - _preview: string | null - ID выбранного товара для показа в модальном окне.
  - getItem(ItemId:string): void; - возвращает карточку по ID.
  - events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных.
Геттеры позволяют получить данные из полей класса.


### Слой представления.
Классы представления отвечают за отображения внутри контейнера передаваемых данных.

#### Class Modal.

Реализует пустое модальное окно, в которое можно подставлять необходмсые DOM-узлы (template).\
Предоставляет метод `close` и `open` для открытия/закрытия модального окна.\
Устанавливает слушатели на клавиатуру и на клик, для закрытия модального окна на ESC, кнопку закрытия и overlay.\
constructor(selector: string, events: IEvents). Конструктор принимает HtmlElement modal-container для последующего его заполнения нужной информацией.

В полях класса хранятся следующие данные -

  - modal: HTMLElement
  - events: IEvents;


#### Class ModalItemInfo

Расширяет Class Modal. Предназначен для отображения информации о выбранном товаре.
Конструктор принимает HTMLTemplateElement для отображения карточки в нужном месте (главная страница, модальное окно с информацией, корзина класса Card)

В полях класса хранятся следующие данные -

  - submitButton: HtmlBHTMLButtonElement - кпопка добавления в корзину, закрывает модальное окно.
  - templateElement: HTMLTemplateElement -  элемент темплейт елемент card-preview. 
  - handleSubmit: Function : функция которая добавляет товар в корзину.

Методы класса - 

  - get form:HtmlElement - геттер для получения формы разметки.

#### Class ModalBusket

Расширяет Class Modal. Предназначен для отображения добавленных товаров в корзину.
Конструктор принимает HTMLTemplateElement basket для отображения информации о товарах, сформированной классом Card.


В полях класса хранятся следующие данные -

  - submitButton: HtmlBHTMLButtonElement - кпопка оформления в заказа, закрывает модальное окно и открывает модальное окно оформления заказа.
  - templateElement: HTMLTemplateElement -  элемент темплейт елемент card-preview.
  - busketItems: TItems[] - массив добавленных товаров.
  - busketIndex: number - счетчик заказанных товаров. (basket__item-index)
  - totalPrice: number - общая сумма заказа. 
  - handleSubmit: Function : функция которая переносит на окно оформления заказа. 

Методы класса - 

  - deleteItem - удаляет товар из корзины по клику.
  - setValid - деактивирует кнопку оформления заказа в случае отсутствия товаров. 
  - open(IItems): void - расширение родительского метода, принимает данные о товарах, которые используются для заполнения атрибутов элементов модального.

#### Class ModalOrder.
Расширяет Class Modal. Предназначен для оформления заказа.
Конструктор принимает HTMLTemplateElement order для оформления способа оплаты, адреса доставки.

В полях класса хранятся следующие данные - 

  - submitButton: HtmlBHTMLButtonElement - кпопка далее закрывающее модальное окно и открывающее модальное окно с контактами.
  - templateElement: HTMLTemplateElement -  элемент темплейт  card-preview.
  - onlinePayButton: HtmlBHTMLButtonElement - кнопка выбора способа оплаты. 
  - offlinePayButton: HtmlBHTMLButtonElement - кнопка выбора способа оплаты.
  - inputs: NodeListOf<HTMLInputElement> - коллекция полей ввода формы.
  - formName: string - имя формы. 
  - _form:HTMLFormElement - элемент формы. 

Методы класса - 

  - setValid - деактивирует кнопку далее в случае незаполненного инпута/ не contactsвыбранной кнопки оплаты
  - get form: HTMLElement - геттер для получения элемента формы. 
  - close (): void - расширяет родительский метод дополнительно при закрытии очищая поля формы и деактивируя кнопку.

#### Class ModalContacts.

Расширяет Class Modal. Предназначен заполнения формы контактов.
Конструктор принимает HTMLTemplateElement contacts для заполнения инпутов адреса доставки.

В полях класса хранятся следующие данные - 

  - submitButton: HtmlBHTMLButtonElement - кпопка далее - закрывает модальное окно и открывает следующее 
  - templateElement: HTMLTemplateElement -  элемент темплейт элемент contacts.
  - PayButton: HtmlBHTMLButtonElement - кнопка выбора оплатить.
  - inputs: NodeListOf<HTMLInputElement> - коллекция полей ввода формы.
  - formName: string - имя формы. 
  - _form:HTMLFormElement - элемент формы. 

Методы класса - 

  - setValid - деактивирует кнопку далее в случае незаполненного инпута/ не contactsвыбранной кнопки оплаты
  - get form: HTMLElement - геттер для получения элемента формы. 
  - close (): void - расширяет родительский метод дополнительно при закрытии очищая поля формы и деактивируя кнопку.


#### Class ModalSuccess.

Расширяет Class Modal. Предназначен для оповещения об удачной покупке, мне бы сделать такую покупку. (прим. автора)
Конструктор принимает HTMLTemplateElement success для отображения формы завершения заказа.

В полях класса хранятся следующие данные - 

  - submitButton: HtmlBHTMLButtonElement - кпопка завершающая оформление заказа и закрывающее модальное окно.
  - Price: number - итоговая стоимость заказа. 

  Методы класса - 

  - close (): void - расширяет родительский метод дополнительно вешая обработчик на кнопку submitButton. 

#### Class Card.

Отвечает за отображение карточки, хранит в себе категорию товара, наименование, картинку, цену, разметку, повторяет интерфейс `IItem`, также хранит разметку.
В конструктор передается DOM-элемент `template` и `EventEmitter`, В классе устанавливается слушатель событий для открытия подробной информации о карточке. \
Поля класса содержат элементы разметки карточки.

Методы класса - 

- setData(data:obj):void - заполнение атрибутов карточки. (возможно не нужен)
- render():HTMLElement - возвращает DOM-элемент заполненной карточки. 
- геттер - возвращает ID карточки. 

#### Class CardContainer.

Отвечает за блока с карточками на странице. Предоставляет метод `addCard(card:HTMLElement):void` и сеттер `container` для обновления содержимого (отрисовки всех карточек сразу). В конструктор принимает контейнер для размещения карточек (gallery); 

### Слой коммуникаций.

#### Класс AppApi.
Принимает в конструктор экземпляр класса `Api` и предоставляет методы реазилующие взаимодействие с бэкендом сервера. 

## Взаимодействие компонентов.

Код, описывающие взаимодействие представления и данных находится в `index.ts`, выполняющим роль презентера.\
Взаимодействие осуществляется за счет событий генерирумых в `index.ts` и брокера событий `EventEmitter`.\
В `index.ts` создаются экземпляры классов, затем настраиваются обработчики событий.\


*Список событий, которые могут генерироваться в системе.* \
*События изменения данных (генерируются классами модели данных).* 

-`cards:changed` - изменение массива карточек. 
-`card:seclected` - изменение карточки в модальном окне.

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами отвечающими за представление).*


- `card:select` - выбор карточки для отображения в модальном окне.
- `cardOrder:submit` - добавления товара в корзину, открытие корзины.
- `closeModal:button` - закрытие модального окна по крестику/оверлею/ESC.
- `busketButton:button` - открытие корзины.

- `item-delete:button` - удаление товара из корзины.
- `edit-busket:submit` - сохранение данных из формы оформления заказа.


- `edit-adres:input` - изменение данных в форме оформления заказа.
- `choosePayment:button`- выбор способа оплаты в форме оформления заказа. ?? 
- `edit-order:submit` - сохранение данных из формы оформления заказа.

- `edit-email:input` - изменение данных почты в форме заполнения контактов.
- `edit-phone:input` - изменение данных телефонного номера в форме заполнения контактов.
- `edit-contacts:submit` - сохранение данных из формы заполнения контактов.

- `finish:submit` - закрытие формы об успешной покупки. 
