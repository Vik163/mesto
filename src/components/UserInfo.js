export default class UserInfo {
  constructor(profileTitle, profileSubtitle, profileAvatar, userId) {
    this._profileTitle = profileTitle;
    this._profileSubtitle = profileSubtitle;
    this._profileAvatar = profileAvatar;
    this._userId = userId; //
  }

  getUserInfo() {
    this._userInfo = {
      name: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent,
      avatar: this._profileAvatar.src,
    };

    return this._userInfo;
  }

  setUserInfo(obj) {
    const { name, about, avatar, _id } = obj;
    this._profileTitle.textContent = name;
    this._profileSubtitle.textContent = about;
    this._profileAvatar.src = avatar;
    this._userId = _id; // здесь id находит, но не меняет
  }
}
