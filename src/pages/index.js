import './index.css'
import { 
    initialCards, 
    editButton,
    addButton, 
    editProfileForm, 
    addCardForm, 
    config
} from '../utils/constants.js'

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'

// создание объекта валидации формы редакитрования профиля и запуск функции валидации
const editProfileFormValidator = new FormValidator(config, editProfileForm)
editProfileFormValidator.enableValidation()

// создание объекта валидации формы добавления новой карточки и запуск функции валидации
const addNewCardFormValidator = new FormValidator(config, addCardForm)
addNewCardFormValidator.enableValidation()

// создание объекта класса UserInfo
const user = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__job' })

// создание объекта класса PopupWithImage
const bigImage = new PopupWithImage('.popup_big-image');
bigImage.setEventListeners();

// создание объекта класса Section
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card({ data: item, handleCardClick: () => {
        bigImage.open(item)
      }}, '.template');
      const cardElement = card.createCardElement();
      cardsList.addItemAppend(cardElement);
    }
  }, '.cards__list');
  

// отрисовка карточек на основе данных из массива initialCards
cardsList.renderItems();


// создание объекта класса PopupWithForm для формы редактирования профиля
const popupWithEditProfileForm = new PopupWithForm(
    '.popup_edit-profile',
    (inputValues) => {
    user.setUserInfo(inputValues)
});

popupWithEditProfileForm.setEventListeners();


// создание объекта класса PopupWithForm для формы создания новой карточки
const popupWithAddCardForm = new PopupWithForm(
    '.popup_add-card',
    (inputValues) => {
        const card = new Card({ 
            data: inputValues, 
            handleCardClick: () => {
            bigImage.open(inputValues)
          }}, '.template');
        cardsList.addItemPrepend(card.createCardElement())
        addNewCardFormValidator.blockSubmitButton()
    });

  popupWithAddCardForm.setEventListeners();


editButton.addEventListener('click', () => {
  editProfileFormValidator.clearErrors();
  editProfileFormValidator.blockSubmitButton();
  popupWithEditProfileForm.fillInputs(user.getUserInfo());
  popupWithEditProfileForm.open();
});


addButton.addEventListener('click', () => {
  addCardForm.reset();
  addNewCardFormValidator.clearErrors();
  popupWithAddCardForm.open();
});