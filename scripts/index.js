const popups = document.querySelector(".popups");
const popupEditProfile = popups.querySelector(".popup_type_profile");
const popupEditCards = popups.querySelector(".popup_type_cards");
const popupImage = popups.querySelector(".popup_type_image");
const popupImageOpen = popups.querySelector(".popup__image");
const popupImageCaption = popups.querySelector(".popup__caption");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCards = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const formElementProfile = document.querySelector(".popup__form_type_profile");
const nameInput = formElementProfile.querySelector(".popup__input_type_name");
const jobInput = formElementProfile.querySelector(
  ".popup__input_type_about-me"
);
const formElementCards = document.querySelector(".popup__form_type_cards");
const titleInput = formElementCards.querySelector(".popup__input_type_title");
const linkInput = formElementCards.querySelector(".popup__input_type_link");
const cardsContainer = document.querySelector(".cards__container");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const formSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

initialCards.forEach(renderCard);

function renderCard(item) {
  const card = new Card(item.name, item.link, ".card-template");
  const cardElement = card.generateCard();

  cardsContainer.prepend(cardElement);
  addListeners(cardElement);
}

function addCard(evt) {
  evt.preventDefault();
  const formAddCards = {
    link: linkInput.value,
    name: titleInput.value,
  };
  renderCard(formAddCards);
}

function addListeners(cardElement) {
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.addEventListener("click", () => {
    openImagePopup(cardImage);
  });
}

function openPopup(item) {
  item.classList.add("popup_opened");

  popups.focus();
  window.scrollTo(0, 0);

  popups.addEventListener("keydown", handleEsc);
}

function openImagePopup(card) {
  openPopup(popupImage);
  popupImageOpen.src = card.src;
  popupImageOpen.alt = card.alt;
  popupImageCaption.textContent = card.alt;
}

function openPopupProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function handleEsc(e) {
  if (e.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

function closePopup(item) {
  item.classList.remove("popup_opened");

  popups.removeEventListener("keydown", handleEsc);
}

function handleFormSubmitProfile(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleNewCardSubmit(evt) {
  addCard(evt);
  formElementCards.reset();
  closePopup(popupEditCards);
}

function addClassValidation(item) {
  const formList = Array.from(
    document.querySelectorAll(formSettings.formSelector)
  );
  formList.forEach((formElement) => {
    if (formElement.classList.contains(item)) {
      const formValidator = new FormValidator(formSettings, formElement);

      formValidator.enableValidation();
    }
  });
}

buttonAddCards.addEventListener("click", () => {
  openPopup(popupEditCards);
  addClassValidation("popup__form_type_cards");
});

buttonEditProfile.addEventListener("click", () => {
  openPopupProfile();
  addClassValidation("popup__form_type_profile");
});

formElementProfile.addEventListener("submit", (e) => {
  handleFormSubmitProfile(e, popupEditProfile);
});

formElementCards.addEventListener("submit", handleNewCardSubmit);

popups.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("popup") ||
    e.target.classList.contains("popup__close")
  ) {
    closePopup(e.target.closest(".popup"));
  }
});
