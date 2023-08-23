// Class definition for the LocalStorage utility.
class LocalStorage {
    // Constructor for the LocalStorage class.
    constructor() {}

    // Method to save data to localStorage.
    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Method to retrieve data from localStorage.
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}

// Create an instance of the LocalStorage class.
const storage = new LocalStorage();

// Export the storage instance as the default export.
export default storage;
