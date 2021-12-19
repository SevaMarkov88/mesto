export default class Card {
  constructor(name, link, likes, cardTemplate, handleCardClick) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardBlock = cardTemplate.querySelector('.element').cloneNode(true);
    this._handleCardClick = handleCardClick;
    this._cardImage = this._cardBlock.querySelector('.element__image');
    this._likeCounter = this._cardBlock.querySelector('.element__counter')
  }

  createCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCounter.textContent = this._likes;
    this._cardBlock.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();

    return this._cardBlock;
  }

  _setEventListeners() {
    this._cardBlock.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
    });
    this._cardBlock.querySelector('.element__trash').addEventListener('click', (evt) => {
      evt.target.closest('.element').remove();
    });
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }
}
