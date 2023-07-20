// model.js
import storage from "../services/localStorage";

class BookModel {
    constructor() {
        const books = storage.get('books');
        this.books = books || [];
    }

    getAllBooks() {
        return this.books;
    }

    addBook(bookData) {
        this.books.push(bookData);
        storage.save('books', this.books);
    }

    removeBook(bookIndex) {
        this.books.splice(bookIndex, 1);
        storage.save('books', this.books);
    }
}

export default BookModel;
