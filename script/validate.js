//variables
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__text_error',
  errorClass: 'popup__span-error_active',
  popupClass: 'popup',
  openedPopupClass: 'popup_opened'
};

//functions
/**
 * adding listeners on all inputs
 * @param {object} config all class names of page
 */
function enableValidation (config) {
  const formList = [...document.querySelectorAll(config.formSelector)];

  formList.forEach((formElement) => {
    const inputList = [...formElement.querySelectorAll(config.inputSelector)];
    const submitButton = formElement.querySelector(config.submitButtonSelector);

    toggleSubmitButton(formElement, submitButton);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(formElement, input);
        toggleSubmitButton(formElement, submitButton);
      });
    })
  })
}

/**
 * checking form validity
 * @param {element} form form block
 * @param {element} input input field
 */
function checkInputValidity (form, input) {
  !input.validity.valid ? showErrorMassage(form, input) : hideErrorMassage(form, input);
}

/**
 * show error massage near input field
 * @param {element} form form block
 * @param {element} input input field
 */
function showErrorMassage(form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  let errorMassage = input.validationMessage;
  input.classList.add(config.inputErrorClass);
  errorMassage = errorMassage.split('.')[0];
  errorElement.textContent = errorMassage;
  errorElement.classList.add(config.errorClass);
}

/**
 * hide error massage
 * @param {element} form form block
 * @param {element} input input text
 */
function hideErrorMassage(form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

/**
 * activate and deactivate submit form button
 * @param {element} form form block
 * @param {element} button submit button
 */
function toggleSubmitButton(form, button) {
  if (!form.checkValidity()) {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  }
}

/**
 * delete error message when popup closing
 * @param {element} form form block
 */
function deleteErrorMessage(form) {
  if (!form.closest(`.${config.popupClass}`).classList.contains(config.openedPopupClass)) {
    const inputList = [...form.querySelectorAll(config.inputSelector)];
    inputList.forEach((input) => {hideErrorMassage(form, input);});
  }
}

//active when page loading

enableValidation(config);

