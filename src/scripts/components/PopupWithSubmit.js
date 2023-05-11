import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleSubmitForm = handleSubmitForm;
  }

  setCardInfo(cardId, element) {
    this._cardId = cardId;
    this._element = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._cardId, this._element);
    });
  }
}
