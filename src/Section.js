export default class Section  {
  constructor({items, renderer}, parentContainer) {
    this._items = items;
    this._renderer = renderer;
    this._parentContainer = parentContainer;
  }

  renderContainer() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._parentContainer.prepend(element);
  }
}
