import { URL, AUTHORIZATION_KEY } from './consts';

class Api {
  constructor(url, authorizationToken) {
    this._url = url;
    // this._authorizationToken = authorizationToken;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // получает данные в профайл с сервера
  getUser() {
    const token = localStorage.getItem('token')

    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // получает карточки с сервера
  getCards() {
    const token = localStorage.getItem('token')

    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //отправляет изменныные данниу профайла на сервер
  edingProfile({ name, about }) {
    const token = localStorage.getItem('token')

    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // отправляет новую карточку на сервер
  addCard({ title: name, link }) {
    const token = localStorage.getItem('token')

    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //удалить карточку
  deleteCard(_id) {
    const token = localStorage.getItem('token')

    return fetch(`${this._url}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //изменение статуса лайка
  changeLikeCardStatus(_id, isLiked) {
    const token = localStorage.getItem('token')
    console.log(_id)
    console.log(isLiked)
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //смена аватара
  changeAvatar(link) {
    const token = localStorage.getItem('token')

    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

export const api = new Api(URL);
