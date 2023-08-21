// Class definition for the BookController.
class BookController {
    // Constructor for the BookController, takes instances of bookModel and bookView.
    constructor(bookModel, bookView) {
        this.bookModel = bookModel;
        this.bookView = bookView;

        // Initialize the controller.
        this.init();
    }

    // Initialization method, called when the controller is instantiated.
    init = () => {
        // Initialize the bookView.
        this.bookView.init();

        // Display all saved books.
        this.showBooks();
    };

    // Method to fetch saved books from the model and display them.
    showBooks = async () => {
        try {
            const savedBooks = await this.bookModel.getSavedBooks();
            this.bookView.displayAllBooks(savedBooks);
        } catch (error) {
            alert("Error while fetching saved books: " + error);
        }
    };

    // Method to handle save button click event.
    handleSaveButtonClick = async (event) => {
        event.preventDefault();
        await this.bookView.handleSaveButtonClick(event); 
    };

    // Method to handle edit book event.
    handleEditBook = (event) => {
        this.bookView.handleEditBook(event);
    };

    // Method to handle delete book event.
    handleDeleteBook = (event) => {
        const bookIndex = event.target.dataset.bookIndex;
        this.bookModel.deleteBook(bookIndex);
        this.showBooks();
    };

    // Method to handle pagination click event.
    handlePaginationClick = async (event) => {
        event.preventDefault();
        const currentPage = parseInt(event.target.dataset.page);
        this.bookModel.setCurrentPage(currentPage);
        await this.showBooks(); 
    };

    // Method to handle search event.
    handleSearch = async () => {
        const searchTerm = this.bookView.getSearchTerm();
        const filteredBooks = await this.bookModel.getFilteredBooks(searchTerm);
        this.bookView.displayFilteredBooks(filteredBooks);
    };
}

// Export the BookController class as default.
export default BookController;
