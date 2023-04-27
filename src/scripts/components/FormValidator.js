export class FormValidator {

  constructor(config, form) {
    this._form = form;
    this._errorClass = config.errorClass;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._button = this._form.querySelector(config.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(config.inputSelector));
  }

  //функция показа ошибки
  _showInputError(errorMessage, inputElement, errorElement) {
    this._errorInputElement = document.querySelector(`.${inputElement.id}-error`);

    this._errorInputElement.classList.add(this._inputErrorClass);
    this._errorInputElement.textContent = errorMessage;
    this._errorInputElement.classList.add(this._errorClass)
  }

  //функция скрытия ошибки
  _hideInputError(errorElement, inputElement) {
    this._errorInputElement = document.querySelector(`.${inputElement.id}-error`);

    this._errorInputElement.classList.remove(this._inputErrorClass);
    this._errorInputElement.textContent = '';
    this._errorInputElement.classList.remove(this._errorClass);
  }

  //функция проверки валидности
  _checkInputValidity(inputElement) {
    const isValid = inputElement.validity.valid;

    if (this._isValid) {
      this._hideInputError('', inputElement)
    } else {
      this._showInputError(inputElement.validationMessage, inputElement)
    }
  }

  //функция отключения нерабочей кнопки
  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.removeAttribute('disabled');
  }

  //функция включения нерабочей кнопки
  disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disabled = true;
  }

  //функция переключения кнопки самбита
  _toggleButtonState(inputElement) {
    this._hasInvalidInput = this._inputList.every((inputElement) => {
      return (inputElement.validity.valid);
    })

    if (this._hasInvalidInput) {
      this._enableButton();
    } else {
      this.disableButton();
    }

  }
  //функция сбрасывания ошибки
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError('', inputElement)
    });

  }

  //функция добавления проверки валидности и переключении кнопки сабмита на инпуты
  _setEventListeners() {

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement);

      })

    })

  }

  //функция добавления валидности на все формы
  enableValidation() {
    this._setEventListeners();
  }

}

