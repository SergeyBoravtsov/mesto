export default class UserInfo {
    constructor ({ nameSelector, jobSelector }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    }

    // метод заполнения полей в форме редактирования профиля значениями из разметки
    getUserInfo () {
        const aboutUser = {};
        aboutUser.name = this._name.textContent;
        aboutUser.job = this._job.textContent;
        return aboutUser;
    }
    
    // метод передачи в DOM-дерево значений из объекта inputValues, содержащего данные полей ввода
    setUserInfo (inputValues) {
        this._name.textContent = inputValues.name;
        this._job.textContent = inputValues.job;
    } 
}