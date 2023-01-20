const openEditButton = document.querySelector('.profile__edit-btn');
const popupContainer = document.querySelector('.popup');
const closeEditButton = document.querySelector('.popup__close-btn');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__string_input_name');
let jobInput = document.querySelector('.popup__string_input_job');
let nameField = document.querySelector('.profile__title');
let jobField = document.querySelector('.profile__subtitle');

function popupOpen() {
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;
  popupContainer.classList.add('popup_opened');
}

function popupClose() {
  popupContainer.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;

  popupClose();
}

openEditButton.addEventListener('click', popupOpen);
closeEditButton.addEventListener('click', popupClose);

formElement.addEventListener('submit', handleFormSubmit);
