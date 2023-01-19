const openEditButton = document.querySelector('.profile__edit-btn');
const popupContainer = document.querySelector('.popup');
const closeEditButton = document.querySelector('.popup__close-btn');


function popupOpen() {
  popupContainer.classList.add('popup_opened');
}

function popupClose() {
  popupContainer.classList.remove('popup_opened');
}

openEditButton.addEventListener('click', popupOpen);
closeEditButton.addEventListener('click', popupClose);


let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('popup__string');
let jobInput = document.querySelector('popup__string');

function handleFormSubmit (evt) {
    evt.preventDefault();

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

formElement.addEventListener('submit', handleFormSubmit);
