// controller.js
import BookModel from '../model/model.js';
import BookView from '../view/user-view.js';

class BookController {
    constructor() {
        this.model = new BookModel();
        this.view = new BookView(this);

        this.view.initForm(); // Initialize the form display

        this.view.bindCreateButton(this.showValidationForm);
        this.view.bindCancelButton(this.hideValidationForm);
        this.view.bindSaveButton(this.handleFormSubmit);

        this.view.renderBookList(this.model.getAllBooks());
    }

    addNewBook = (bookData) => {
        this.model.addBook(bookData);
        this.view.renderBookList(this.model.getAllBooks());
    };

    removeBook = (bookIndex) => {
        this.model.removeBook(bookIndex);
        this.view.renderBookList(this.model.getAllBooks());
    };

    showValidationForm = () => {
        this.view.showValidationForm();
    };

    hideValidationForm = () => {
        this.view.hideValidationForm();
    };

    handleFormSubmit = (bookData) => {
        // Handle form submission, validation, and add new book
        // You can implement form validation logic here and call addNewBook if the data is valid
        // Example:
        if (this.validateForm(bookData)) {
            this.addNewBook(bookData);
            this.view.resetForm(); // Clear the form fields after adding the book
            this.view.hideValidationForm(); // Hide the form after submission
        }
    };

    validateForm = (bookData) => {
        // Implement form validation logic here and return true if the data is valid, otherwise false
        // Example: Check if required fields (bookname, author, date) are not empty
        if (!bookData.bookname || !bookData.author || !bookData.date) {
            return false;
        }
        return true;
    };

    viewDetail = (bookIndex) => {
        // Redirect to the detail page and pass book information in the URL or via session/local storage
        // Implement the detail view based on your application requirements
    };
}

export default BookController;