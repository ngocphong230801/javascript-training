// controllers/bookController.js
class BookController {
    constructor(bookModel,bookView) {
        this.bookModel = bookModel;
        this.bookView = bookView;

        this.init();
    }

    init = () => {
        this.bookView.init();
    };
}

const bookController = new BookController();
export default bookController;
