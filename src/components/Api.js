class Api {
  constructor(settings) {
    this._settings = settings;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._settings.baseUrl}/users/me`, {
      headers: {
        authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
      },
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._settings.baseUrl}/cards`, {
      headers: {
        authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
      },
    }).then(this._checkResponse);
  }

  addCard(formValues) {
    return fetch(`${this._settings.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formValues.name,
        link: formValues.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(obj) {
    return fetch(`${this._settings.baseUrl}/cards/${obj._id}`, {
      method: "DELETE",
      headers: {
        authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
      },
    }).then(this._checkResponse);
  }

  sendInfoProfile(formValues) {
    return fetch(`${this._settings.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formValues.inputName,
        about: formValues.inputAboutMe,
      }),
    }).then(this._checkResponse);
  }

  addAvatar(formValues) {
    return fetch(`${this._settings.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: formValues.link,
      }),
    }).then(this._checkResponse);
  }

  addLikes(obj) {
    return fetch(`${this._settings.baseUrl}/cards/${obj._id}/likes`, {
      method: "PUT",
      headers: {
        authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: obj.likes,
      }),
    }).then(this._checkResponse);
  }

  deleteLike(obj) {
    return fetch(`${this._settings.baseUrl}/cards/${obj._id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
      },
    }).then(this._checkResponse);
  }
}

//
export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
    "Content-Type": "application/json",
  },
});
