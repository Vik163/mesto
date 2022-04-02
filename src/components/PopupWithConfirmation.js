import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { deleteCard }) {
    super(popupSelector);
    this.deleteCard = deleteCard;
  }

  setEventListeners(obj, item) {
    this._popup.addEventListener("submit", (e) => {
      e.preventDefault();
      this.close();
      this.deleteCard(obj, item);
    });
    super.setEventListeners();
  }
}
