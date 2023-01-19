const openEditButton = document.querySelector('.profile__edit-btn');
const popupContainer = document.querySelector('.popup');
const closeEditButton = document.querySelector('.popup__close-btn');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__string-name');
let jobInput = document.querySelector('.popup__string-job');
let nameField = document.querySelector('.profile__title');
let jobField = document.querySelector('.profile__subtitle');

function popupOpen() {
  popupContainer.classList.add('popup_opened');
}

function popupClose() {
  popupContainer.classList.remove('popup_opened');
}

openEditButton.addEventListener('click', popupOpen);
closeEditButton.addEventListener('click', popupClose);

function handleFormSubmit (evt) {
  evt.preventDefault();
  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;

  popupClose();
}

formElement.addEventListener('submit', handleFormSubmit);
