// models/bookModel.js

class BookModel {
    constructor() {
        this.localStorageKey = 'books'; 
    }

    saveBook(book) {
        const books = this.getAllBooks();
        books.push(book);
        this.saveBooks(books);
    }

    getAllBooks() {
        const booksString = localStorage.getItem(this.localStorageKey);
        if (booksString) {
            return JSON.parse(booksString);
        }
        return [];
    }

    saveBooks(books) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(books));
    }
}

const bookModel = new BookModel();
export default bookModel;
