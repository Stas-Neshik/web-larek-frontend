

export abstract class Component<T> {

  constructor(protected readonly container: HTMLElement) {}


  // Устанаилвает textContent элементу.
setText (element:HTMLElement, value: string) {
  element.textContent = value;
}
  // Устанаилвает src/alt картинке.
setImage(element:HTMLImageElement, value:string, alt?:string) {
  element.src = value;
  if(alt) {
    element.alt = alt;
  }
}
  // Возвращает элемент
render(data?: Partial<T>):HTMLElement {
  Object.assign(this as object, data ?? {});
  return this.container;
}

// Делает элемент неактивным.
setDisabled(element: HTMLElement, state: boolean) {
  if (element) {
    if (state) element.setAttribute('disabled', 'disabled');
    else element.removeAttribute('disabled');
  }
}

protected setHidden(element: HTMLElement) {
  element.style.display = 'none';
}

protected setVisible(element: HTMLElement) {
  element.style.removeProperty('display');
}


toggleClass(element: HTMLElement, className: string, force?: boolean) {
  element.classList.toggle(className, force);
}
}