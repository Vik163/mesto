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
const cardTitle = document.querySelectorAll('.card__title');
const cardIcon = document.querySelectorAll('.card__icon');
let newCard;

function render() {
  initialCards.forEach(addArray);
}

render();

function renderCard() {
  newCard = cardTemplate.querySelector('.card').cloneNode(true);
  createCard();
  addListeners(newCard);
}

function createCard() {
  cardsContainer.prepend(newCard);
}

function addArray(el) {
  renderCard();
  newCard.querySelector('.card__image').src = el.link;
  newCard.querySelector('.card__title').textContent = el.name;
  newCard.querySelector('.card__image').alt = el.name;
}

function addCards(evt) {
  evt.preventDefault();
  renderCard()
  newCard.querySelector('.card__image').src = linkInput.value;
  newCard.querySelector('.card__image').alt = titleInput.value;
  newCard.querySelector('.card__title').textContent = titleInput.value;
}

function addLike(e) {
  e.target.classList.contains('card__icon_active') ? e.target.classList.remove('card__icon_active') : e.target.classList.add('card__icon_active');
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

function addListeners(el) {
  el.querySelector('.card__basket').addEventListener('click', deleteCard);
  el.querySelector('.card__image').addEventListener('click', () => {
    openPopup(popupImage);
    //openImagePopup(event);  Показывает неправильное применение, (event перечеркнут) но код не повторяется. Без передачи параметра не работает.
  });
  el.querySelector('.card__image').addEventListener('click', openImagePopup);
  el.querySelector('.card__icon').addEventListener('click', addLike);
}

function openPopup(el) {
  el.classList.add('popup_opened')
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function openImagePopup(evt) {
  popupImageOpen.src = evt.target.src;
  popupImageOpen.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;
}

function closePopup(e) {
  if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup__submit')) {
    popupEditProfile.classList.remove('popup_opened');
    popupEditCards.classList.remove('popup_opened');
    popupImage.classList.remove('popup_opened');
  }
}

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}

buttonAddCards.addEventListener('click', () => {
  openPopup(popupEditCards)
});
buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile)
});
popups.addEventListener('click', closePopup);
formElementProfile.addEventListener('submit', handleFormSubmitProfile);
formElementCards.addEventListener('submit', addCards);
