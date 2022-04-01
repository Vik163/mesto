//
export class Card {
  constructor(text, image, cardSelector, openImagePopup, openDeleteCardPopup) {
    this._text = text;
    this._image = image;
    this._cardSelector = cardSelector;
    this.openImagePopup = openImagePopup;
    this.openDeleteCardPopup = openDeleteCardPopup;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this._element.querySelector(".card__title").textContent = this._text;

    return this._element;
  }

  _getTemplateBasket() {
    const cardBasket = document
      .querySelector(".card-basket-template")
      .content.querySelector(".card__basket")
      .cloneNode(true);
    return cardBasket;
  }

  addRemoveCard() {
    this.cardBasket = this._getTemplateBasket();

    this.cardBasket.addEventListener("click", () => {
      this.openDeleteCardPopup(this._element);
    });
    this._renderBasket();
  }

  _renderBasket() {
    this._cardImage.after(this.cardBasket);
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__icon");
    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });
    this._cardImage.addEventListener("click", () => {
      this.openImagePopup(this._text, this._image);
    });
  }

  _toggleLike() {
    this._likeButton.classList.toggle("card__icon_active");
  }

  deleteCard(element) {
    this._element = element;

    this._element.remove();
    this._element = null;
  }
}