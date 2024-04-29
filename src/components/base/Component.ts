

export abstract class Component<T> {

  constructor(protected readonly container: HTMLElement) {}

  // Устанаилвает текстовое содержимое на элемент.
setText (element:HTMLElement, value: string) {
  element.textContent = value;
}
  // Устанаилвает адрес картинки.
setImage(element:HTMLImageElement, value:string, alt?:string) {
  element.src = value;
  if(alt) {
    element.alt = alt;
  }
}
  // Возвращаем элемент
render(data?: Partial<T>):HTMLElement {
  Object.assign(this as object, data ?? {});
  return this.container;
}


// `toggle` - переключает класс у элемента.
// `setDisabled` - делает элемент неактивным.
// `setHiddet` - делает элемент скрытым.
// `setVisible` - делает элемент видимым.
}