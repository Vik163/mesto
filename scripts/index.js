import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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
const formValidatorCards = new FormValidator(formSettings, formElementCards);
const formValidatorProfile = new FormValidator(
  formSettings,
  formElementProfile
);

formValidatorProfile.enableValidation();

formValidatorCards.enableValidation();

initialCards.forEach(renderCard);

function createCard(item) {
  const card = new Card(item.name, item.link, ".card-template", openImagePopup);
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard(card) {
  cardsContainer.prepend(createCard(card));
}

//Не совсем понял задание убрать эффект наведения оверлея. Там переход "transition: 0.4s" (отключил)
//меняет непрозрачность (так было в задании к 5 работе). 7. Плавное открытие и закрытие попапов
//Если я, конечно, думаю о том.

function addCard(evt) {
  evt.preventDefault();
  const formAddCards = {
    link: linkInput.value,
    name: titleInput.value,
  };
  renderCard(formAddCards);
}

function openPopup(item) {
  item.classList.add("popup_opened");
  document.addEventListener("keydown", handleEsc);
}

function openImagePopup(title, link) {
  popupImageOpen.src = link;
  popupImageOpen.alt = title;
  popupImageCaption.textContent = title;
  openPopup(popupImage);
}

function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
  formValidatorProfile.toggleButtonState();
}

function handleEsc(e) {
  if (e.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

function closePopup(item) {
  item.classList.remove("popup_opened");

  document.removeEventListener("keydown", handleEsc);
}

function handleFormSubmitProfile(e) {
  e.preventDefault();
  closePopup(popupEditProfile);
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}

function handleNewCardSubmit(evt) {
  addCard(evt);
  closePopup(popupEditCards);
  formElementCards.reset();
}

buttonAddCards.addEventListener("click", () => {
  openPopup(popupEditCards);
  formValidatorCards.toggleButtonState();
});

buttonEditProfile.addEventListener("click", () => {
  openPopupProfile();
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
