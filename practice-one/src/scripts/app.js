import BookController from "./controller/book.controller";
import BookView from "./views/book.view";
import BookModel from "./models/book.model";

export class App {
  startApp() {
    const bookModel = new BookModel();
    const bookView = new BookView();
    const bookController = new BookController(bookModel, bookView);

    bookController.init();
  }
}
