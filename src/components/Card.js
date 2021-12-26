export default class Card {
  constructor(data, cardTemplate, handleCardClick, handleDeleteCard, handleLike, ownerId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._cardId = data._id;
    this._pageOwnerId = ownerId;
    this._ownerId = data.owner._id;
    this._cardBlock = cardTemplate.querySelector('.element').cloneNode(true);
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
    this._cardImage = this._cardBlock.querySelector('.element__image');
    this._likeCounter = this._cardBlock.querySelector('.element__counter')
  }

  createCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardBlock.id = this._cardId;
    this._likeCounter.textContent = this._likes;
    this._cardBlock.querySelector('.element__title').textContent = this._name;

    if (this._pageOwnerId !== this._ownerId) {
      this._cardBlock.querySelector('.element__trash').remove();
    }

    this._setEventListeners();

    return this._cardBlock;
  }

  _setEventListeners() {
    const trashIcon = this._cardBlock.querySelector('.element__trash');
    this._cardBlock.querySelector('.element__like').addEventListener('click', (evt) => {
      this._handleLike(evt);
    });
    if (this._cardBlock.contains(trashIcon)) {
      this._cardBlock.querySelector('.element__trash').addEventListener('click', (evt) => {
        this._handleDeleteCard(evt);
      });
    }
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }
}
