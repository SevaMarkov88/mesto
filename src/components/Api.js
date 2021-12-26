export default class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.token = options.headers.authorization;
  }

  _handleFetch(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        'authorization': this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._handleFetch(res));

  }

  getCardUserName(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'GET',
      headers: {
        'authorization': this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._handleFetch(res));
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      method: 'GET',
      headers: {
        'authorization': this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._handleFetch(res));
  }

  addNewCard(name, link) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: {
        'authorization': this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._handleFetch(res));
  }

  toggleLike(cardId) {
    if (cardId.classList.contains('element__like_active')) {
      return fetch(`${this.url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          'authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
        .then(res => this._handleFetch(res));
    } else {
      return fetch(`${this.url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          'authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
        .then(res => this._handleFetch(res));

    }
  }


  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'authorization': this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._handleFetch(res));
  }

  updateUserInfo(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        'authorization': this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._handleFetch(res));
  }

}


