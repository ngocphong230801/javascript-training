// Define a class named AlertManager
class AlertManager {
    // Define a static method to show a simple alert message
    static showAlert(message) {
        alert(message);
    }

    // Define a static method to show an error alert for image upload
    static showImageUploadError() {
        this.showAlert("Error uploading image");
    }

    // Define a static method to show an error alert for book deletion
    static showDeleteError(error) {
        this.showAlert("Error deleting book: " + error);
    }

    // Define a static method to show an alert indicating that an image is required
    static showImageInputRequired() {
        this.showAlert("Please upload book image");
    }
}

// Export the AlertManager class as the default export of the module
export default AlertManager;
