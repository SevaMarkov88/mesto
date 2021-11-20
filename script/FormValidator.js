export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  enableValidation() {
    const inputList = [...this._form.querySelectorAll(this._config.inputSelector)];
    const submitButton = this._form.querySelector(this._config.submitButtonSelector);

    this._toggleSubmitButton(submitButton);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleSubmitButton(submitButton);
      })
    })

  }

  _checkInputValidity (input) {
    !input.validity.valid ? this._showErrorMassage(input) : this._hideErrorMassage(input);
  }

  _showErrorMassage(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    const errorMassage = input.validationMessage.split('.')[0];
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMassage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideErrorMassage(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  }

  _toggleSubmitButton(button) {
    if (!this._form.checkValidity()) {
      button.classList.add(this._config.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._config.inactiveButtonClass);
      button.disabled = false;
    }
  }

  deleteErrorMessage() {
    if (this._form.closest(`.${this._config.popupClass}`).classList.contains(this._config.openedPopupClass)) {
      const inputList = [...this._form.querySelectorAll(this._config.inputSelector)];
      inputList.forEach((input) => {this._hideErrorMassage(input);});
    }
  }
}
