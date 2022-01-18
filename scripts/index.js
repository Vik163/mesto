let popupSection = document.querySelector('.popup');
let buttonEditProfile = document.querySelector('.profile__edit-button');
let buttonPopupClose = document.querySelector('.popup__close');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__field_type_name');
let jobInput = formElement.querySelector('.popup__field_type_about-me');

function openPopup() {
  popupSection.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function closePopup() {
  popupSection.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup();
}

buttonEditProfile.addEventListener('click', openPopup);
buttonPopupClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler)

