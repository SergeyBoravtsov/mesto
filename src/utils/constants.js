const myToken = "7df66c64-16f3-4e8e-82cb-5680579d3632";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//объект конфигурации валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// находим кнопки
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__edit-avatar");
const closePopupButtons = document.querySelectorAll(".popup__close");

// находим попапы
const popupEditAvatar = document.querySelector(".popup_edit-avatar");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-card");
const popupDeleteCard = document.querySelector(".popup_confirm-card-deletion");

const popupBigImage = document.querySelector(".popup_big-image");
const popupImage = popupBigImage.querySelector(".popup__image");
const popupCaption = popupBigImage.querySelector(".popup__caption");

// попап редактирования профиля
const nameInput = document.querySelector("#username");
const jobInput = document.querySelector("#userjob");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const editProfileForm = document.querySelector("#edit-profile-form");

// попап добавления информации о месте
const placeNameInput = document.querySelector("#placename");
const imageLinkInput = document.querySelector("#imagelink");
const cardTitle = document.querySelector(".card__title");
const addCardForm = document.querySelector("#add-card-form");

const cardsContainer = document.querySelector(".cards__list");
const templateElement = document.querySelector(".template");

// найдём все попапы
const allPopups = document.querySelectorAll(".popup");

const editAvatarForm = document.querySelector("#edit-avatar-form");
const avatar = document.querySelector(".profile__avatar");

const saving = "Сохранение...";
const deletion = "Удаление...";
const save = "Сохранить";
const create = "Создать";
const yes = "Да";

const popupAddCardSubmitButton = popupAddCard.querySelector(".popup__button");
const popupEditProfileSubmitButton =
  popupEditProfile.querySelector(".popup__button");
const popupEditAvatarSubmitButton =
  popupEditAvatar.querySelector(".popup__button");
const popupDeleteCardSubmitButton =
  popupDeleteCard.querySelector(".popup__button");

export {
  initialCards,
  validationConfig,
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
  allPopups,
  editAvatarButton,
  avatar,
  editAvatarForm,
  myToken,
  saving,
  deletion,
  save,
  create,
  yes,
  popupAddCardSubmitButton,
  popupEditProfileSubmitButton,
  popupEditAvatarSubmitButton,
  popupDeleteCardSubmitButton,
};
