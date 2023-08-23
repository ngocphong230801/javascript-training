// Import the App class from the 'app' module.
import { App } from "./app";

// Wait for the DOM to be fully loaded before starting the app.
document.addEventListener('DOMContentLoaded', () => {
    // Create an instance of the App class.
    const myApp = new App();

    // Start the application using the 'startApp' method.
    myApp.startApp();
});
