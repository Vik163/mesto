import {
  profileTitle,
  profileSubtitle,
  nameInput,
  jobInput,
  buttonEditProfile,
  buttonAddCards,
  buttonEditAvatar,
  formElementProfile,
  formElementCards,
  formElementAvatar,
  initialCards,
  formSettings,
  popupOpenImage,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PicturePopup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import "./index.css";

const formValidatorAvatar = new FormValidator(formSettings, formElementAvatar);
const formValidatorCards = new FormValidator(formSettings, formElementCards);
const formValidatorProfile = new FormValidator(
  formSettings,
  formElementProfile
);

const popupWithImage = new PopupWithImage(popupOpenImage, ".popup_type_image");
const popupWithAvatarUpdate = new PopupWithForm(
  {
    popupSelector: ".popup_type_profile-avatar",
    handleSubmit: (formValues) => {
      document.querySelector(".profile__avatar").src = formValues.link;
      // userInfo.setUserInfo(formValues.inputName, formValues.inputAboutMe);
      // cardsRender.addItem(formValues);
    },
  },
  ".popup__form_type_profile-avatar"
);

const userInfo = new UserInfo(profileTitle, profileSubtitle);

const popupWithFormProfile = new PopupWithForm(
  {
    popupSelector: ".popup_type_profile",
    handleSubmit: (formValues) => {
      userInfo.setUserInfo(formValues.inputName, formValues.inputAboutMe);
    },
  },
  ".popup__form_type_profile"
);

const popupWithDeleteCard = new PopupWithConfirmation(
  ".popup_type_delete-card",
  {
    deleteCard: (item) => {
      createCard(item).deleteCard(item);
    },
  }
);

function createCard(item) {
  const cardElement = new Card(
    item.name,
    item.link,
    ".card-template",
    openImagePopup,
    openDeleteCardPopup
  );
  return cardElement;
}

const cardsRender = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      return createCard(item).generateCard(); //генерация карты
    },
  },
  ".cards__container"
);

const popupWithFormCard = new PopupWithForm(
  {
    popupSelector: ".popup_type_cards",
    handleSubmit: (formValues) => {
      const cardCreate = createCard(formValues);
      cardCreate.addRemoveCard(); // вставка корзины в карту
      cardsRender.addItem(cardCreate.generateCard()); // вставка карты в разметку
    },
  },
  ".popup__form_type_cards"
);

function openDeleteCardPopup(item) {
  popupWithDeleteCard.open();
  popupWithDeleteCard.setEventListeners(item);
}

cardsRender.renderItems(); //

formValidatorAvatar.enableValidation();
formValidatorProfile.enableValidation();
formValidatorCards.enableValidation();

function openImagePopup(title, link) {
  popupWithImage.open(title, link);
}

function fillInputsPopupProfile() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
}

buttonEditAvatar.addEventListener("click", () => {
  formValidatorAvatar.resetValidation();
  popupWithAvatarUpdate.open();
});

buttonAddCards.addEventListener("click", () => {
  formValidatorCards.resetValidation();
  popupWithFormCard.open();
});

buttonEditProfile.addEventListener("click", () => {
  fillInputsPopupProfile();
  formValidatorProfile.resetValidation();
  popupWithFormProfile.open();
});

popupWithAvatarUpdate.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();
popupWithImage.setEventListeners();
