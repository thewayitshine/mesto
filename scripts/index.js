

//ПЕРЕМЕННЫЕ!!!


//4 практическая объявление переменных
const editButton = document.querySelector('.profile__edit-btn');
const popupProfile = document.querySelector('.popup_profile-edit');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__string_input_name');
const jobInput = document.querySelector('.popup__string_input_job');
const nameField = document.querySelector('.profile__title');
const jobField = document.querySelector('.profile__subtitle');

//5 практическая объявление переменных
const addButton = document.querySelector('.profile__add-btn');
const popupAddPlace = document.querySelector('.popup_place-add');
const placeInput = document.querySelector('.popup__string_input_place');
const linkInput = document.querySelector('.popup__string_input_link');
const imagePopUp = document.querySelector('.popup_image-opened');
const formAddPlace = document.querySelector('.popup__form-add');
const list = document.querySelector('.elements__list');
const closeButtons = document.querySelectorAll('.popup__close-btn');
const cardTemplate = document.querySelector('.card-template').content;
const fullScreenImg = document.querySelector('.popup__img');
const fullScreenText = document.querySelector('.popup__text');


const initialCards = [
  {
    name: 'Казань',
    link: 'https://i.postimg.cc/c1gNQnFR/Kazan.jpg'
  },
  {
    name: 'Иннополис',
    link: 'https://i.postimg.cc/Pxn12ZmC/Innopolis.jpg'
  },
  {
    name: 'Болгар',
    link: 'https://i.postimg.cc/tT9Ysz3N/Bolgar.jpg'
  },
  {
    name: 'Камское устье',
    link: 'https://i.postimg.cc/LXy6nF6m/Kama-mouth.jpg'
  },
  {
    name: 'Свияжск',
    link: 'https://i.postimg.cc/NGSBV4KC/Sviyazhsk.jpg'
  },
  {
    name: 'Река Волга',
    link: 'https://i.postimg.cc/s2jrSHLx/Volga.jpg'
  }
];


//ФУНКЦИИ!!!


//функция открытия
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//функция закрытия
function closePopup(item) {
  item.classList.remove('popup_opened');
}

//функция открытия Edit попапа
function editPopup() {
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
}

//функция открытия Add Place попапа
function openAddPlacePopup() {
  placeInput.value = placeInput.placeholder;
  linkInput.value = linkInput.placeholder;

  formAddPlace.reset();

  openPopup(popupAddPlace);
}

//функция создания новой карточки
function createNewCard(name, link) {
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);

  const cardGalleryText = cardElement.querySelector('.elements__title').textContent = name;
  const cardGalleryAlt = cardElement.querySelector('.elements__img').alt = name;
  const cardGalleryLink = cardElement.querySelector('.elements__img').src = link;

  cardElement.querySelector('.elements__like-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-btn_active');
  })

  cardElement.querySelector('.elements__delete-btn').addEventListener('click', function () {
    cardElement.remove();
  })

  cardElement.querySelector('.elements__img').addEventListener('click', function () {
    openPopup(imagePopUp);

    fullScreenImg.src = cardGalleryLink;
    fullScreenImg.alt = cardGalleryAlt;
    fullScreenText.textContent = cardGalleryText;
  });

  return cardElement;
}

//функция рендеринга карточек из массива
function renderArrayCards() {
  initialCards.forEach(function (item) {
    const card = createNewCard(item.name, item.link);

    list.append(card);
  });
}

renderArrayCards();


//функция рендеринга новой карточки
function handleCreateFormSubmit(evt) {
  evt.preventDefault();
  list.prepend(createNewCard(placeInput.value, linkInput.value));

  closePopup(popupAddPlace);
}


//ОБРАБОТЧИКИ СОБЫТИЯ!!!


//обработчик события открытия Edit попапа
editButton.addEventListener('click', editPopup);

//обработчик события кнопки сохранения изменений в профиле (Сохранить)
formElement.addEventListener('submit', handleSaveFormSubmit);

//обработчик события открытия Add Place попапа
addButton.addEventListener('click', openAddPlacePopup);

//обработчик события кнопки создания новой карточки (Создать)
formAddPlace.addEventListener('submit', handleCreateFormSubmit);

//обработчик события закрытия всех попапов
closeButtons.forEach(function (item) {
  item.addEventListener('click', function () {
    const closestPopup = item.closest('.popup');

    closePopup(closestPopup);
  });
})
