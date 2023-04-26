

import './index.css';
import { validationConfig } from '../scripts/utils/config.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { initialCards } from '../scripts/utils/initialCards.js';
import { Card } from '../scripts/components/Card.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import {
  profileForm,
  nameInput,
  jobInput,
  formAddPlace,
  placeInput,
  linkInput,
  buttonEditProfile,
  nameField,
  jobField,
  buttonAddPlace,
  popupProfile,
  popupAddPlace,
  cardsContainer,
  popupImageGallery
} from '../scripts/utils/constants.js';


function createCard(item) {
  const card = new Card({
    data: item,
    templateSelector: '.card-template'
  },
    handleCardClick);
  const cardElement = card.renderCard();

  return cardElement;
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

formAddPlace.addEventListener('submit', formAddPlace);
const formAddPlaceValidation = new FormValidator(validationConfig, formAddPlace);
formAddPlaceValidation.enableValidation();


profileForm.addEventListener('submit', profileForm);
const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();

const userInfo = new UserInfo({
  name: nameField,
  info: jobField
});

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    section.addItem(cardElement);
  }
}, '.elements__list'
);
section.renderItems();

const popupWithImage = new PopupWithImage(popupImageGallery);
popupWithImage.setEventListeners();

const popupWithFormInfo = new PopupWithForm(popupProfile, handleSubmitFormInfo);
popupWithFormInfo.setEventListeners();

function handleSubmitFormInfo(value) {
  userInfo.setUserInfo({
    name: value.name,
    info: value.job
  });
  popupWithFormInfo.close();
}

buttonEditProfile.addEventListener('click', () => {
  openEditProfilePopup();
  profileFormValidation.resetValidation();
  popupWithFormInfo.open();
});

function openEditProfilePopup() {
  const userValues = userInfo.getUserInfo();

  nameInput.value = userValues.name;
  jobInput.value = userValues.info;
}

const popupWithFormPlace = new PopupWithForm(popupAddPlace, handleSubmitFormPlace);
popupWithFormPlace.setEventListeners();

function handleSubmitFormPlace() {
  cardsContainer.prepend(createCard({
    name: placeInput.value,
    link: linkInput.value
  }));
  popupWithFormPlace.close();

  formAddPlaceValidation.disableButton();
};

buttonAddPlace.addEventListener('click', () => {
  formAddPlaceValidation.enableValidation();
  formAddPlace.reset();
  popupWithFormPlace.open();
});




/*

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

  profileFormValidation.resetValidation();

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

//функция рендеринга новой карточки
function handleCreateFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({
    name: placeInput.value,
    link: linkInput.value
  }, '.card-template'));

  closePopup(popupAddPlace);

  evt.target.reset();

  formAddPlaceValidation.disableButton();
}

//функция закрытия попапа по кнопке esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
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
})*/
