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

function render() {
  initialCards.forEach(renderCard);
}

render();

function renderCard(el) {
  cardsContainer.prepend(createCard(el));
}

function createCard(el) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__image').src = el.link;
  newCard.querySelector('.card__title').textContent = el.name;
  newCard.querySelector('.card__image').alt = el.name;

  addListeners(newCard);
  return newCard;
}

function addCards(evt) {
  evt.preventDefault();
  const formAddCards = {
    link: linkInput.value,
    name: titleInput.value
  };
  renderCard(formAddCards);
}

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
