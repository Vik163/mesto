export default class UserInfo {
  constructor(data, inputData) {
    this._data = data;
    this._inputData = inputData;
  }

  getUserInfo() {
    const { nameInput, jobInput } = this._inputData;
    const { profileTitle, profileSubtitle } = this._data;
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }

  setUserInfo() {
    const { nameInput, jobInput } = this._inputData;
    const { profileTitle, profileSubtitle } = this._data;
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
  }
}
