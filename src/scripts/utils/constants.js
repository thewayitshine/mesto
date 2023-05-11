//переменные формы редактирования
export const profileForm = document.forms.profile_edit;
export const nameInput = profileForm.elements.name;
export const jobInput = profileForm.elements.job;

//переменные формы добавления карточки
export const formAddPlace = document.forms.place_add;
export const placeInput = formAddPlace.elements.place;
export const linkInput = formAddPlace.elements.link;

//переменные профиля
export const buttonEditProfile = document.querySelector('.profile__edit-btn');
export const nameField = document.querySelector('.profile__title');
export const jobField = document.querySelector('.profile__subtitle');
export const buttonAddPlace = document.querySelector('.profile__add-btn');

//переменные попапа
export const popupContainerList = document.querySelectorAll('.popup');
export const popupProfile = document.querySelector('.popup_profile-edit');
export const popupAddPlace = document.querySelector('.popup_place-add');
export const buttonClosePopupList = document.querySelectorAll('.popup__close-btn');
export const formList = document.querySelectorAll('.popup__form');

//переменные элементов
export const cardsContainer = document.querySelector('.elements__list');
export const popupImageGallery = document.querySelector('.popup_image-opened');
export const popupConfirmation = document.querySelector('.popup_confirmation');
export const popupEditAvatar = document.querySelector('.popup_edit-avatar');
export const popupAvatarEdit = document.querySelector('.profile__avatar-edit');
export const popupAvatar = document.querySelector('.profile__avatar');
export const formEditAvatar = document.forms.avatar_edit;
