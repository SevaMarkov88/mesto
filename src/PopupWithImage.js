import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._name = name;
    this._link = link;
  }

  open() {
    super.open();
      this._popupSelector.querySelector('.popup__image').src = this._link;
      this._popupSelector.querySelector('.popup__image').alt = this._name;
      this._popupSelector.querySelector('.popup__subtitle').textContent = this._name
  }

}
