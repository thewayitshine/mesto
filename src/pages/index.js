import './index.css';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Card } from '../scripts/components/Card.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithSubmit } from '../scripts/components/PopupWithSubmit.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js';
import { validationConfig } from '../scripts/utils/config.js';
import { apiConfig } from '../scripts/utils/apiConfig.js';
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
  popupImageGallery,
  popupConfirmation,
  popupEditAvatar,
  popupAvatar,
  formEditAvatar,
  cardsContainer,
  popupAvatarEdit
} from '../scripts/utils/constants.js';

const api = new Api(apiConfig);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setAvatar(user);
    userInfo.setUserInfo(user);
    section.renderItems(cards, user._id);
  })
  .catch(err => console.log(err));

const userInfo = new UserInfo({
  name: nameField,
  about: jobField,
  avatar: popupAvatar
});

const popupWithImage = new PopupWithImage(popupImageGallery);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function createCard(item, userId) {
  const card = new Card({
    data: item,
    templateSelector: '.card-template'
  }, handleCardClick, handleAddLike, handleRemoveLike, handleDeleteCard, userId);
  const cardElement = card.renderCard();

  return cardElement;
}

function handleAddLike(card) {
  api.putLike(card.cardId)
    .then(data => {
      card.getLikes(data);
    })
    .then(() => {
      card.likeCard();
    })
    .catch(err => console.log(err));
}

function handleRemoveLike(card) {
  api.deleteLike(card.cardId)
    .then((data) => {
      card.getLikes(data);
    })
    .then(() => {
      card.likeCard();
    })
    .catch(err => console.log(err));
}

function handleDeleteCard(cardId, element) {
  popupWithSubmit.open();
  popupWithSubmit.setCardInfo(cardId, element)
}

const formAddPlaceValidation = new FormValidator(validationConfig, formAddPlace);
formAddPlaceValidation.enableValidation();

const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();

const formEditAvatarValidation = new FormValidator(validationConfig, formEditAvatar);
formEditAvatarValidation.enableValidation();

const section = new Section({
  renderer: (item, userId) => {
    section.addItem(createCard(item, userId));
  }
}, cardsContainer
);

const popupWithSubmit = new PopupWithSubmit({
  popupSelector: popupConfirmation,
  handleSubmitForm: handleSubmitFormConfirmation
});
popupWithSubmit.setEventListeners();

function handleSubmitFormConfirmation(card) {
  api.deleteCard(card.cardId)
    .then((data) => {
      card.deleteCard(data);
    })
    .then(() => {
      popupWithSubmit.close();
    })
    .catch(err => console.log(err));
}

const popupWithFormInfo = new PopupWithForm({
  popupSelector: popupProfile,
  handleSubmitForm: handleSubmitFormInfo
});
popupWithFormInfo.setEventListeners();

function handleSubmitFormInfo(value) {
  api.patchUserInfo(value)
    .then(data => {
      userInfo.setUserInfo(data);
    })
    .then(() => {
      popupWithFormInfo.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupWithFormInfo.renderLoading(false))
}

buttonEditProfile.addEventListener('click', () => {
  openEditProfilePopup();
  profileFormValidation.resetValidation();
  popupWithFormInfo.open();
});

function openEditProfilePopup() {
  const userValues = userInfo.getUserInfo();

  nameInput.value = userValues.name;
  jobInput.value = userValues.about;
}

const popupWithFormPlace = new PopupWithForm({
  popupSelector: popupAddPlace,
  handleSubmitForm: handleSubmitFormPlace
});
popupWithFormPlace.setEventListeners();

function handleSubmitFormPlace(value) {
  api.postNewCard(value)
    .then(data => {
      section.addItem(createCard(data, data.owner._id));
    })
    .then(() => {
      popupWithFormPlace.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupWithFormPlace.renderLoading(false))
}

buttonAddPlace.addEventListener('click', () => {
  formAddPlaceValidation.resetValidation();
  formAddPlaceValidation.disableButton();
  popupWithFormPlace.open();
});

const popupWithFormAvatar = new PopupWithForm({
  popupSelector: popupEditAvatar,
  handleSubmitForm: handleSubmitFormAvatar
});
popupWithFormAvatar.setEventListeners();

function handleSubmitFormAvatar(value) {
  api.patchAvatar(value)
    .then(data => {
      userInfo.setAvatar(data);
    })
    .then(() => {
      popupWithFormAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupWithFormAvatar.renderLoading(false));
}

popupAvatarEdit.addEventListener('click', () => {
  formEditAvatarValidation.resetValidation();
  formEditAvatarValidation.disableButton();
  popupWithFormAvatar.open();
})
