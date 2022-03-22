export class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
  }

  //3.11 при событии обработчика проверяет валидность полученного поля и вызывает или
  //скрывает показ ошибки
  _checkValid() {
    if (!this._inputElement.validity.valid) {
      this._showInputError(this._inputElement.validationMessage);
    } else {
      this._hideInputError();
    }
  }

  _showInputError(errorMessage) {
    // Находим span элемент по id инпута
    this._errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-error`
    );

    this._inputElement.classList.add(this._data.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._data.errorClass);
  }

  _hideInputError() {
    this._errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-error`
    );

    this._inputElement.classList.remove(this._data.inputErrorClass);
    this._errorElement.classList.remove(this._data.errorClass);
    this._errorElement.textContent = "";
  }

  toggleButtonState() {
    // Проверка валидности 2 полей
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute("disabled", true);
      this._buttonElement.classList.add(this._data.inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._data.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  // Проверка на ошибки инпутов
  resetValidation() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;
      this._hideInputError();
    });
  }

  //2 установка обработчиков на инпуты
  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._data.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._data.submitButtonSelector
    );
    // два вызова, чтобы кнопка была неактивной и при открытии окна
    this.toggleButtonState();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._inputElement = inputElement;

        this._checkValid();
        //3.21 Функция переключения состояния кнопки submit
        this.toggleButtonState();
      });
    });
  }

  //3.22 Функция проверки валидности 2 полей
  _hasInvalidInput() {
    // фильтр на true невалидных полей
    return this._inputList.some((inputElement) => {
      // вернёт true если поле невалидно
      return !inputElement.validity.valid;
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
