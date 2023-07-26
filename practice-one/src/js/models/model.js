// models/bookModel.js
import storage from '../services/localStorage';

class BookModel {
    constructor() {
        this.books = this.getBookFromLocalStorage() || [];
    }

    getBookFromLocalStorage() {
        return storage.get('books');
    }

    saveBooksToLocalStorage(books) {
        storage.save('books', books);
    }

    saveBook(book) {
        this.books.push(book);
        this.saveBooksToLocalStorage(this.books);
    }

    getAllBooks() {
        return this.books;
    }

    saveBooks(books) {
        this.books = books;
        this.saveBooksToLocalStorage(this.books);
    }
}

export default BookModel;
