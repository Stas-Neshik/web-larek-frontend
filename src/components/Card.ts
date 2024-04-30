import { ICardActions, IItem } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

export class Card extends Component<IItem> {

  protected _category: HTMLElement;
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLElement;
  protected _categoryColors = <Record<string, string>>{
		'софт-скил': 'soft',
		'другое': 'other',
		'дополнительное': 'additional',
		'кнопка': 'button',
		'хард-скил': 'hard',
	};

  constructor (container: HTMLElement, action? : ICardActions) {
    super(container);
    this._category = container.querySelector(`.card__category`);
    this._title = ensureElement<HTMLElement>(`.card__title`, container);
		this._image = container.querySelector(`.card__image`);
		this._price = ensureElement<HTMLImageElement>(`.card__price`, container);

    if (action?.onClick) {
			container.addEventListener('click', action.onClick);
		}

  }

  set category(value: string) {
		this.setText(this._category, value);
		this._category.className = `card__category card__category_${this._categoryColors[value]}`;
	}

  set title(value: string) {
		this.setText(this._title, value);
	}

  set image(value: string) {
		this.setImage(this._image, value);
	}

  set price(value: number) {
		value === null ? this.setText(this._price, `Бесценно`) 
    : this.setText(this._price, `${value} синапсов`);
	}

}