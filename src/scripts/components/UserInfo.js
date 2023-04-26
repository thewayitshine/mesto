export class UserInfo {
  constructor({ name, info }) {
    this._name = name;
    this._info = info;
  }

  getUserInfo() {
    this._userData = {
      name: this._name.textContent,
      info: this._info.textContent
    };

    return this._userData;
  }

  setUserInfo(inputValues) {
    this._name.textContent = inputValues.name;
    this._info.textContent = inputValues.info;
  }
}
