// Import the required classes.
import ListController from "./controller/list.controller";
import ListView from "./views/list.view";
import ListModel from "./models/list.model"


// Define the App class.
export class App {
  // Method to start the application.
  startApp() {
    // Create instances of the BookModel, BookView, and BookController.
    const listModel = new ListModel();
    const listView = new ListView();
    const listController = new ListController(listModel,listView);

    // Initialize the BookController.
    listController.init();
  }
}
