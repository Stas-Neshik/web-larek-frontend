import { CardActions, IItem } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./Component";

export class Card extends Component<IItem> {

  categoryElement: HTMLElement;
  imageElement : HTMLElement;
  _titleElement : HTMLElement;
  priceElement : HTMLElement;


  constructor(container:HTMLElement, name: string, action: CardActions) {
    super(container)
    this.categoryElement = ensureElement<HTMLElement>(`${name}__category`, container);
    this.imageElement = ensureElement<HTMLImageElement>(`${name}__image`, container);
    this._titleElement = ensureElement<HTMLElement>(`${name}__title`, container);
    this.priceElement = ensureElement<HTMLElement>(`${name}__price`, container);
    container.addEventListener('click', action.onClick)
  }

  set category(value:string) {
    this.setText(this.categoryElement, value)
  }

  // set image(value:string) {
  //   this.setText(this.categoryElement, value)
  // }

  set title(value:string) {
    this.setText(this._titleElement, value)
  }

  set price(value:string) {
    this.setText(this.priceElement, value)
  }


 

}