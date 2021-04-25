 export default class FormValidator {
    constructor (validationSettings, formElement) {
        this._formSelector = validationSettings.formSelector
        this._inputSelector = validationSettings.inputSelector
        this._submitButtonSelector = validationSettings.submitButtonSelector
        this._inactiveButtonClass = validationSettings.inactiveButtonClass
        this._inputErrorClass = validationSettings.inputErrorClass
        this._errorClass = validationSettings.errorClass
        this._formElement = formElement
    }
    

    _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    }
    
    _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    }
    
    _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
    } else {
        this._hideInputError(inputElement);
    }
    }
    
    _allInputsEmpty () {
    return !this._inputList.some(inputElement => inputElement.value.length > 0);
    }

    _hasInvalidInput () {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
    }

    _toggleButtonState () {
    if (this._hasInvalidInput() || this._allInputsEmpty()) {
        // делаем кнопку неактивной
        this._buttonElement.classList.add(this._inactiveButtonClass);
        //buttonElement.setAttribute('disabled', true);
        this._buttonElement.disabled = true;
    } else {
        // делаем кнопку активной
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        //buttonElement.removeAttribute('disabled');
        this._buttonElement.disabled = false;
    }
    }

    _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
        });
    });
    // до первого изменения полей задаём кнопке корректное состояние
    this._toggleButtonState();
    }

    enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        });
        this._setEventListeners();
    }

    // функция очищения полей формы от ошибок
    clearErrors() {
    const errors = Array.from(this._formElement.querySelectorAll(`.${this._errorClass}`))
    errors.forEach(error => {
        error.textContent = '';
        error.classList.remove(this._errorClass)
    });
    this._inputList.forEach(input => {
        input.classList.remove(this._inputErrorClass);
    });
    }

    // функция, делающая кнопку сабмита неактивной
    blockSubmitButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    }


}