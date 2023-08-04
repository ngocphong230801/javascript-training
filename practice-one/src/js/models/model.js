// models/bookModel.js
import storage from '../services/localStorage';

class BookModel {
    getSavedBooks = () => {
        try {
            const savedBooks = storage.get("savedBooks");
            return savedBooks || [];
        } catch (error) {
            console.error("Error while retrieving saved books:", error);
            return [];
        }
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

    deleteBookByInfo = (bookInfo) => {
        const savedBooks = storage.get("savedBooks");
        if (savedBooks) {
          const bookIndex = savedBooks.findIndex(
            (book) =>
              book.bookname === bookInfo.bookname &&
              book.author === bookInfo.author &&
              book.date === bookInfo.date &&
              book.description === bookInfo.description
          );
    
          if (bookIndex !== -1) {
            savedBooks.splice(bookIndex, 1);
            storage.save("savedBooks", savedBooks);
          }
        }
      };

}

export default BookModel;
