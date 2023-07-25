// views/bookView.js
import { validateForm } from "../helper/validator";
class BookView {
    constructor() {
        this.bookListElement = document.getElementById('book-list');
        this.validationForm = document.querySelector(".validation-form");
        this.overlay = document.getElementById("overlay");

        document.getElementById("create").addEventListener("click", this.handleShowValidationForm);
        document.getElementById("cancel").addEventListener("click", this.handleHideValidationForm);
        document.getElementById("save").addEventListener("click", this.handleSaveButtonClick)
        this.overlay.addEventListener("click", this.handleHideValidationForm.bind(this));
    }

    init = () => {
        this.validationForm.style.display = "none";
        this.overlay.style.display = "none";
        console.log(validateForm);
    }

    handleShowValidationForm = () => {
        this.validationForm.style.display = "block";
        this.overlay.style.display = "block";
        this.clearErrorMessages();
        this.validationForm.reset();
    };

    handleHideValidationForm = () => {
        this.validationForm.style.display = "none";
        this.overlay.style.display = "none";
    };

    handleSaveButtonClick = (event) => {
        event.preventDefault();
        if (validateForm(this.validationForm)) {
            this.validationForm.style.display = "none";
            this.overlay.style.display = "none";
            this.validationForm.reset();
        }
    }

    clearErrorMessages = () => {
        const errorElements = this.validationForm.querySelectorAll(".error");
        errorElements.forEach((errorElement) => {
            errorElement.textContent = "";
        });
    };
}


export default BookView;
