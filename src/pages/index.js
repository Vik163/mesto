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
import { PopupWithImage } from "../components/PicturePopup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { api } from "../components/Api.js";
import "./index.css";

// Загрузка данных профиля --------------------------------
api.getUserInfo().then((result) => {
  profileTitle.textContent = result.name;
  profileSubtitle.textContent = result.about;
  profileAvatar.src = result.avatar;
});
//---------------------------------------------------------

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
        })
        .finally(() => {
          popupWithAvatarUpdate.close();
          renderSaving(false, ".popup__form_type_profile-avatar");
        });
      //---------------------------------------------------------------------
    },
  },
  ".popup__form_type_profile-avatar",
  renderSaving
);

const userInfo = new UserInfo(profileTitle, profileSubtitle);

const popupWithFormProfile = new PopupWithForm(
  {
    popupSelector: ".popup_type_profile",
    handleSubmit: (formValues) => {
      // Отправление данных профиля на сервер -------------------------------
      api
        .sendInfoProfile(formValues)
        .then((result) => {
          userInfo.setUserInfo(result.name, result.about);
        })
        .finally(() => {
          popupWithFormProfile.close();
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
      api.deleteCard(obj).then((result) => {
        createCard(result).deleteCard(item);
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
        api.addLikes(obj).then((result) => {
          card.querySelector(".card__likes-num").textContent =
            result.likes.length;
        });
      },
      //----------------------------------------------------------
      deleteLike: (obj, card) => {
        obj.likes.pop();
        // удалить лайк ----------------------------------------
        api.deleteLike(obj).then((result) => {
          card.querySelector(".card__likes-num").textContent =
            result.likes.length;
        });
      },
      //----------------------------------------------------------
    },
    ".card-template",
    openImagePopup,
    openDeleteCardPopup
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
          cardCreate.addRemoveCard(); // вставка корзины в карту
          cardsRender.addItem(cardCreate.generateCard());
        })
        .finally(() => {
          popupWithFormCard.close();
          renderSaving(false, ".popup__form_type_cards");
        });
      //------------------------------------------------------------------------------
    },
  },
  ".popup__form_type_cards",
  renderSaving
);

//
//
//
function renderSaving(isLoading, popup) {
  const popupSubmit = document
    .querySelector(popup)
    .querySelector(".popup__submit");
  isLoading
    ? (popupSubmit.textContent = "Сохранение...")
    : (popupSubmit.textContent = "Сохранить");
}

//
//
//

function openDeleteCardPopup(obj, item) {
  popupWithDeleteCard.open();
  popupWithDeleteCard.setEventListeners(obj, item);
}

// Получение Карточек-------------------------------------
api.getInitialCards().then((result) => {
  cardsRender.renderItems(result);
});
//-----------------------------------------------------

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
