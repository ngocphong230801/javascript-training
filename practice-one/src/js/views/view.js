import { validateForm } from "../helper/validator";

import { getId } from "../helper/dom-helper";

class BookView {
    constructor() {
        this.bookListElement = getId('book-list');
        this.validationForm = getId("validation-form");
        this.overlay = getId("overlay");

        getId("create").addEventListener("click", this.showValidationForm);
        getId("cancel").addEventListener("click", this.hideValidationForm);
        getId("save").addEventListener("click", this.handleSaveButtonClick)
        this.overlay.addEventListener("click", this.hideValidationForm.bind(this));

        this.init();
    }

    init = () => {
        this.hideValidationForm();
    };

    showValidationForm = () => {
        this.setDisplay('block');
        this.clearErrorMessages();
        this.validationForm.reset();
    };

    hideValidationForm = () => {
        this.setDisplay('none');
    };

    handleSaveButtonClick = (event) => {
        event.preventDefault();
        if (validateForm(this.validationForm)) {
            this.hideValidationForm();
            this.validationForm.reset();
        }
    };

    setDisplay = (displayValue) => {
        this.validationForm.style.display = displayValue;
        this.overlay.style.display = displayValue;
    };

    clearErrorMessages = () => {
        const errorElements = this.validationForm.querySelectorAll(".error");
        errorElements.forEach((errorElement) => {
            errorElement.textContent = "";
        });
    };
}

export default BookView;
