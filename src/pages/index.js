import "./index.css";

import {
  editButton,
  addButton,
  editAvatarButton,
  editProfileForm,
  addCardForm,
  editAvatarForm,
  validationConfig,
  //avatar,
  myToken,
  saving,
  deletion,
  save,
  create,
  yes,
  //popupAddCard,
  popupAddCardSubmitButton,
  popupEditProfileSubmitButton,
  popupEditAvatarSubmitButton,
  popupDeleteCardSubmitButton,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

/////////////////////// Создание экземпляров классов /////////////////////////////

// создание объекта валидации формы редактирования профиля и запуск валидации
const editProfileFormValidator = new FormValidator(
  validationConfig,
  editProfileForm
);
editProfileFormValidator.enableValidation();

// создание объекта валидации формы добавления новой карточки и запуск валидации
const addNewCardFormValidator = new FormValidator(
  validationConfig,
  addCardForm
);
addNewCardFormValidator.enableValidation();

// создание объекта валидации формы редактирования аватара и запуск валидации
const editAvatarFormValidator = new FormValidator(
  validationConfig,
  editAvatarForm
);
editAvatarFormValidator.enableValidation();

// создание экземпляра Api с адресом сервера и токеном авторизации
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-23",
  headers: {
    authorization: myToken,
    "Content-Type": "application/json",
  },
});

// создание объекта класса UserInfo
const user = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
});

////////////////////////////////// Создание экземпляров попапов /////////////////////////////////////////

// создание объекта класса PopupWithImage
const bigImage = new PopupWithImage(".popup_big-image");
bigImage.setEventListeners(); //обвесить попап слушателями

// создание объекта класса PopupWithForm для формы создания новой карточки
const popupWithAddCardForm = new PopupWithForm(
  ".popup_add-card",
  (inputValues) => {
    popupAddCardSubmitButton.textContent = saving; // отобразить прелоадер

    api
      .addCard(inputValues)
      .then((answer) => {
        console.log(answer);
        api
          .getAllCards()
          .then((data) => {
            //console.log(data)
            renderAllCards(data);
            popupWithAddCardForm.close();
            addNewCardFormValidator.blockSubmitButton();
            popupAddCardSubmitButton.textContent = create; // убрать прелоадер
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }
);
popupWithAddCardForm.setEventListeners(); //обвесить попап слушателями

// создание объекта класса PopupWithForm для формы редактирования профиля
const popupWithEditProfileForm = new PopupWithForm(
  ".popup_edit-profile",
  (inputValues) => {
    popupEditProfileSubmitButton.textContent = saving; // отобразить прелоадер

    api
      .setProfileInfo(inputValues) // отправляем данные о себе из формы на сервер
      .then((answer) => {
        //console.log(answer)
        user.setUserInfo(answer); // записываем данные с сервера в разметку
        popupWithEditProfileForm.close();
        popupEditProfileSubmitButton.textContent = save; // убрать прелоадер
      })
      .catch((err) => console.error(err));
  }
);
popupWithEditProfileForm.setEventListeners(); //обвесить попап слушателями

// создание объекта класса PopupWithForm для формы редактирования аватара
const popupWithEditAvatarForm = new PopupWithForm(
  ".popup_edit-avatar",
  (inputValue) => {
    popupEditAvatarSubmitButton.textContent = saving; // отобразить прелоадер
    api.setAvatar(inputValue)
      .then((answer) => {
      user.setAvatar(answer.avatar);
      popupWithEditAvatarForm.close();
      popupEditAvatarSubmitButton.textContent = save; // убрать прелоадер
    })
    .catch((err) => console.error(err))
  }
);
popupWithEditAvatarForm.setEventListeners(); //обвесить попап слушателями

//создание объекта попапа подтверждения удаления карточки
const deletionCardPopup = new PopupWithConfirmation(
  ".popup_confirm-card-deletion",
  (id) => {
    popupDeleteCardSubmitButton.textContent = deletion; // отобразить прелоадер
    api
      .deleteCard(id)
      .then((answer) => {
        console.log(answer);
        api
          .getAllCards()
          .then((data) => {
            //console.log(data)
            renderAllCards(data);
            deletionCardPopup.close();
            popupDeleteCardSubmitButton.textContent = yes; // убрать прелоадер
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }
);
deletionCardPopup.setEventListeners(); //обвесить попап слушателями

/////////////////////////////// functions /////////////////////////////////////////

// функция создания экземпляра класса Card
function createCard(data) {
  // data - объект карточки из массива, полученного с сервера
  const card = new Card(
    {
      data,
      handleCardClick: () => {
        bigImage.open(data);
      },
      handleDeletionClick: () => {
        deletionCardPopup.open(data);
      },
      handleLikeClick: () => {
        if (!card.isLiked()) {
          //console.log(card)
          api.likeCard(card._cardId).then((updatedCard) => {
            card._likes = updatedCard.likes;
            card.fillLike();
            card.updateLikeCounter();
          });
        } else {
          //console.log(card)
          api.dislikeCard(card._cardId).then((updatedCard) => {
            card._likes = updatedCard.likes;
            card.fillLike();
            card.updateLikeCounter();
          });
        }
      },
    },
    ".template"
  );
  card.myUserId = user.myId;
  return card;
}

// функция отрисовки карточек на основе массива объектов data, полученного с сервера
function renderAllCards(data) {
  const cardsList = new Section(
    {
      renderer: (item) => {
        const cardObj = createCard(item);
        const cardView = cardObj.createCardElement();
        if (cardObj.myUserId !== cardObj.ownerId) {
          cardView
            .querySelector(".card__trash-button")
            .classList.add("card__trash-button_invisible");
        }
        cardsList.addItemAppend(cardView);
      },
    },
    ".cards__list"
  );
  cardsList.renderItems(data); // применяем метод renderer для каждого объекта массива карточек
}

////////////////////////////////////////////////////////////////////////////////////////////////

Promise.all([api.getProfileInfo(), api.getAllCards()]) // получить данные с сервера (данные о пользователе и все карточки)
  .then((result) => {
    //console.log(result);
    user.setUserInfo(result[0]);
    user.setAvatar(result[0].avatar);
    user.getMyId(result[0]);
    renderAllCards(result[1]);
  })
  .catch((err) => {
    console.error(err);
  });


editButton.addEventListener("click", () => {
  editProfileFormValidator.clearErrors();
  editProfileFormValidator.blockSubmitButton();
  popupWithEditProfileForm.fillInputs(user.getUserInfo());
  popupWithEditProfileForm.open();
});

addButton.addEventListener("click", () => {
  addCardForm.reset();
  addNewCardFormValidator.clearErrors();
  popupWithAddCardForm.open();
});

editAvatarButton.addEventListener("click", () => {
  editAvatarFormValidator.clearErrors();
  editAvatarFormValidator.blockSubmitButton();
  popupWithEditAvatarForm.open();
});
