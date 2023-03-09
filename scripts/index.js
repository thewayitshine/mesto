
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
const popupContainers = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile-edit');
const popupAddPlace = document.querySelector('.popup_place-add');
const imagePopup = document.querySelector('.popup_image-opened');
const buttonsClosePopup = document.querySelectorAll('.popup__close-btn');
const formsPopup = document.querySelectorAll('.popup__form');
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
  buttonPopupAddPlace.addEventListener('submit', disableButton(buttonPopupAddPlace));
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

//функция создания новой карточки
function createNewCard(name, link) {
  const cardElement = cardTemplateClone.cloneNode(true);
  const cardGalleryImg = cardElement.querySelector('.elements__img');
  const cardGalleryTitle = cardElement.querySelector('.elements__title');
  const cardGalleryLikeBtn = cardElement.querySelector('.elements__like-btn');
  const cardGalleryDeleteBtn = cardElement.querySelector('.elements__delete-btn');

  const cardGalleryText = cardGalleryTitle.textContent = name;
  const cardGalleryAlt = cardGalleryImg.alt = name;
  const cardGalleryLink = cardGalleryImg.src = link;

  cardGalleryLikeBtn.addEventListener('click', function () {
    cardGalleryLikeBtn.classList.toggle('elements__like-btn_active');
  })

  cardGalleryDeleteBtn.addEventListener('click', function () {
    cardElement.remove();
  })

  cardGalleryImg.addEventListener('click', function () {
    openPopup(imagePopup);

    imgFullScreen.src = cardGalleryLink;
    imgFullScreen.alt = cardGalleryAlt;
    textFullScreen.textContent = cardGalleryText;
  });

  return cardElement;
}

//функция рендеринга карточек из массива
function renderArrayCards() {
  initialCards.forEach(function (item) {
    const card = createNewCard(item.name, item.link);

    cardsContainer.append(card);
  });
}

renderArrayCards();


//функция рендеринга новой карточки
function handleCreateFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createNewCard(placeInput.value, linkInput.value));

  closePopup(popupAddPlace);

  evt.target.reset();
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
buttonsClosePopup.forEach(function (item) {
  item.addEventListener('click', function () {
    const popupClosest = item.closest('.popup');

    closePopup(popupClosest);
  });
})

//обработчик события закрытия всех попапов через оверлей
popupContainers.forEach(function (item) {
  item.addEventListener('mousedown', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(item);
    }
  });
})

//отмена стандартного поведения формы
formsPopup.forEach(function (item) {
  item.addEventListener('submit', function (evt) {
    evt.preventDefault();
  })
})

