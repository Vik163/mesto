//
export class Card {
  constructor(
    obj,
    { addLike, deleteLike },
    cardSelector,
    openImagePopup,
    openDeleteCardPopup
  ) {
    this._obj = obj;
    this._text = obj.name;
    this._image = obj.link;
    this._cardSelector = cardSelector;
    this.openImagePopup = openImagePopup;
    this.openDeleteCardPopup = openDeleteCardPopup;
    this.addLike = addLike;
    this.deleteLike = deleteLike;
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
      this.openDeleteCardPopup(this._obj, this._element);
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
    this._likeButton.classList.contains("card__icon_active")
      ? this.addLike(this._obj, this._element)
      : this.deleteLike(this._obj, this._element);
  }

  deleteCard(element) {
    this._element = element;

    this._element.remove();
    this._element = null;
  }
}
