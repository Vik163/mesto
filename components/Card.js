//
export class Card {
  constructor(text, image, cardSelector, openImagePopup) {
    this._text = text;
    this._image = image;
    this._cardSelector = cardSelector;
    this.openImagePopup = openImagePopup;
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
    this._cardImage = this._element.querySelector(".card__image");
    this._setEventListeners();

    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this._element.querySelector(".card__title").textContent = this._text;
    return this._element;
  }

  _setEventListeners() {
    this._cardIcon = this._element.querySelector(".card__icon");
    this._element
      .querySelector(".card__basket")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._cardIcon.addEventListener("click", () => {
      this._toggleLike();
    });
    this._cardImage.addEventListener("click", () => {
      this.openImagePopup(this._text, this._image);
    });
  }

  _toggleLike() {
    this._cardIcon.classList.toggle("card__icon_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
