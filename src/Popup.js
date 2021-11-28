export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    this.removeEventListeners();
  }

  _handleEscClose(evt) {
    const key = evt.key;
    if (key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', () => this._handleEscClose());
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target === this._popupSelector || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }

  removeEventListeners() {
    document.removeEventListener('keydown', () => this._handleEscClose());
    this._popupSelector.removeEventListener('click', (evt) => {
      if (evt.target === this._popupSelector || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}
