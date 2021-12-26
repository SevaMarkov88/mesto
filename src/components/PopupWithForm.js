import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('form');
    this._formSubmit = formSubmit;
    this._handleSubmitListener = this._handleSubmitListener.bind(this);
    this._inputList = [...this._form.querySelectorAll('.popup__text')];
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
      this.renderLoading(true);
      this._formSubmit(this._getInputValues());
      this.close();
      this.renderLoading(false)
  }

  renderLoading(isLoading) {
    const submitBtn = this._form.querySelector('.popup__button')
    isLoading ? submitBtn.textContent = 'Сохранение...' : submitBtn.textContent = 'Сохранить';
  }

  close() {
    this._form.reset();
    super.close();
  }
}
