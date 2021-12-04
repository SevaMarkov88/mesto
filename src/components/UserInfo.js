export default class UserInfo {
  constructor(nameElement, jobElement) {
    this._name = document.querySelector(nameElement);
    this._job = document.querySelector(jobElement);
  }

  getUserInfo() {
    return [this._name.textContent, this._job.textContent];
  }

  setUserInfo(name, job) {
    document.querySelector('.profile__title').textContent = name;
    document.querySelector('.profile__subtitle').textContent = job;

  }
}
