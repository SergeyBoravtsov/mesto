const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


//объект конфигурации валидации
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
    }


// находим кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton= document.querySelector('.profile__add-button');
const closePopupButtons = document.querySelectorAll('.popup__close');

// находим попапы
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupBigImage = document.querySelector('.popup_big-image');
const popupImage = popupBigImage.querySelector('.popup__image');
const popupCaption = popupBigImage.querySelector('.popup__caption');

// попап редактирования профиля
const nameInput = document.querySelector('#username');
const jobInput = document.querySelector('#userjob');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editProfileForm = document.querySelector('#edit-profile-form');

// попап добавления информации о месте
const placeNameInput = document.querySelector('#placename');
const imageLinkInput = document.querySelector('#imagelink');
const cardTitle = document.querySelector('.card__title');
const addCardForm = document.querySelector('#add-card-form');

const cardsContainer = document.querySelector('.cards__list');
const templateElement = document.querySelector('.template');

// найдём все попапы
const allPopups = document.querySelectorAll('.popup');


export { 
    initialCards,
    config,
    editButton,
    addButton,
    closePopupButtons,
    popupEditProfile,
    popupAddCard,
    popupBigImage,
    popupImage,
    popupCaption,
    nameInput,
    jobInput,
    profileName,
    profileJob,
    editProfileForm,
    placeNameInput,
    imageLinkInput,
    cardTitle,
    addCardForm,
    cardsContainer,
    templateElement,
    allPopups 
}