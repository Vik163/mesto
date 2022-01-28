const popups = document.querySelector('.popups');
const popupEditProfile = popups.querySelector('.popup_type_profile');
const popupEditCards = popups.querySelector('.popup_type_cards');
const popupImage = popups.querySelector('.popup_type_image');
const popupImageOpen = popups.querySelector('.popup__image');
const popupImageCaption = popups.querySelector('.popup__caption');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCards = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formElementProfile = document.querySelector('.popup__form_type_profile');
const nameInput = formElementProfile.querySelector('.popup__field_type_name');
const jobInput = formElementProfile.querySelector('.popup__field_type_about-me');
const formElementCards = document.querySelector('.popup__form_type_cards');
const titleInput = formElementCards.querySelector('.popup__field_type_title');
const linkInput = formElementCards.querySelector('.popup__field_type_link');
const cardsContainer = document.querySelector('.cards__container');
const cardTemplate = document.querySelector('.card-template').content;
const cardImage = document.querySelectorAll('.card__image');
const cardTitle = document.querySelectorAll('.card__title');
let newCard;
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function render() {
  initialCards.forEach(renderCard);
}

render();

function renderCard(el) {
  newCard = cardTemplate.querySelector('.card').cloneNode(true);
  cardsContainer.appendChild(newCard);
  newCard.querySelector('.card__image').src = el.link;
  newCard.querySelector('.card__image').alt = el.name;
  newCard.querySelector('.card__title').textContent = el.name;

  addListeners(newCard);
}

function addLike(e) {
  e.target.classList.add('card__icon_active');
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

function addListeners(el) {
  el.querySelector('.card__basket').addEventListener('click', deleteCard);
  el.querySelector('.card__image').addEventListener('click', openPopupImage);
  el.querySelector('.card__icon').addEventListener('click', addLike);
}

function openPopupEditProfile() {
  popupEditProfile.classList.add('popup_opened')
  nameInput.ariaPlaceholder = profileTitle.textContent;
  jobInput.ariaPlaceholder = profileSubtitle.textContent;
  formElementProfile.addEventListener('submit', formSubmitHandler);
}

function openPopupAddCards() {
  popupEditCards.classList.add('popup_opened');
  formElementCards.addEventListener('submit', formSubmitHandlerAddCards);
}

function openPopupImage(event) {
  popupImage.classList.add('popup_opened');
  popupImageOpen.src = event.target.src;
  popupImageOpen.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;
}

function closePopup(e) {
  if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup__submit')) {
    popupEditProfile.classList.remove('popup_opened');
    popupEditCards.classList.remove('popup_opened');
    popupImage.classList.remove('popup_opened');
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}

function formSubmitHandlerAddCards(evt) {
  evt.preventDefault();
  const addCard = cardTemplate.querySelector('.card').cloneNode(true);;
  cardsContainer.prepend(addCard);
  addCard.querySelector('.card__image').src = linkInput.value;
  addCard.querySelector('.card__image').alt = titleInput.value;
  addCard.querySelector('.card__title').textContent = titleInput.value;

  addListeners(addCard);
}

buttonAddCards.addEventListener('click', openPopupAddCards);
buttonEditProfile.addEventListener('click', openPopupEditProfile);
popups.addEventListener('click', closePopup);
