export default class Popup {

    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector)
    }

    _handleEscClose (evt) {
        if (evt.key === 'Escape') {
            this.close();
          }
    }

    open () {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt)
        });
    }

    close () {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt)
        });
    }

    setEventListeners () {
        // закрытие попапа по клику на крестик
        this._popup
        .querySelector('.popup__close')
        .addEventListener('click', () => {
            this.close()
        });

        // закрытие попапа по клику на оверлее
        this._popup
        .addEventListener('click', (event) => {
            if (event.target === this._popup) { 
                this.close(); 
             } 
        });
    }
}