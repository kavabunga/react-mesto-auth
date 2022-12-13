import {
  serverUrl,
  serverToken
} from '../utils/constants';

class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetchRequest(url, options) {
    return fetch(url, options )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  postData(data, directory) {
    const url = `${this._baseUrl}/${directory}`;
    const options = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    };
    return this._fetchRequest(url, options);
  }

  getUserData() {
    const url = `${this._baseUrl}/users/me`;
    const options = {
      method: 'GET',
      headers: this._headers,
    };
    return this._fetchRequest(url, options);
  }

  getCardsData() {
    const url = `${this._baseUrl}/cards`;
    const options = {
      method: 'GET',
      headers: this._headers,
    };
    return this._fetchRequest(url, options);
  }

  patchData(data, directory) {
    const url = `${this._baseUrl}/${directory}`;
    const options = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    };
    return this._fetchRequest(url, options);
  }

  deleteData(directory, itemId) {
    const url = `${this._baseUrl}/${directory}/${itemId}`;
    const options = {
      method: 'DELETE',
      headers: this._headers,
    };
    return this._fetchRequest(url, options);
  }

  likeCard(itemId, state) {
    const url = `${this._baseUrl}/cards/${itemId}/likes`;
    const method = state ? 'PUT' : 'DELETE';
    const options = {
      method: method,
      headers: this._headers,
    };
    return this._fetchRequest(url, options);
  }
}

const api = new Api({
  baseUrl: serverUrl,
  headers: {
    authorization: serverToken,
    'Content-Type': 'application/json'
  }
});

export default api;
