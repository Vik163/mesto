//
export class Card {
  constructor(text, image, cardSelector) {
    this._text = text;
    this._image = image;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__image").alt = this._text;
    this._element.querySelector(".card__title").textContent = this._text;
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__basket")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._element.querySelector(".card__icon").addEventListener("click", () => {
      this._toggleLike();
    });
  }

  _toggleLike() {
    this._element
      .querySelector(".card__icon")
      .classList.toggle("card__icon_active");
  }

  _deleteCard() {
    this._element.closest(".card").remove();
  }
}
