export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _clearContainer() {
    this._container.innerHTML = "";
  }

  addItemPrepend(element) {
    this._container.prepend(element);
  }

  addItemAppend(element) {
    this._container.append(element);
  }

  renderItems(cards) {
    this._clearContainer();
    cards.forEach((card) => {
      this._renderer(card);
    });
  }
}
