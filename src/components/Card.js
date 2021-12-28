export default class Card {
    constructor(data, cardTemplate, handleCardClick, {handleDeleteCard}, {handleLike}, ownerId) {
        this._data = data;
        this._pageOwnerId = ownerId;
        this._cardBlock = cardTemplate.querySelector('.element').cloneNode(true);
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLike = handleLike;
        this._cardImage = this._cardBlock.querySelector('.element__image');
        this._cardLike = this._cardBlock.querySelector('.element__like');
        this._likeCounter = this._cardBlock.querySelector('.element__counter')
    }

    createCard() {
        this._cardImage.src = this._data.link;
        this._cardImage.alt = this._data.name;
        this._cardBlock.id = this._data._id;
        this._likeCounter.textContent = this._data.likes.length;
        this._cardBlock.querySelector('.element__title').textContent = this._data.name;

        if (this._pageOwnerId !== this._data.owner._id) {
            this._cardBlock.querySelector('.element__trash').remove();
        }

        this._setEventListeners();
        this._colorLike(this._data);

        return this._cardBlock;
    }

    isLiked() {
        return this._data.likes.some(user => user._id === this._pageOwnerId);
    }

    updateLike(obj) {
        this._data = obj;
        this._likeCounter.textContent = this._data.likes.length;
        this._colorLike(obj);
    }

    _colorLike(obj) {
        if (!this.isLiked(obj)) {
            this._cardLike.classList.remove('element__like_active');
        } else {
            this._cardLike.classList.add('element__like_active');
        }
    }

    _setEventListeners() {
        this._cardBlock.querySelector('.element__like').addEventListener('click', () => {
            this._handleLike(this._data);
        });
        if (this._pageOwnerId === this._data.owner._id) {
            this._cardBlock.querySelector('.element__trash').addEventListener('click', () => {
                this._handleDeleteCard(this);
            });
        }
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._data.name, this._data.link));
    }

    deleteCard() {
        this._cardBlock.remove();
    }
}
