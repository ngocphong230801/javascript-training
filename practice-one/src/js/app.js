import BookController from "./controller/controller";
import BookView from "./views/view";
import BookModel from "./models/model";


export class App {

    constructor() {}

    startApp() {
        const bookModel = new BookModel();
        const bookView = new BookView();
        const bookController = new BookController(bookModel,bookView)

        bookController.init();
    };
};
