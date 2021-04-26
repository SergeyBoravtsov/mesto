export default class Card {
  constructor({ data, handleCardClick }, template) {
    this._title = data.name;
    this._url = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._isLiked = false;
  }

  _getTemplate() {
    this._view = document
      .querySelector(this._template)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  // функции-обработчики, которые передаются слушателям в функции _setEventListeners
  _toggleLike() {
    this._likeButton.classList.toggle("card__like-button_dark");
  }

  _deleteCard() {
    this._view.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });

    this._deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    this._imageElement.addEventListener("click", () => {
      this._handleCardClick({
        name: this._title,
        link: this._url,
      });
    });
  }

  // публичный метод создания карточки. Сначала копируем темплейт, затем заполняем его данными из приватных свойств
  // и навешиваем три слушателя: на элементы лайка, корзины и изображения.
  createCardElement() {
    this._getTemplate();
    this._titleElement = this._view.querySelector(".card__title");
    this._imageElement =this._view.querySelector(".card__image");
    this._likeButton = this._view.querySelector(".card__like-button");
    this._deleteButton = this._view.querySelector(".card__trash-button");
    this._titleElement.textContent = this._title;
    this._imageElement.src = this._url;
    this._imageElement.alt = this._title;
    this._setEventListeners();
    return this._view;
  }
}
