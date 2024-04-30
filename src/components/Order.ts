import { IDeliveryForm } from "../types";
import { ensureAllElements } from "../utils/utils";
import { Form } from "./Form";
import { IEvents } from "./base/events";

export class Order extends Form<IDeliveryForm> {
  paymentButtons: HTMLButtonElement[];

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
    this.paymentButtons = ensureAllElements<HTMLButtonElement>('.button_alt',container);

    this.paymentButtons.forEach((button) => {
			button.addEventListener('click', () => {
				this.payment = button.name;
				events.emit('payment:change', button);
			});
		});

  }

  set payment(name: string) {
		this.paymentButtons.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === name);
		});
	};

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	};
}