import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { deleteCard }) {
    super(popupSelector);
    this.deleteCard = deleteCard;
  }

  open(obj, item) {
    this.obj = obj;
    this.item = item;
    super.open();
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (e) => {
      e.preventDefault();
      this.deleteCard(this.obj, this.item);
    });
    super.setEventListeners();
  }
}
