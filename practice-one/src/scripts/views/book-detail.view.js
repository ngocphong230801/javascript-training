import BookModel from "../models/book.model";
import { querySelector, getElementById, getQueryParameter } from "../helpers";
import { initializePage } from "../helpers/init-detail";
import { toggleDisplay } from "../helpers/element-untils";

class BookDetailPage {
    constructor() {
        initializePage(this.initialize.bind(this));
        this.updatedBookInfo = null;
    }

    initialize(bookInfo) {
        this.displayBookInfo(bookInfo);
        this.setupEditButton(bookInfo);
        this.setupCancelButton();
        this.setupEditButton(bookInfo);
        this.setupSaveButton(bookInfo);
        this.setupImagePreview();
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
            const booknameInput = getElementById("bookname");
            const authorInput = getElementById("author");
            const dateInput = getElementById("date");
            const descriptionInput = getElementById("description");
            const previewLinkImage = getElementById("preview-link-image");
    
            if (this.updatedBookInfo) {
                booknameInput.value = this.updatedBookInfo.bookname;
                authorInput.value = this.updatedBookInfo.author;
                dateInput.value = this.updatedBookInfo.date;
                descriptionInput.value = this.updatedBookInfo.description;
                if (this.updatedBookInfo.image) {
                    previewLinkImage.innerHTML = `<img src="${this.updatedBookInfo.image}" alt="" class="preview-image-inner" />`;
                } else {
                    previewLinkImage.innerHTML = "";
                }
            } else {

                booknameInput.value = bookInfo.bookname;
                authorInput.value = bookInfo.author;
                dateInput.value = bookInfo.date;
                descriptionInput.value = bookInfo.description;
                if (bookInfo.image) {
                    previewLinkImage.innerHTML = `<img src="${bookInfo.image}" alt="" class="preview-image-inner" />`;
                } else {
                    previewLinkImage.innerHTML = "";
                }
            }
    
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

        saveButton.addEventListener("click", async () => {
            const updatedBookInfo = {
                bookname: getElementById("bookname").value,
                author: getElementById("author").value,
                date: getElementById("date").value,
                description: getElementById("description").value,
                image: bookInfo.image,
            };

            const inputSelectFile = document.querySelector("#input-select-file");

            if (inputSelectFile.files[0]) {
                const formData = new FormData();
                formData.append("key", "82001a9d3dcf15421a28667e049d69fd");
                formData.append("image", inputSelectFile.files[0]);

                try {
                    const response = await fetch("https://api.imgbb.com/1/upload", {
                        method: "POST",
                        body: formData,
                    });

                    const data = await response.json();
                    updatedBookInfo.image = data.data.url;

                    const previewLinkImage = getElementById("preview-link-image");
                    previewLinkImage.innerHTML = `<img src="${data.data.url}" alt="" class="preview-image-inner" />`;
                } catch (error) {
                    console.error("Error uploading image:", error);
                }
            }

            const bookModel = new BookModel();
            bookModel.updateBookByInfo(bookInfo.id, updatedBookInfo);

            this.displayBookInfo(updatedBookInfo);

            toggleDisplay("validation-form", false);
            toggleDisplay("overlay", false);
            this.updatedBookInfo = updatedBookInfo;
        });
    }

    setupImagePreview() {
        const inputSelectFile = document.querySelector("#input-select-file");
        inputSelectFile.addEventListener("change", () => {
            const previewLinkImage = getElementById("preview-link-image");
            previewLinkImage.innerHTML = `<img src="${URL.createObjectURL(inputSelectFile.files[0])}" alt="" class="preview-image-inner" />`;
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
