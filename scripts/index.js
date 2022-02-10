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
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_about-me');
const formElementCards = document.querySelector('.popup__form_type_cards');
const titleInput = formElementCards.querySelector('.popup__input_type_title');
const linkInput = formElementCards.querySelector('.popup__input_type_link');
const cardsContainer = document.querySelector('.cards__container');
const cardTemplate = document.querySelector('.card-template').content;
const cardTitle = document.querySelectorAll('.card__title');
const cardIcon = document.querySelectorAll('.card__icon');


function render() {
  initialCards.forEach(renderCard);
}

render();

function renderCard(item) {
  cardsContainer.prepend(createCard(item));
}

function createCard(item) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');

  cardImage.src = item.link;
  newCard.querySelector('.card__title').textContent = item.name;
  cardImage.alt = item.name;

  addListeners(newCard, cardImage);
  return newCard;
}

function addCard(evt) {

  evt.preventDefault();
  const formAddCards = {
    link: linkInput.value,
    name: titleInput.value
  };
  renderCard(formAddCards);
}

function toggleLike(e) {
  e.target.classList.toggle('card__icon_active');
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

function addListeners(newCard, cardImage) {
  newCard.querySelector('.card__basket').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => {
    openImagePopup(cardImage)
  });
  newCard.querySelector('.card__icon').addEventListener('click', toggleLike);
}

function openPopup(item) {
  item.classList.add('popup_opened');

  popups.focus();
  window.scrollTo(0, 0);

  popups.addEventListener('keydown', handleEsc);
}

function openImagePopup(card) {
  openPopup(popupImage);
  popupImageOpen.src = card.src;
  popupImageOpen.alt = card.alt;
  popupImageCaption.textContent = card.alt;
}

function openPopupProfile() {
  openPopup(popupEditProfile)
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// Честно признаюсь, я не вкурил, что можно найти по селектору
// уже открытый попап и передать его в качестве аргумента.
function handleEsc(e) {
  if (e.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

function closePopup(item) {
  item.classList.remove('popup_opened');

  popups.removeEventListener('keydown', handleEsc);
}

function handleFormSubmitProfile(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleNewCardSubmit (evt) {
  addCard(evt);
  formElementCards.reset();
  closePopup(popupEditCards)
}

buttonAddCards.addEventListener('click', () => {
  openPopup(popupEditCards);
});

buttonEditProfile.addEventListener('click', openPopupProfile);

formElementProfile.addEventListener('submit', (e) => {
  handleFormSubmitProfile(e, popupEditProfile)
});

formElementCards.addEventListener('submit', handleNewCardSubmit);

popups.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
    closePopup(e.target.closest('.popup'));
  }
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
