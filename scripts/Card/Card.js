export class Card {

  constructor(data, templateSelector, popupImageOpened) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._popupImageOpened = popupImageOpened;
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.elements__like-btn');
    this._buttonDelete = this._element.querySelector('.elements__delete-btn');
    this._title = this._element.querySelector('.elements__title');
    this._img = this._element.querySelector('.elements__img');
    this._imagePopup = document.querySelector('.popup_image-opened');
    this._imgFullScreen = this._imagePopup.querySelector('.popup__img');
    this._textFullScreen = this._imagePopup.querySelector('.popup__text');
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__card').cloneNode(true);

    return cardElement;
  }

  _likeCard() {
    this._buttonLike.classList.toggle('elements__like-btn_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _openFullImgPopup() {
    this._popupImageOpened(this._imagePopup);
    this._textFullScreen.textContent = this._name;
    this._imgFullScreen.src = this._link;
    this._imgFullScreen.alt = this._name;
  }


  _setEventListeners() {

    this._buttonLike.addEventListener('click', () => {
      this._likeCard();
    });

    this._buttonDelete.addEventListener('click', () => {
      this._deleteCard();
    });

    this._img.addEventListener('click', () => {
      this._openFullImgPopup();
    });

  }

  renderCard() {
    this._setEventListeners();

    this._img.src = this._link;
    this._img.alt = this._name;
    this._title.textContent = this._name;

    return this._element;
  }
}
