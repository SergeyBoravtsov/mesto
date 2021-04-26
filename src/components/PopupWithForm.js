import Popup from "./Popup.js";
import { config } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(config.formSelector);
  }

  _getInputValues() {
    this._inputValues = {};
    this._form.querySelectorAll(config.inputSelector).forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  fillInputs(data) {
    this._form.querySelectorAll(config.inputSelector)
        .forEach(input => {
            if (data.hasOwnProperty(input.name))  
            input.value = data[input.name];
        }) 
  }

  close() {
    super.close();
    this._form.reset();
  }
}
