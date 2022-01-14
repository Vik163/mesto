let popupSection = document.querySelector('.popup');
let buttonEditProfile = document.querySelector('.profile__edit-button');
let buttonPopupClose = document.querySelector('.popup__close');
let popupFieldName = popupSection.querySelector('.popup__field_type_name');
let popupFieldAboutMe = popupSection.querySelector('.popup__field_type_about-me');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupButtonSubmit = popupSection.querySelector('.popup__submit');

buttonEditProfile.addEventListener('click', () => {
  popupSection.classList.add('popup_opened');
});

function closePopup () {
  popupSection.classList.remove('popup_opened');
}

buttonPopupClose.addEventListener('click', closePopup);

popupFieldName.addEventListener('click',  () => {
  popupFieldName.value = '';
});

popupFieldAboutMe.addEventListener('click',  () => {
  popupFieldAboutMe.value = '';
});

function saveData () {
  profileTitle.textContent = popupFieldName.value;
  profileSubtitle.textContent = popupFieldAboutMe.value;
  popupFieldName.setAttribute('value', popupFieldName.value);
  popupFieldAboutMe.setAttribute('value', popupFieldAboutMe.value);
  closePopup();
}

popupButtonSubmit.addEventListener('click', saveData);



