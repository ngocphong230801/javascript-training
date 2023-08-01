// models/bookModel.js
import storage from '../services/localStorage';

class BookModel {
    getSavedBooks = () => {
        const savedBooks = storage.get("savedBooks");
        return savedBooks || [];
    };

    deleteBook = (bookIndex) => {
        const savedBooks = storage.get("savedBooks");
        if (savedBooks && savedBooks[bookIndex]) {
            savedBooks.splice(bookIndex, 1);
            storage.save("savedBooks", savedBooks);
        }
    };

    setCurrentPage = (currentPage) => {
        storage.save("currentPage", currentPage);
    };

    getFilteredBooks = (searchTerm) => {
        const savedBooks = storage.get("savedBooks");
        if (savedBooks) {
            const filteredBooks = savedBooks.filter((bookInfo) => {
                const bookName = bookInfo.bookname.toLowerCase();
                return bookName.includes(searchTerm.toLowerCase());
            });
            return filteredBooks;
        } else {
            return [];
        }
    };
}

export default BookModel;
