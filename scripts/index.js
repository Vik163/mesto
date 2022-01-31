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
}

function createCard() {
  cardsContainer.prepend(newCard);
  addListeners(newCard);
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

/* Я понимаю, что делаю не совсем верно. addCards, addArray, должны быть объеденены в createCard. Но за все это время я так и не смог найти решения, как присваивать разные значения на один селектор в границах одной функции. Как записать одним значением, к примеру, link массива и value input. Может это и просто, но в голову не пришло, а может я и не прав. Кстати спасибо за комментарии. Очень помогают понять логику. */

function addLike(e) {
  e.target.classList.toggle('card__icon_active');
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

function addListeners(el) {
  el.querySelector('.card__basket').addEventListener('click', deleteCard);
  el.querySelector('.card__image').addEventListener('click', openImagePopup);
  el.querySelector('.card__icon').addEventListener('click', addLike);
}

function openPopup(el) {
  el.classList.add('popup_opened')
}

function openImagePopup(evt) {
  openPopup(popupImage);
  popupImageOpen.src = evt.target.src;
  popupImageOpen.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;
}

function closePopup(e) {
  if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup__submit')) {
    e.target.closest('.popup').classList.remove('popup_opened');
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
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});
popups.addEventListener('click', closePopup);
formElementProfile.addEventListener('submit', handleFormSubmitProfile);
formElementCards.addEventListener('submit', addCards);
