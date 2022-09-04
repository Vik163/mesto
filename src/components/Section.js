export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Отображение массива карточек --------------------
  renderItems(data) {
    data.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }

  // Вставить карточку в контейнер -------------------
  addItem(item) {
    this._container.prepend(item);
  }
}
