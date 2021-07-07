import { avatar } from "../utils/constants.js";

export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  // метод заполнения полей в форме редактирования профиля значениями из разметки
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  // метод передачи в DOM-дерево значений из объекта inputValues, содержащего данные полей ввода
  setUserInfo(inputValues) {
    this._name.textContent = inputValues.name;
    this._about.textContent = inputValues.about;
  }

  // метод установки картинки в разметку, ссылка на которую получена с сервера, в качестве аватара
  setAvatar(link) {
    avatar.style.backgroundImage = `url(${link})`;
  }

  getMyId(data) {
    this.myId = data._id; // записываем Id пользователя в публичное поле класса
  }
}
