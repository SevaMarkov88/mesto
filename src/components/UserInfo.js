export default class UserInfo {
  constructor(nameElement, jobElement) {
    this._name = document.querySelector(nameElement);
    this._job = document.querySelector(jobElement);
  }

  getUserInfo() {
    return [this._name.textContent, this._job.textContent];
  }

  setUserInfo(name, job) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
