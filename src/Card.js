import PopupWithImage from "./PopupWithImage.js";
import {popupImage, cardsContainer} from "./index.js";

export default class Card {
  constructor(name, link, cardTemplate) {
    this._name = name;
    this._link = link;
    this._cardBlock = cardTemplate.querySelector('.element').cloneNode(true);
  }

  createCard() {
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
    this._cardBlock.querySelector('.element__image').addEventListener('click', () => this._handleCardClick())
  }

  _handleCardClick() {
    const openBigImg = new PopupWithImage(popupImage, this._name, this._link);
    openBigImg.open();
  }

  renderCard() {
    cardsContainer.prepend(this.createCard());
  }
}
