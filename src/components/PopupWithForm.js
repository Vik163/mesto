import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }, popupForm, renderSaving) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._form = this._popup.querySelector(popupForm);
    this._handleSubmit = handleSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this.renderSaving = renderSaving;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (e) => {
      e.preventDefault();
      this.renderSaving(true, this._popupSelector);
      this._handleSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
