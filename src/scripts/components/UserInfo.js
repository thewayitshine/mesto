export class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    this._userData = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    };

    return this._userData;
  }

  setUserInfo(inputValues) {
    this._name.textContent = inputValues.name;
    this._about.textContent = inputValues.about;
  }

  setAvatar(inputValues) {
    this._avatar.src = inputValues.avatar;
  }
}
