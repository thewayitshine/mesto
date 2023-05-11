export class Card {
  constructor({ data, templateSelector }, handleCardClick, handleAddLike, handleRemoveLike, handleDeleteCard, userId) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this.cardId = data._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDeleteCard = handleDeleteCard;
    this._userId = userId;
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.elements__like-btn');
    this._buttonDelete = this._element.querySelector('.elements__delete-btn');
    this._likeCounter = this._element.querySelector('.elements__like-counter');
    this._title = this._element.querySelector('.elements__title');
    this._img = this._element.querySelector('.elements__img');
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__card').cloneNode(true);

    return cardElement;
  }

  likeCard() {
    this._buttonLike.classList.toggle('elements__like-btn_active');
  }

  deleteCard() {
    this._element.remove();
  }

  _openFullImgPopup() {
    this._handleCardClick(this._name, this._link);
  }

  getLikes(data) {
    this._likeCounter.textContent = data.likes.length;
  }

  _removeDeleteBtn() {
    if (this._userId !== this._ownerId) {
      this._buttonDelete.remove();
    }
  }

  _likeCheck() {
    if (this._likes.some(like => like._id === this._userId)) {
      this._buttonLike.classList.add('elements__like-btn_active');
    }
  }

  _setEventListeners() {

    this._buttonLike.addEventListener('click', () => {
      if (this._buttonLike.classList.contains('elements__like-btn_active')) {
        this._handleRemoveLike(this)
      } else {
        this._handleAddLike(this)
      }
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteCard(this);
    });

    this._img.addEventListener('click', () => {
      this._openFullImgPopup();
    });

  }

  renderCard() {
    this._img.src = this._link;
    this._img.alt = this._name;
    this._title.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;

    this._setEventListeners();
    this._removeDeleteBtn();
    this._likeCheck();

    return this._element;
  }
}
