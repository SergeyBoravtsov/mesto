export default class Card {
  constructor(
    { data, handleCardClick, handleDeletionClick, handleLikeClick },
    template
  ) {
    this._title = data.name;
    this._url = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleDeletionClick = handleDeletionClick;
    this._handleLikeClick = handleLikeClick;    
  }

  _getTemplate() {
    this._view = document
      .querySelector(this._template)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deletionButton.addEventListener("click", (event) => {
      this._handleDeletionClick(event);
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
    this._imageElement = this._view.querySelector(".card__image");
    this._likeButton = this._view.querySelector(".card__like-button");
    this._deletionButton = this._view.querySelector(".card__trash-button");
    this._likeCounter = this._view.querySelector(".card__like-counter");
    this._likeCounter.textContent = this._likes.length;
    this._titleElement.textContent = this._title;
    this._imageElement.src = this._url;
    this._imageElement.alt = this._title;
    this._setEventListeners();
    this.fillLike();
    return this._view;
  }

  isLiked() {
    // метод, возвращающий true, если в массиве лайков карточки есть мой лайк
    return this._likes.some((like) => like._id === this.myUserId);
  }

  fillLike() {
    // метод, закрашивающий сердечко в случае, если в массиве лайков карточки есть мой лайк
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_dark");
    } else {
      this._likeButton.classList.remove("card__like-button_dark");
    }
  }

  updateLikeCounter() {
    this._likeCounter.textContent = this._likes.length;
  }

  isMine() {
    return (this.myUserId === this._ownerId)
  }
}
