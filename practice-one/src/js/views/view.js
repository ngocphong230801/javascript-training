// views/bookView.js
import { validateForm } from "../helper/validator";
import { getId } from "../helper/dom-helper";
import storage from "../services/localStorage";
import imgDelete from "../../assets/icon/delete.png";
import imgDetail from "../../assets/icon/detail.jpg";

class BookView {
    constructor() {
        this.bookListElement = getId("list-books");
        this.validationForm = getId("validation-form");
        this.overlay = getId("overlay");

        document.querySelector(".create").addEventListener("click", this.showValidationForm);
        document.querySelector(".cancel").addEventListener("click", this.hideValidationForm);
        document.querySelector(".save").addEventListener("click", this.handleSaveButtonClick);
        this.overlay.addEventListener("click", this.hideValidationForm.bind(this));

        this.init();
    }

    init = () => {
        this.hideValidationForm();
        this.loadSavedBooks();
    };

    showValidationForm = () => {
        this.setDisplay("block");
        this.clearErrorMessages();
        this.validationForm.reset();
    };

    hideValidationForm = () => {
        this.setDisplay("none");
    };

    handleSaveButtonClick = (event) => {
        event.preventDefault();
        if (validateForm(this.validationForm)) {
            this.saveDataToLocalStorage();
            this.hideValidationForm();
            this.validationForm.reset();
            this.loadSavedBooks();
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

    saveDataToLocalStorage = () => {
        const formInputs = this.validationForm.querySelectorAll(".form-input");
        const dataToSave = {};

        formInputs.forEach((input) => {
            const fieldName = input.getAttribute("name");
            const fieldValue = input.value;
            dataToSave[fieldName] = fieldValue;
        });

        let existingData;
        try {
            existingData = storage.get("savedBooks") || [];
        } catch (error) {
            console.error("Error while retrieving savedBooks from LocalStorage:", error);
            existingData = [];
        }

        existingData.push(dataToSave);

        try {
            storage.save("savedBooks", existingData);
        } catch (error) {
            console.error("Error while saving data to LocalStorage:", error);
        }
    };

    loadSavedBooks = () => {
        let savedBooks;
        try {
            savedBooks = storage.get("savedBooks");
        } catch (error) {
            console.error("Error while retrieving savedBooks from LocalStorage:", error);
            savedBooks = null;
        }

        if (savedBooks) {
            this.displayAllBooks(savedBooks);
        }
    };

    displayAllBooks = (books) => {
        let bookListHTMl = "";
        books.forEach((bookInfo) => {
            bookListHTMl += `
                <li class = "book">
                    <h3 class = "book-title">${bookInfo.bookname}</h3>
                    <p class = "book-author">${bookInfo.author}</p>
                    <p class = "book-date">${bookInfo.date}</p>
                    <p class = "book-description">${bookInfo.description}</p>
                    <img src="${imgDetail}" alt="delete" class="detail">
                    <img src="${imgDelete}" alt="delete" class="delete">
                </li>
            `;
        });

        this.bookListElement.innerHTML = bookListHTMl;
    };
}

export default BookView;
