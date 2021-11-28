import {openPopup, popupImage} from "./index.js";

export default class Card {
  constructor(name, link, cardTemplate) {
    this._name = name;
    this._link = link;
    this._cardBlock = cardTemplate.querySelector('.element').cloneNode(true);
  }

  _createCard() {
    this._cardBlock.querySelector('.element__image').src = this._link;
    this._cardBlock.querySelector('.element__image').alt = this._name;
    this._cardBlock.querySelector('.element__title').textContent = this._name;

    this._addListenerLike();
    this._addListenerTrash();
    this._addListenerPopup();

    return this._cardBlock;
  }

  _addListenerLike() {
    this._cardBlock.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
    })
  }

  _addListenerTrash() {
    this._cardBlock.querySelector('.element__trash').addEventListener('click', (evt) => {
      evt.target.closest('.element').remove();
    })
  }

  _addListenerPopup() {
    this._cardBlock.querySelector('.element__image').addEventListener('click', () => {
      popupImage.querySelector('.popup__image').src = this._link;
      popupImage.querySelector('.popup__image').alt = this._name;
      popupImage.querySelector('.popup__subtitle').textContent = this._name;
      openPopup(popupImage);
    })
  }

  renderCard() {
    document.querySelector('.elements').prepend(this._createCard());
  }
}
