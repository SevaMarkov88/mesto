import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
    this._form = this._popupSelector.querySelector('form');
    this._formSubmit = formSubmit;
    this._handleSubmitListener = this._handleSubmitListener.bind(this);
  }

  _getInputValues() {
    const inputList = [...this._form.querySelectorAll('.popup__text')];
    const formValues = {};
    inputList.forEach((input) => {
      console.log(input.name);
      formValues[input.name] = input.value;
    });
    console.log(formValues);
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitListener);
  }

  _handleSubmitListener(evt) {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
  }

  _removeListeners() {
    super._removeListeners();
    this._form.removeEventListener('submit', this._handleSubmitListener);
  }

  close() {
    this._form.reset();
    super.close();
  }
}
