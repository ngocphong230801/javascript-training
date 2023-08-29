// Import the BookModel class.
import BookModel from "../models/book.model";
import { validateForm } from "../helpers/validator";
// Import helper functions.
import { querySelector, getElementById, getQueryParameter } from "../helpers";
import { initializePage } from "../helpers/init-detail";
import { toggleDisplay } from "../helpers/element-untils";
import AlertManager from "../helpers/alert";
import { uploadImageAndSave } from "../helpers/upload-img";

// Class definition for the BookDetailPage.
class BookDetailPage {
    // Constructor for the BookDetailPage.
    constructor() {
        // Initialize the page using the 'initialize' method.
        initializePage(this.initialize.bind(this));
        // Initialize a variable to store updated book information.
        this.updatedBookInfo = null;
        this.formOpen = false;
    }

    // Initialization method for the page.
    initialize() {
        const urlParams = new URLSearchParams(window.location.search);
        const bookInfoString = urlParams.get("bookInfo");
    
        if (bookInfoString) {
            const bookInfo = JSON.parse(decodeURIComponent(bookInfoString));
            this.displayBookInfo(bookInfo);
            this.setupEditButton(bookInfo);
            this.setupCancelButton();
            this.setupSaveButton(bookInfo);
            this.setupImagePreview();
            this.setupDeleteButton(bookInfo);
        }
    }
    // Method to display book information on the detail page.
    displayBookInfo(bookInfo) {
        // Get elements by their IDs.
        const bookTitleElement = getElementById("book-title");
        const bookAuthorElement = getElementById("book-author");
        const bookDateElement = getElementById("book-date");
        const bookDescriptionElement = getElementById("book-description");
        const bookCreateElement = getElementById("book-create");
        const bookUpdateElement = getElementById("book-update");
        const bookImage = getElementById("img-detail-wp-render");

        // Set content for each element based on book information.
        bookTitleElement.textContent = bookInfo.bookname;
        bookAuthorElement.textContent = `Author: ${bookInfo.author}`;
        bookDateElement.textContent = `Published Date: ${bookInfo.date}`;
        bookDescriptionElement.textContent = bookInfo.description;
        bookCreateElement.textContent = `Create At: ${bookInfo.date}`;
        bookUpdateElement.textContent = `Update At: ${bookInfo.date}`;
        bookImage.innerHTML = `<img class="image-detail" src="${bookInfo.image}"/>`;
    }

    // Method to toggle overlay and form display.
    toggleOverlayAndForm(displayValue) {
        const validationForm = getElementById("validation-form");
        const overlay = getElementById("overlay");

        validationForm.style.display = displayValue;
        overlay.style.display = displayValue;
    }

    // Method to set up edit button functionality.
    setupEditButton(bookInfo) {
        const editButton = querySelector(".edit-detail");
    
        // Get input elements and other elements.
        const showFormAndOverlay = () => {
            const booknameInput = getElementById("bookname");
            const authorInput = getElementById("author");
            const dateInput = getElementById("date");
            const descriptionInput = getElementById("description");
            const previewLinkImage = getElementById("preview-link-image");
            this.formOpen = true;
    
            // Update input values based on updated book information or initial book information.
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

            // Display form and overlay.
            toggleDisplay("validation-form", true);
            toggleDisplay("overlay", true);
        };
        
        // Attach event listener to the edit button.
        editButton.addEventListener("click", showFormAndOverlay);
    }

    // Method to set up cancel button functionality.
    setupCancelButton() {
        const cancelButton = querySelector(".cancel");
        const overlay = getElementById("overlay");

        const hideFormAndOverlay = () => {
             // Hide form and overlay.
            toggleDisplay("validation-form", false);
            toggleDisplay("overlay", false);
        };

        cancelButton.addEventListener("click", hideFormAndOverlay);
        overlay.addEventListener("click", hideFormAndOverlay);
    }


    // Method to set up save button functionality.
    async setupSaveButton(bookInfo) {
        const saveButton = querySelector(".save");
        
        saveButton.addEventListener("click", async (event) => {
            event.preventDefault();
            const isValid = await validateForm(getElementById("validation-form"));
    
            if (!isValid) {
                return;
            }
    
            const updatedBookInfo = {
                bookname: getElementById("bookname").value,
                author: getElementById("author").value,
                date: getElementById("date").value,
                description: getElementById("description").value,
                image: bookInfo.image,
            };
    
            const inputSelectFile = document.querySelector("#input-select-file");
    
            if (inputSelectFile.files[0]) {
                const uploadedImageUrl = await uploadImageAndSave(inputSelectFile.files[0]);
    
                if (uploadedImageUrl) {
                    updatedBookInfo.image = uploadedImageUrl;
                    const previewLinkImage = getElementById("preview-link-image");
                    previewLinkImage.innerHTML = `<img src="${uploadedImageUrl}" alt="" class="preview-image-inner" />`;
                } else {
                    AlertManager.showImageUploadError();
                    return;
                }
            }
    
            const bookModel = new BookModel();
            await bookModel.updateBookByInfo(bookInfo.id, updatedBookInfo);
    
            this.displayBookInfo(updatedBookInfo);
    
            this.updatedBookInfo = updatedBookInfo;
            const bookInfoString = JSON.stringify(updatedBookInfo);
            const encodedBookInfo = encodeURIComponent(bookInfoString);
            const newUrl = `${window.location.href.split("?")[0]}?bookInfo=${encodedBookInfo}`;
            history.pushState({}, "", newUrl);
    
            toggleDisplay("validation-form", false);
            toggleDisplay("overlay", false);
        });
    }
    
    
    // Method to set up ImagePreview functionality.
    setupImagePreview() {
        const inputSelectFile = document.querySelector("#input-select-file");
        inputSelectFile.addEventListener("change", () => {
            // Update image preview based on selected file.
            const previewLinkImage = getElementById("preview-link-image");
            previewLinkImage.innerHTML = `<img src="${URL.createObjectURL(inputSelectFile.files[0])}" alt="" class="preview-image-inner" />`;
        });
    }

    // Method to set up delete button functionality.
    setupDeleteButton(bookInfo) {
        const deleteButton = querySelector(".delete-detail");

        deleteButton.addEventListener("click", async () => {
            await this.deleteBookFromDetailPage(bookInfo);
            window.location.href = "./index.html";
        });
    }

    async deleteBookFromDetailPage(bookInfo) {
        try {
            await this.deleteBookFromIndex(bookInfo.id);
        } catch (error) {
            AlertManager.showDeleteError();
        }
    }

    async deleteBookFromIndex(bookId) {
        try {
            const bookModel = new BookModel();
            await bookModel.deleteBookByInfo(bookId);
        } catch (error) {
            throw new Error("Error deleting book:", error);
        }
    }
}

// Create an instance of the BookDetailPage class.
const bookDetailPage = new BookDetailPage();
