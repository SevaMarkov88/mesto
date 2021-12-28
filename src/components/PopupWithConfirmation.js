import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._form = this._popup.querySelector('form');
        this._handleSubmit = this._handleSubmit.bind(this)
        this._cardId = null;
        this._deletefunc = null;
    }

    _handleSubmit = (evt) => {
        evt.preventDefault();
        this._formSubmit(this._cardId, this._deletefunc);
        this.close();
    }

    open(cardId, deleteFunc) {
        this._cardId = cardId;
        this._deletefunc = deleteFunc;
        super.open()
    }

    close() {
        this._cardId = null;
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmit)
    }
}