export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open(item) {
    item.classList.add("popup_opened");
    // document.addEventListener("keydown", this._handleEscClose.bind(this));
  }
  // Пришлось отказаться от такого варианта. Не получается удалить слушатель.
  // Других вариантов решения не нашел.

  close(item) {
    item.classList.remove("popup_opened");
    // document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const activePopup = document.querySelector(".popup_opened");
      this.close(activePopup);
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose.bind(this));

    this._popupSelector.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("popup") ||
        e.target.classList.contains("popup__close")
      ) {
        this.close(e.target.closest(".popup"));
      }
    });
  }
}
