import { ICardActions } from "../types";
import { Card } from "./Card";

export class BusketItem extends Card {
buttonElement: HTMLButtonElement
protected _index: HTMLElement

constructor(container: HTMLElement, action?: ICardActions) {
  super(container)
  this._index = container.querySelector(`.basket__item-index`);
  this.buttonElement = container.querySelector(`.card__button`);

  if (action?.onClick) {
    if (this.buttonElement) {
      container.addEventListener('click', action.onClick);
    }
  }

}

set index (value: number) {
  this.setText(this._index, String(value))
}
}