import BookModel from "../models/book.model";
import { querySelector, getElementById, getQueryParameter } from "../helpers";
import { initializePage } from "../helpers/init-detail";
import { toggleDisplay } from "../helpers/element-untils";

class BookDetailPage {
    constructor() {
        initializePage(this.initialize.bind(this));
    }

    initialize(bookInfo) {
        this.displayBookInfo(bookInfo);
        this.setupEditButton(bookInfo);
        this.setupCancelButton();
        this.setupSaveButton(bookInfo);
        this.setupDeleteButton(bookInfo);
    }

    displayBookInfo(bookInfo) {
        const bookTitleElement = getElementById("book-title");
        const bookAuthorElement = getElementById("book-author");
        const bookDateElement = getElementById("book-date");
        const bookDescriptionElement = getElementById("book-description");
        const bookCreateElement = getElementById("book-create");
        const bookUpdateElement = getElementById("book-update");
        const bookImage = getElementById("img-detail-wp-render");

        bookTitleElement.textContent = bookInfo.bookname;
        bookAuthorElement.textContent = `Author: ${bookInfo.author}`;
        bookDateElement.textContent = `Published Date: ${bookInfo.date}`;
        bookDescriptionElement.textContent = bookInfo.description;
        bookCreateElement.textContent = `Create At: ${bookInfo.date}`;
        bookUpdateElement.textContent = `Update At: ${bookInfo.date}`;
        bookImage.innerHTML = `<img class="image-detail" src="${bookInfo.image}"/>`;
    }

    toggleOverlayAndForm(displayValue) {
        const validationForm = getElementById("validation-form");
        const overlay = getElementById("overlay");

        validationForm.style.display = displayValue;
        overlay.style.display = displayValue;
    }

    setupEditButton(bookInfo) {
        const editButton = querySelector(".edit-detail");

        const showFormAndOverlay = () => {
            getElementById("bookname").value = bookInfo.bookname;
            getElementById("author").value = bookInfo.author;
            getElementById("date").value = bookInfo.date;
            getElementById("description").value = bookInfo.description;
            getElementById("preview-link-image").innerText = bookInfo.image;

            toggleDisplay("validation-form", true);
            toggleDisplay("overlay", true);
        };

        editButton.addEventListener("click", showFormAndOverlay);
    }

    setupCancelButton() {
        const cancelButton = querySelector(".cancel");
        const overlay = getElementById("overlay");

        const hideFormAndOverlay = () => {
            toggleDisplay("validation-form", false);
            toggleDisplay("overlay", false);
        };

        cancelButton.addEventListener("click", hideFormAndOverlay);
        overlay.addEventListener("click", hideFormAndOverlay);
    }

    setupSaveButton(bookInfo) {
        const saveButton = querySelector(".save");

        saveButton.addEventListener("click", () => {
            const updatedBookInfo = {
                bookname: getElementById("bookname").value,
                author: getElementById("author").value,
                date: getElementById("date").value,
                description: getElementById("description").value,
            };

            const bookModel = new BookModel();
            bookModel.updateBookByInfo(bookInfo.id, updatedBookInfo);

            this.displayBookInfo(updatedBookInfo);

            toggleDisplay("validation-form", "none");
            toggleDisplay("overlay", "none");
        });
    }

    setupDeleteButton(bookInfo) {
        const deleteButton = querySelector(".delete-detail");

        deleteButton.addEventListener("click", () => {
            this.deleteBookFromIndex(bookInfo.id);
            window.location.href = "./index.html";
        });
    }

    deleteBookFromIndex(bookId) {
        const bookModel = new BookModel();
        bookModel.deleteBookByInfo(bookId);
    }
}

const bookDetailPage = new BookDetailPage();
