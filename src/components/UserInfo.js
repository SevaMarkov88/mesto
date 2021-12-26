export default class UserInfo {
  constructor(nameElement, jobElement, avatar) {
    this._name = document.querySelector(nameElement);
    this._job = document.querySelector(jobElement);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return [this._name.textContent, this._job.textContent];
  }

  setUserInfo(name, job) {
    this._name.textContent = name;
    this._job.textContent = job;
  }

  setUserAvatar(link) {
    this._avatar.src = link;
  }
}
