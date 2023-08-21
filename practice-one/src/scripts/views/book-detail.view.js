// Import the BookModel class.
import BookModel from "../models/book.model";
import { validateForm } from "../helpers/validator";
// Import helper functions.
import { querySelector, getElementById, getQueryParameter } from "../helpers";
import { initializePage } from "../helpers/init-detail";
import { toggleDisplay } from "../helpers/element-untils";

// Class definition for the BookDetailPage.
class BookDetailPage {
    // Constructor for the BookDetailPage.
    constructor() {
        // Initialize the page using the 'initialize' method.
        initializePage(this.initialize.bind(this));
        // Initialize a variable to store updated book information.
        this.updatedBookInfo = null;
    }

    // Initialization method for the page.
    initialize(bookInfo) {
        // Initialize and set up various components of the detail page.
        this.displayBookInfo(bookInfo);
        this.setupEditButton(bookInfo);
        this.setupCancelButton();
        this.setupEditButton(bookInfo);
        this.setupSaveButton(bookInfo);
        this.setupImagePreview();
        this.setupDeleteButton(bookInfo);
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

        // Attach event listeners to cancel button and overlay.
        cancelButton.addEventListener("click", hideFormAndOverlay);
        overlay.addEventListener("click", hideFormAndOverlay);
    }

    // Method to set up save button functionality.
    setupSaveButton(bookInfo) {
        const saveButton = querySelector(".save");

        saveButton.addEventListener("click", async () => {
            const isValid = validateForm(getElementById("validation-form"));
        
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
    // Method to set up image preview functionality.
    setupImagePreview() {
        const inputSelectFile = document.querySelector("#input-select-file");
        inputSelectFile.addEventListener("change", () => {
            // Update image preview based on selected file.
        });
    }

    // Method to set up delete button functionality.
    setupDeleteButton(bookInfo) {
        const deleteButton = querySelector(".delete-detail");

        deleteButton.addEventListener("click", async () => {
            // Delete book from the detail page.
            // Redirect to the index page.
        });
    }

    // Method to delete a book from the detail page.
    async deleteBookFromDetailPage(bookInfo) {
        try {
            // Delete book from the index.
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    }

    // Method to delete a book from the index.
    async deleteBookFromIndex(bookId) {
        try {
            // Create a new BookModel instance and delete the book by ID.
        } catch (error) {
            throw new Error("Error deleting book:", error);
        }
    }
}

// Create an instance of the BookDetailPage class.
const bookDetailPage = new BookDetailPage();
