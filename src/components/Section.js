export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItem(card) {
    this._renderer(card);
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }
}
