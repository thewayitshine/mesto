//ИМПОРТ!!!

import { validationConfig } from './Validator/config.js';
import { FormValidator } from './Validator/FormValidator.js';
import { initialCards } from './Card/initialCards.js';
import { Card } from './Card/Card.js';


//ПЕРЕМЕННЫЕ!!!


//переменные формы редактирования
const profileForm = document.forms.profile_edit;
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.job;

//переменные формы добавления карточки
const formAddPlace = document.forms.place_add;
const placeInput = formAddPlace.elements.place;
const linkInput = formAddPlace.elements.link;

//переменные профиля
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const nameField = document.querySelector('.profile__title');
const jobField = document.querySelector('.profile__subtitle');
const buttonAddPlace = document.querySelector('.profile__add-btn');

//переменные попапа
const popupContainerList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile-edit');
const popupAddPlace = document.querySelector('.popup_place-add');
const imagePopup = document.querySelector('.popup_image-opened');
const buttonClosePopupList = document.querySelectorAll('.popup__close-btn');
const formList = document.querySelectorAll('.popup__form');
const buttonPopupAddPlace = document.querySelector('.popup__button-add');
const imgFullScreen = document.querySelector('.popup__img');
const textFullScreen = document.querySelector('.popup__text');

//переменная шаблона
const cardTemplate = document.querySelector('.card-template').content;

//переменные элементов
const cardsContainer = document.querySelector('.elements__list');
const cardTemplateClone = cardTemplate.querySelector('.elements__card');


//ФУНКЦИИ!!!


//функция открытия
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

//функция закрытия
function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

//функция открытия Edit попапа
function openEditProfilePopup() {
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;

  openPopup(popupProfile);
}

//функция кнопки сохранения изменений в профиле (Сохранить)
function handleSaveFormSubmit(evt) {
  evt.preventDefault();
  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;

  closePopup(popupProfile);

  evt.target.reset();
}

//функция открытия Add Place попапа
function openAddPlacePopup() {

  formAddPlace.reset();

  openPopup(popupAddPlace);
}

//функция создания карточки
function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector, openPopup);
  return card.renderCard();
}

//функция рендеринга карточек из массива
function renderArrayCards() {
  initialCards.forEach(function (item) {
    const card = createCard(item, cardTemplateClone);

    cardsContainer.append(card);
  });
}

renderArrayCards();


//функция рендеринга новой карточки
function handleCreateFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({
    name: placeInput.value,
    link: linkInput.value
  }, cardTemplateClone));

  closePopup(popupAddPlace);

  evt.target.reset();

  disableButtonActive()
}


//функция закрытия попапа по кнопке esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//функция валидации
function enableValidation(form) {
  const formValidation = new FormValidator(validationConfig, form);
  formValidation.enableValidation();
}

formList.forEach(enableValidation);

//функция состояния кнопки disable
function disableButtonActive() {
  const buttonDisabled = new FormValidator(validationConfig, formAddPlace);
  buttonDisabled.disableButton();
}

//ОБРАБОТЧИКИ СОБЫТИЯ!!!


//обработчик события открытия Edit попапа
buttonEditProfile.addEventListener('click', openEditProfilePopup);

//обработчик события кнопки сохранения изменений в профиле (Сохранить)
profileForm.addEventListener('submit', handleSaveFormSubmit);

//обработчик события открытия Add Place попапа
buttonAddPlace.addEventListener('click', openAddPlacePopup);

//обработчик события кнопки создания новой карточки (Создать)
formAddPlace.addEventListener('submit', handleCreateFormSubmit);

//обработчик события закрытия всех попапов
buttonClosePopupList.forEach(function (item) {
  item.addEventListener('click', function () {
    const popupClosest = item.closest('.popup');

    closePopup(popupClosest);
  });
})

//обработчик события закрытия всех попапов через оверлей
popupContainerList.forEach(function (item) {
  item.addEventListener('mousedown', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(item);
    }
  });
})

//отмена стандартного поведения формы
formList.forEach(function (item) {
  item.addEventListener('submit', function (evt) {
    evt.preventDefault();
  })
})

