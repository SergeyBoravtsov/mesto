export default class Card {
    constructor ({ data, handleCardClick }, template) {
        this._title = data.name
        this._url = data.link
        this._template = template
        this._handleCardClick = handleCardClick
        this._isLiked = false
    }

    _getTemplate() {
        this._view = document
        .querySelector(this._template)
        .content
        .querySelector('.card')
        .cloneNode(true)
    }

    // функции-обработчики, которые передаются слушателям в функции _setEventListeners
    _toggleLike() {
        this._view.querySelector('.card__like-button')
        .classList.toggle('card__like-button_dark');
    }

    _deleteCard() {
        this._view.remove();
    }


    _setEventListeners() {
        const likeButton = this._view.querySelector('.card__like-button');
        likeButton.addEventListener('click', () => {
            this._toggleLike()
        });

        const trashButton = this._view.querySelector('.card__trash-button');
        trashButton.addEventListener('click', () => {
            this._deleteCard()
        });

        const cardImage = this._view.querySelector('.card__image');
        cardImage.addEventListener('click', () => {
            this._handleCardClick({
                name: this._title,
                link: this._url
              })
        });
    }

    // публичный метод создания карточки. Сначала копируем темплейт, затем заполняем его данными из приватных свойств
    // и навешиваем три слушателя: на элементы лайка, корзины и изображения.
    createCardElement() {
        this._getTemplate();
        this._view.querySelector('.card__title').textContent = this._title;
        const cardImage = this._view.querySelector('.card__image');
        cardImage.src = this._url;
        cardImage.alt = this._title;
        this._setEventListeners();
        return this._view
    }
}