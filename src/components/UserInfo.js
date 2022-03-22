export default class UserInfo {
  constructor(profileTitle, profileSubtitle) {
    this._profileTitle = profileTitle;
    this._profileSubtitle = profileSubtitle;
  }

  getUserInfo() {
    this._userInfo = {
      name: this._profileTitle.textContent,
      job: this._profileSubtitle.textContent,
    };

    return this._userInfo;
  }

  setUserInfo(name, job) {
    this._profileTitle.textContent = name;
    this._profileSubtitle.textContent = job;
  }
}
