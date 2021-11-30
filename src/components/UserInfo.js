import {profileSubtitle, profileTitle} from "../pages";

export default class UserInfo {
  constructor(name, job) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    return [this._name, this._job];
  }

  setUserInfo() {
    const profileObj = this.getUserInfo();
    profileTitle.textContent = profileObj[0];
    profileSubtitle.textContent = profileObj[1];

  }
}
