import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._form = this._popup.querySelector('form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitHandlerConfirm();
            this.close();
        })
    }

    submitHandlerConfirm() {
        this._formSubmit()
    }
}