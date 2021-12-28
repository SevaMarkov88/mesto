import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('form');
    this._submitForm = submitForm;
    this._handleSubmitListener = this._handleSubmitListener.bind(this);
    this._inputList = [...this._form.querySelectorAll('.popup__text')];
    this._submitBtn = this._form.querySelector('.popup__button');
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitListener);
  }

  _handleSubmitListener(evt) {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
  }


  close() {
    this._form.reset();
    super.close();
  }
}
