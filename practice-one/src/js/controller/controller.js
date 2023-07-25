// controllers/bookController.js

import bookModel from '../model/model'
import bookView from '../view/view';

class BookController {
    constructor() {
        this.bookModel = bookModel;
        this.bookView = bookView;

        this.init();
    }

    init = () => {
        window.addEventListener('showValidationForm', this.handleShowValidationForm);
        window.addEventListener('hideValidationForm', this.handleHideValidationForm);

        this.renderBooks();
    };

    renderBooks = () => {
        const books = this.bookModel.getAllBooks();
        this.bookView.renderBookList(books);
    };

    handleShowValidationForm = () => {
        this.bookView.handleShowValidationForm();
    };

    handleHideValidationForm = () => {
        this.bookView.handleHideValidationForm();
    };
}

const bookController = new BookController();
export default bookController;
