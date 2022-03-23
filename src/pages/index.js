import {
  profileTitle,
  profileSubtitle,
  nameInput,
  jobInput,
  buttonEditProfile,
  buttonAddCards,
  formElementProfile,
  formElementCards,
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
import "./index.css";

const formValidatorCards = new FormValidator(formSettings, formElementCards);
const formValidatorProfile = new FormValidator(
  formSettings,
  formElementProfile
);

const popupWithImage = new PopupWithImage(popupOpenImage, ".popup_type_image");

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

const cardsRender = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const cardElement = new Card(
        item.name,
        item.link,
        ".card-template",
        openImagePopup
      );
      return cardElement.generateCard();
    },
  },
  ".cards__container"
);

const popupWithFormCard = new PopupWithForm(
  {
    popupSelector: ".popup_type_cards",
    handleSubmit: (formValues) => {
      cardsRender.addItem(formValues);
    },
  },
  ".popup__form_type_cards"
);
cardsRender.renderItems();

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

buttonAddCards.addEventListener("click", () => {
  formValidatorCards.resetValidation();
  popupWithFormCard.open();
});

buttonEditProfile.addEventListener("click", () => {
  fillInputsPopupProfile();
  formValidatorProfile.resetValidation();
  popupWithFormProfile.open();
});

popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();
popupWithImage.setEventListeners();
