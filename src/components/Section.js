export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data) {
    data.forEach((item) => {
      this.addItem(this._renderer(item));
      this.addNumLikes(item);
    });
  }

  addNumLikes(obj) {
    document.querySelector(".card__likes-num").textContent = obj.likes.length;
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
