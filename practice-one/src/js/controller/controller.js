// controllers/bookController.js
class BookController {
    constructor(bookModel, bookView) {
        this.bookModel = bookModel;
        this.bookView = bookView;
        this.init();
    }

    init = () => {
        this.bookView.init();
        this.loadSavedBooks();
    };

    loadSavedBooks = () => {
        const savedBooks = this.bookModel.getSavedBooks();
        this.bookView.displayAllBooks(savedBooks);
    };

    handleSaveButtonClick = (event) => {
        event.preventDefault();
        this.bookView.handleSaveButtonClick(event);
    };

    handleEditBook = (event) => {
        this.bookView.handleEditBook(event);
    };

    handleDeleteBook = (event) => {
        const bookIndex = event.target.dataset.bookIndex;
        this.bookModel.deleteBook(bookIndex);
        this.loadSavedBooks();
    };

    handlePaginationClick = (event) => {
        event.preventDefault();
        const currentPage = parseInt(event.target.dataset.page);
        this.bookModel.setCurrentPage(currentPage);
        this.loadSavedBooks();
    };

    handleSearch = () => {
        const searchTerm = this.bookView.getSearchTerm();
        const filteredBooks = this.bookModel.getFilteredBooks(searchTerm);
        this.bookView.displayFilteredBooks(filteredBooks);
    };
}

export default BookController;
