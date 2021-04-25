export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
    _clearContainer() {
      this._container.innerHTML = '';
    }
    
    addItemPrepend(element) {
      this._container.prepend(element);
    }

    addItemAppend(element) {
      this._container.append(element);
    }
  
    renderItems() {
      this._clearContainer();
      this._renderedItems.forEach(item => {
        this._renderer(item);
      });
    }
  }