
//переменная объекта параметров
const selectorsAndClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//функция показа ошибки
const showInputError = function (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(selectorsAndClasses.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectorsAndClasses.errorClass)
}

//функция скрытия ошибки
const hideInputError = function (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(selectorsAndClasses.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(selectorsAndClasses.errorClass);
}

//функция проверки валидности
const checkInputValidity = function (inputElement) {
  const isValid = inputElement.validity.valid;
  const closestForm = inputElement.closest(selectorsAndClasses.formSelector);

  if (isValid) {
    hideInputError(closestForm, inputElement)
  } else {
    showInputError(closestForm, inputElement, inputElement.validationMessage)
  }
}

//функция переключения кнопки самбита
const toggleButtonState = function (inputList, buttonElement) {
  const hasInvalidInput = inputList.every(function (inputElement) {
    return inputElement.validity.valid
  })

  if (hasInvalidInput) {
    buttonElement.classList.remove(selectorsAndClasses.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  } else {
    buttonElement.classList.add(selectorsAndClasses.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
}

//функция добавления проверки валидности и переключении кнопки сабмита на инпуты
const setEventListeners = function (formElement, selectorsAndClasses) {

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  })

  const inputList = Array.from(formElement.querySelectorAll(selectorsAndClasses.inputSelector));
  const submitButton = formElement.querySelector(selectorsAndClasses.submitButtonSelector);

  toggleButtonState(inputList, submitButton);

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement);
      toggleButtonState(inputList, submitButton);
    })
  })

}

//функция добавления валидности на все формы
const enableValidation = function (selectorsAndClasses) {
  const formList = document.querySelectorAll(selectorsAndClasses.formSelector);

  formList.forEach(function (formElement) {
    setEventListeners(formElement, selectorsAndClasses);
  })
}


enableValidation(selectorsAndClasses);
