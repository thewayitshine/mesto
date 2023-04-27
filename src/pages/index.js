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
  buttonEditProfile,
  nameField,
  jobField,
  buttonAddPlace,
  popupProfile,
  popupAddPlace,
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

const formAddPlaceValidation = new FormValidator(validationConfig, formAddPlace);
formAddPlaceValidation.enableValidation();

const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();

const userInfo = new UserInfo({
  name: nameField,
  info: jobField
});

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    section.addItem(createCard(item));
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

function handleSubmitFormPlace(value) {
  const data = {
    name: value.place,
    link: value.link
  }
  section.addItem(createCard(data));
  popupWithFormPlace.close();
};

buttonAddPlace.addEventListener('click', () => {
  formAddPlaceValidation.resetValidation();
  formAddPlaceValidation.disableButton();
  popupWithFormPlace.open();
});
