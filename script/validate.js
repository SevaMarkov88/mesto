//variables
const validateElementsList = {
  formElementList: ''
};

//active when load page
enableValidation();

//listeners
validateElementsList.formElementList.forEach((formElement) => {
  setEventListeners(formElement);
})
//functions
/**
 * add array of all form elements to validateElementList
 */
function enableValidation() {
  validateElementsList.formElementList = Array.from(document.querySelectorAll('.popup__form'));
}
/**
 * show mistakes in input fields
 * @param {element} formElement form block with inputs
 * @param {element} inputElement input element
 * @param {string} errorMessage browser standard error message
 */
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__text_error');
  errorMessage = errorMessage.split('.')[0];
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__span-error_active');
}

/**
 * hide mistakes in input fields
 * @param {element} formElement form block with inputs
 * @param {element} inputElement input element
 */
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__text_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__span-error_active');
}

/**
 * activate listeners on inputs
 * @param {element} formElement form block with inputs
 */
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

/**
 * toggle submit button in form block
 * @param {array} inputList array of inputs in form block
 * @param {element} buttonElement submit button in form block
 */
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_inactive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__button_inactive');
    buttonElement.disabled = false;
  }

}

/**
 * finding valid input in form block
 * @param {array} inputList array of inputs in form block
 * @returns {boolean} validity of input
 */
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

/**
 * checking input validity
 * @param {element} formElement form block with inputs
 * @param {element} inputElement input element
 */
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
