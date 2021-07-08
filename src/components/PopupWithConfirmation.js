import Popup from "./Popup.js";
import { validationConfig } from "../utils/constants.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(validationConfig.formSelector);
  }

  open(data, event) {
    super.open();
    this._cardId = data._id;
    this._cardView = event.target.parentNode;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._cardId, this._cardView);
    });
  }
}
