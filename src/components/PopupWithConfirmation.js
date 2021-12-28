import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._form = this._popup.querySelector('form');
        this._handleSubmit = this._handleSubmit.bind(this)
        this._data = null;
    }

    _handleSubmit = (evt) => {
        evt.preventDefault();
        this._formSubmit(this._data);
        this.close();
    }

    open(data) {
        this._data = data;
        super.open()
    }

    close() {
        this._data = null;
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmit)
    }
}