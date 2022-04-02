class Api {
  constructor(settings) {
    this._settings = settings;
  }

  getUserInfo() {
    return fetch(`${this._settings.baseUrl}/users/me`, {
      headers: {
        authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(`${this._settings.baseUrl}/cards`, {
      headers: {
        authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
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
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(obj) {
    return fetch(`${this._settings.baseUrl}/cards/${obj._id}`, {
      method: "DELETE",
      headers: {
        authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
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
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
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
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
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
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
  }

  deleteLike(obj) {
    return fetch(`${this._settings.baseUrl}/cards/${obj._id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
  }
}

//

//
export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
    "Content-Type": "application/json",
  },
});
