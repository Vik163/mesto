import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor({ popupSelector, renderer }) {
    super(popupSelector);
    this._renderer = renderer;
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners(item) {
    this._element = item;
    this._element.addEventListener("submit", (evt) => {
      this._getInputValues(this._element);
      this._renderer(evt);
    });
    // super.setEventListeners();
  }

  close(inputs) {
    inputs.reset();
  }
}
