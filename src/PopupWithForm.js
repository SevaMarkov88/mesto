import Popup from "./Popup.js";
import {formEdit, profileTitle, profileSubtitle} from "./index.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    const inputList = [...this._formSubmit.querySelectorAll('.popup__text')];
    const inputValue = {};
    inputList.forEach((input) => {
      inputValue[input.id.slice(6)] = input.value;
    });
    console.table(inputValue);
    if (this._formSubmit === formEdit) {
      profileTitle.textContent = inputValue.name;
      profileSubtitle.textContent = inputValue.job;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSubmit.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this.close();
    })
  }

  close() {
    super.close();
    this._formSubmit.reset();
  }
}
