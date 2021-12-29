import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('form');
    this._handleSubmit = this._handleSubmit.bind(this)
    this._cardElem = null;
  }

  _handleSubmit = () => {
    this._submitForm(this._cardElem)
  }

  open(cardElem) {
    this._cardElem = cardElem;
    super.open()
  }

  close() {
    this._cardElem = null;
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit()
    })
  }
}
