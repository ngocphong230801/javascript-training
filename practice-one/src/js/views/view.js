// views/bookView.js
import { validateForm } from "../helper/validator";
import { getId } from "../helper/dom-helper";
import storage from "../services/localStorage";

class BookView {
    constructor() {
        this.bookListElement = getId('book-list');
        this.validationForm = getId("validation-form");
        this.overlay = getId("overlay");

        getId("create").addEventListener("click", this.showValidationForm);
        getId("cancel").addEventListener("click", this.hideValidationForm);
        getId("save").addEventListener("click", this.handleSaveButtonClick);
        this.overlay.addEventListener("click", this.hideValidationForm.bind(this));

        this.showDataFromLocalStorage(); // Display data from Local Storage
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
            this.saveDataToLocalStorage();
            this.hideValidationForm();
            this.validationForm.reset();
        }
    };

    saveDataToLocalStorage = () => {
        const formInputs = this.validationForm.querySelectorAll(".form-input");
        const dataToSave = {};

        formInputs.forEach((input) => {
            const fieldName = input.getAttribute("name");
            const fieldValue = input.value;
            dataToSave[fieldName] = fieldValue;
        });

        const existingData = storage.get("books") || []; // Get existing data or create a new empty array
        existingData.push(dataToSave); // Add new data to the array

        storage.save("books", existingData); // Save the new array to Local Storage
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


    showDataFromLocalStorage = () => {
        const formData = storage.get("formData");
        if (formData) {
            const formInputs = this.validationForm.querySelectorAll(".form-input");
            formInputs.forEach((input) => {
                const fieldName = input.getAttribute("name");
                if (formData[fieldName]) {
                    input.value = formData[fieldName];
                }
            });
        }
    };

    renderBookCard = (bookData) => {
        const bookCardTemplate = `
            <li class="book-card">
                <div class="book-info">
                    <h2 class="book-title">${bookData.bookname}</h2>
                    <p class="book-author">Author: ${bookData.author}</p>
                    <p class="book-description">${bookData.description}</p>
                </div>
                <img src="${bookData.image}" alt="${bookData.bookname}" class="book-image">
            </li>
        `;
        return bookCardTemplate;
    };

    renderBookList = (books) => {
        const bookListHTML = books.map((bookData) => this.renderBookCard(bookData)).join("");
        this.bookListElement.innerHTML = bookListHTML;
    };

}

export default BookView;
