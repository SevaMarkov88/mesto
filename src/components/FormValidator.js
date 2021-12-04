export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = [...this._form.querySelectorAll(this._config.inputSelector)];
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }

  enableValidation() {
    this._toggleSubmitButton(this._submitButton);
    this._deleteErrorMessage();

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleSubmitButton(this._submitButton);
      })
    })
  }

  _checkInputValidity(input) {
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

  _toggleSubmitButton() {
    if (!this._form.checkValidity()) {
      this.submitButtonDisable();
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _deleteErrorMessage() {
    this._inputList.forEach((input) => {
      this._hideErrorMassage(input);
    });
  }

  submitButtonDisable() {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._config.inactiveButtonClass);
  }
}
