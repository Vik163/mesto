//3.11 при событии обработчика проверяет валидность полученного поля и вызывает или
//скрывает показ ошибки
const checkValid = (formElement, inputElement, el) => {

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, el);
  } else {
    hideInputError(formElement, inputElement, el);
  }
};

const showInputError = (formElement, inputElement, errorMessage, el) => {
  // Находим span элемент по id инпута
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(el.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(el.errorClass);
};

const hideInputError = (formElement, inputElement, el) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(el.inputErrorClass);
  errorElement.classList.remove(el.errorClass);
  errorElement.textContent = '';
};


//2 установка обработчиков на инпуты
const setEventListeners = (formElement, el) => {
  const inputList = Array.from(formElement.querySelectorAll(el.inputSelector));
  const buttonElement = formElement.querySelector(el.submitButtonSelector);
// два вызова, чтобы кнопка была неактивной и при открытии окна
  toggleButtonState(inputList, buttonElement, el);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValid(formElement, inputElement, el)

      toggleButtonState(inputList, buttonElement, el);
    });
  });
};

//1. Функция включения валидации
const enableValidation = (el) => {
  const formList = Array.from(document.querySelectorAll(el.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, el);
  });
};

//3.22 Функция проверки валидности 2 полей
const hasInvalidInput = (inputList) => {
  // фильтр на true невалидных полей
  return inputList.some((inputElement) => {

    // вернёт true если поле невалидно
    return !inputElement.validity.valid;
  })
};

//3.21 Функция переключения состояния кнопки submit
const toggleButtonState = (inputList, buttonElement, el) => {

  // Проверка валидности 2 полей
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(el.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(el.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
