export default class Api {
  constructor(options) {
    this._options = options;
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
    return response.json();
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  setProfileInfo(inputValues) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      body: JSON.stringify(inputValues),
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  setAvatar(inputValue) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify(inputValue),
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  dislikeCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }
}
