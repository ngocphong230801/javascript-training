// controllers/bookController.js
class BookController {
    constructor(bookModel, bookView) {
        this.bookModel = bookModel;
        this.bookView = bookView;
        this.init();
    }

    init = () => {
        this.bookView.init();
        this.showBooks();
    };

    showBooks = async () => {
        try {
            const savedBooks = await this.bookModel.getSavedBooks();
            this.bookView.displayAllBooks(savedBooks);
        } catch (error) {
            console.error("Error while fetching saved books:", error);
        }
    };
    
    handleSaveButtonClick = async (event) => {
        event.preventDefault();
        await this.bookView.handleSaveButtonClick(event); 
    };
    
    handleEditBook = (event) => {
        this.bookView.handleEditBook(event);
    };
    
    handleDeleteBook = (event) => {
        const bookIndex = event.target.dataset.bookIndex;
        this.bookModel.deleteBook(bookIndex);
        this.showBooks();
    };
    
    handlePaginationClick = async (event) => {
        event.preventDefault();
        const currentPage = parseInt(event.target.dataset.page);
        this.bookModel.setCurrentPage(currentPage);
        await this.showBooks(); 
    };
    
    handleSearch = async () => {
        const searchTerm = this.bookView.getSearchTerm();
        const filteredBooks = await this.bookModel.getFilteredBooks(searchTerm);
        this.bookView.displayFilteredBooks(filteredBooks);
    };
}

export default BookController;
