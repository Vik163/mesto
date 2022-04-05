import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._data = data;
  }

  open(title, link) {
    const { popupImageOpen, popupImageCaption } = this._data;
    popupImageOpen.src = link;
    popupImageOpen.alt = title;
    popupImageCaption.textContent = title;
    super.open();
  }
}
