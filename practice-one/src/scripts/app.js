// Import the required classes.
import BookController from "./controller/book.controller";
import BookView from "./views/book.view";
import BookModel from "./models/book.model";

// Define the App class.
export class App {
  // Method to start the application.
  startApp() {
    // Create instances of the BookModel, BookView, and BookController.
    const bookModel = new BookModel();
    const bookView = new BookView();
    const bookController = new BookController(bookModel, bookView);

    // Initialize the BookController.
    bookController.init();
  }
}
