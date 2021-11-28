import Popup from "./Popup.js";
import Card from "./Card.js";
import {profileTitle, profileSubtitle, cardTemplate} from "./index.js";

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
    if (this._formSubmit.classList.contains('form-edit')) {
      profileTitle.textContent = inputValue.name;
      profileSubtitle.textContent = inputValue.job;
    } else if (this._formSubmit.classList.contains('form-add')) {
      const newCard = new Card(inputValue.title, inputValue.link, cardTemplate);
      newCard.renderCard();
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
