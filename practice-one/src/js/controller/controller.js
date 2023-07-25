// controllers/bookController.js
class BookController {
    constructor(bookModel,bookView) {
        bookModel = bookModel;
        this.bookView = bookView;
        this.init();
    }

    init = () => {
        this.bookView.init();
    };
};

export default BookController;
