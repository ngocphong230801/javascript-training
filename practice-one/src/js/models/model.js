// models/bookModel.js
import storage from '../services/localStorage';

class BookModel {
    constructor() {
        this.localStorageKey = this.getBookFromLocalStorage() || []; 
    }

    getBookFromLocalStorage () {
        return storage.get('books');
    }

    saveBooksToLocalStorage(books) {
        storage.save('books', books)
    }

    saveBook(book) {
        const books = this.book;
        books.push(book);
        this.saveBooks(books);
    }

    getAllBooks() {
        return this.books;
    }
    
    saveBooks(books) {
        this.books.push(bookData);
        this.saveBooksToLocalStorage(this.books)
    }
}

export default BookModel;
