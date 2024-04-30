import { ICardActions } from '../types/index';
import { Card } from "./Card";

export class CardPreview extends Card {

  protected _description: HTMLElement;
	buttonElement: HTMLButtonElement;

  constructor (container:HTMLElement, action?: ICardActions) {
    super(container)
    this._description = container.querySelector(`.card__text`);
		this.buttonElement = container.querySelector(`.card__button`);

    if (action?.onClick) {
      if (this.buttonElement) {
        container.addEventListener('click', action.onClick);
      }
		}

  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  changeBasketName(value: string) {
		this.setText(this.buttonElement, value);
	}
}