import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PicturePopup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";

const popups = document.querySelector(".popups");
const popupEditProfile = popups.querySelector(".popup_type_profile");
const popupEditCards = popups.querySelector(".popup_type_cards");
const popupImage = popups.querySelector(".popup_type_image");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCards = document.querySelector(".profile__add-button");
const formElementProfile = document.querySelector(".popup__form_type_profile");
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
//
const profileData = {
  profileTitle: document.querySelector(".profile__title"),
  profileSubtitle: document.querySelector(".profile__subtitle"),
};
const inputData = {
  nameInput: formElementProfile.querySelector(".popup__input_type_name"),
  jobInput: formElementProfile.querySelector(".popup__input_type_about-me"),
};

const popupOpenImage = {
  popupImageOpen: popups.querySelector(".popup__image"),
  popupImageCaption: popups.querySelector(".popup__caption"),
};
//
const formValidatorCards = new FormValidator(formSettings, formElementCards);
const formValidatorProfile = new FormValidator(
  formSettings,
  formElementProfile
);

const popupOpen = new Popup(popups);
const popupWithImage = new PopupWithImage(popupOpenImage);
const cardsInitial = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.link,
        ".card-template",
        openImagePopup
      );
      const cardElement = card.generateCard();
      cardsInitial.addItem(cardElement);
    },
  },
  cardsContainer
);

const userInfo = new UserInfo(profileData, inputData);

//
//
const popupWithFormProfile = new PopupWithForm({
  popupEditProfile,
  renderer: (e) => {
    e.preventDefault();
    popupOpen.close(popupEditProfile);
    userInfo.setUserInfo();
  },
});

const popupWithFormCard = new PopupWithForm({
  popupEditCards,
  renderer: (evt) => {
    addCard(evt);
    popupOpen.close(popupEditCards);
    popupWithFormCard.close(formElementCards);
  },
});

function addCard(evt) {
  evt.preventDefault();
  const formAddCards = {
    link: linkInput.value,
    name: titleInput.value,
  };

  const cardAdd = new Section(
    {
      data: formAddCards,
      renderer: (item) => {
        const card = new Card(
          item.name,
          item.link,
          ".card-template",
          openImagePopup
        );
        const cardElement = card.generateCard();
        cardAdd.addItem(cardElement);
      },
    },
    cardsContainer
  );
  cardAdd.renderItem(formAddCards);
}

cardsInitial.renderItems();

formValidatorProfile.enableValidation();
formValidatorCards.enableValidation();

function openImagePopup(title, link) {
  popupWithImage.open(popupImage, title, link);
}
//Пробовал убрать эту функцию, но не получилось. Теряется контекст. Решение пока не нашел.

buttonAddCards.addEventListener("click", () => {
  popupOpen.open(popupEditCards);
  formValidatorCards.toggleButtonState();
});

buttonEditProfile.addEventListener("click", () => {
  userInfo.getUserInfo();
  popupOpen.open(popupEditProfile);
  formValidatorProfile.toggleButtonState();
});

popupWithFormProfile.setEventListeners(formElementProfile);
popupWithFormCard.setEventListeners(formElementCards);
popupOpen.setEventListeners();
