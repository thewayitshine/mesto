
//переменная объекта параметров
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//функция показа ошибки
const showInputError = function (formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass)
}

//функция скрытия ошибки
const hideInputError = function (formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(validationConfig.errorClass);
}

//функция проверки валидности
const checkInputValidity = function (inputElement, formElement, validationConfig) {
  const isValid = inputElement.validity.valid;

  if (isValid) {
    hideInputError(formElement, inputElement, validationConfig)
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig)
  }
}

//функция отключения нерабочей кнопки
const enableButton = function (buttonElement, validationConfig) {
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

//функция включения нерабочей кнопки
const disableButton = function (buttonElement, validationConfig) {
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  buttonElement.disabled = true;
}

//функция переключения кнопки самбита
const toggleButtonState = function (inputList, buttonElement, validationConfig) {
  const hasInvalidInput = inputList.every(function (inputElement) {
    return inputElement.validity.valid
  })

  if (hasInvalidInput) {
    enableButton(buttonElement, validationConfig);
  } else {
    disableButton(buttonElement, validationConfig);
  }
}

//функция добавления проверки валидности и переключении кнопки сабмита на инпуты
const setEventListeners = function (formElement, validationConfig) {

  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);


  toggleButtonState(inputList, submitButton, validationConfig);

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, formElement, validationConfig);
      toggleButtonState(inputList, submitButton, validationConfig);
    })
  })

}

//функция добавления валидности на все формы
const enableValidation = function (validationConfig) {
  const formList = document.querySelectorAll(validationConfig.formSelector);

  formList.forEach(function (formElement) {
    setEventListeners(formElement, validationConfig);
  })
}


enableValidation(validationConfig);
