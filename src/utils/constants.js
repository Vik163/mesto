export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const profileAvatar = document.querySelector(".profile__avatar");
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_about-me");
export const buttonEditProfile = document.querySelector(
  ".profile__edit-button"
);
export const buttonAddCards = document.querySelector(".profile__add-button");
export const formElementAvatar = document.querySelector(
  ".popup__form_type_profile-avatar"
);
export const buttonEditAvatar = document.querySelector(
  ".profile__avatar-button"
);
export const formElementProfile = document.querySelector(
  ".popup__form_type_profile"
);
export const formElementCards = document.querySelector(
  ".popup__form_type_cards"
);

export const formSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const popupOpenImage = {
  popupImageOpen: document.querySelector(".popup__image"),
  popupImageCaption: document.querySelector(".popup__caption"),
};
