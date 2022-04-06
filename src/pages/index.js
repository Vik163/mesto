import {
  profileTitle,
  profileSubtitle,
  profileAvatar,
  nameInput,
  jobInput,
  buttonEditProfile,
  buttonAddCards,
  buttonEditAvatar,
  formElementProfile,
  formElementCards,
  formElementAvatar,
  formSettings,
  popupOpenImage,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { api } from "../components/Api.js";
import "./index.css";
let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userId = userInfo.getUserId();
    cardsRender.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

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
      // аватар -------------------------------
      api
        .addAvatar(formValues)
        .then((result) => {
          profileAvatar.src = result.avatar;
          popupWithAvatarUpdate.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderSaving(false, ".popup__form_type_profile-avatar");
        });
      //---------------------------------------------------------------------
    },
  },
  ".popup__form_type_profile-avatar",
  renderSaving
);

const userInfo = new UserInfo(profileTitle, profileSubtitle, profileAvatar);

const popupWithFormProfile = new PopupWithForm(
  {
    popupSelector: ".popup_type_profile",
    handleSubmit: (formValues) => {
      // Отправление данных профиля на сервер -------------------------------
      api
        .sendInfoProfile(formValues)
        .then((result) => {
          userInfo.setUserInfo(result);
          popupWithFormProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderSaving(false, ".popup__form_type_profile");
        });

      //---------------------------------------------------------------------
    },
  },
  ".popup__form_type_profile",
  renderSaving
);

const popupWithDeleteCard = new PopupWithConfirmation(
  ".popup_type_delete-card",
  {
    deleteCard: (obj, item) => {
      // Удаление карточки -------------------------------------------------------
      api
        .deleteCard(obj)
        .then((result) => {
          createCard(result).deleteCard(item);
          popupWithDeleteCard.close();
        })
        .catch((err) => {
          console.log(err);
        });
      //---------------------------------------------------------------------------
    },
  }
);

function createCard(obj) {
  const cardElement = new Card(
    obj,
    {
      addLike: (obj, card) => {
        const objData = {};
        obj.likes.push(objData);
        // добавить лайк ----------------------------------------
        api
          .addLikes(obj)
          .then((result) => {
            card
              .querySelector(".card__icon")
              .classList.add("card__icon_active");
            card.querySelector(".card__likes-num").textContent =
              result.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      //----------------------------------------------------------
      deleteLike: (obj, card) => {
        obj.likes.pop();
        // удалить лайк ----------------------------------------
        api
          .deleteLike(obj)
          .then((result) => {
            card
              .querySelector(".card__icon")
              .classList.remove("card__icon_active");
            card.querySelector(".card__likes-num").textContent =
              result.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      //----------------------------------------------------------
    },
    ".card-template",
    profileAvatar,
    openImagePopup,
    openDeleteCardPopup,
    userId
  );
  return cardElement;
}

const cardsRender = new Section(
  {
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
      // Добавление карты на сервер --------------------------------------------------
      api
        .addCard(formValues)
        .then((result) => {
          const cardCreate = createCard(result);
          cardsRender.addItem(cardCreate.generateCard());
          popupWithFormCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderSaving(false, ".popup__form_type_cards");
        });
      //------------------------------------------------------------------------------
    },
  },
  ".popup__form_type_cards",
  renderSaving
);

function renderSaving(isLoading, popup) {
  const popupSubmit = document
    .querySelector(popup)
    .querySelector(".popup__submit");
  isLoading
    ? (popupSubmit.textContent = "Сохранение...")
    : (popupSubmit.textContent = "Сохранить");
}

function openDeleteCardPopup(obj, item) {
  popupWithDeleteCard.open(obj, item);
}

formValidatorAvatar.enableValidation();
formValidatorProfile.enableValidation();
formValidatorCards.enableValidation();

function openImagePopup(title, link) {
  popupWithImage.open(title, link);
}

function fillInputsPopupProfile() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
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

popupWithDeleteCard.setEventListeners();
popupWithAvatarUpdate.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();
popupWithImage.setEventListeners();
