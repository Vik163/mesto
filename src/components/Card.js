//
export class Card {
  constructor(
    obj,
    { addLike, deleteLike },
    cardSelector,
    profileAvatar,
    openImagePopup,
    openDeleteCardPopup,
    userId
  ) {
    this._obj = obj;
    this._text = obj.name;
    this._image = obj.link;
    this._cardSelector = cardSelector;
    this._profileAvatar = profileAvatar;
    this.openImagePopup = openImagePopup;
    this.openDeleteCardPopup = openDeleteCardPopup;
    this._userId = userId;
    this.addLike = addLike;
    this.deleteLike = deleteLike;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardBasket = this._element.querySelector(".card__basket");
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

    this._checkUserBasket();
    this._checkUserLike();
    this._addNumLikes();

    return this._element;
  }

  _checkUserBasket() {
    if (!(this._userId === this._obj.owner._id)) {
      this._cardBasket.style.display = "none";
    }
  }

  _setEventListeners() {
    this._cardBasket.addEventListener("click", () => {
      this.openDeleteCardPopup(this._obj, this._element);
    });
    this._likeButton = this._element.querySelector(".card__icon");
    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });
    this._cardImage.addEventListener("click", () => {
      this.openImagePopup(this._text, this._image);
    });
  }

  _checkUserLike() {
    this._obj.likes.forEach((item) => {
      if (item._id === this._userId) {
        this._likeButton.classList.add("card__icon_active");
      }
    });
  }

  _addNumLikes() {
    this._element.querySelector(".card__likes-num").textContent =
      this._obj.likes.length;
  }

  _toggleLike() {
    this._likeButton.classList.contains("card__icon_active")
      ? this.deleteLike(this._obj, this._element)
      : this.addLike(this._obj, this._element);
  }

  deleteCard(element) {
    this._element = element;

    this._element.remove();
    this._element = null;
  }
}
