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

  deleteBookByInfo = (bookId) => {
    const savedBooks = storage.get("savedBooks");
    if (savedBooks) {
      const filteredBooks = savedBooks.filter((book) => book.id !== bookId);
      storage.save("savedBooks", filteredBooks);
    }
  };

  saveBookId = (bookId) => {
    const bookIds = storage.get("bookIds") || [];
    if (!bookIds.includes(bookId)) {
        bookIds.push(bookId);
        storage.save("bookIds", bookIds);
    }
  };
  updateBookByInfo = (bookId, updatedBookInfo) => {
    const savedBooks = storage.get("savedBooks");
    if (savedBooks) {
      const bookIndex = savedBooks.findIndex((book) => book.id === bookId);
      if (bookIndex !== -1) {
        savedBooks[bookIndex] = { ...savedBooks[bookIndex], ...updatedBookInfo };
        storage.save("savedBooks", savedBooks);
      }
    }
  };

  getBookById = (bookId) => {
    const savedBooks = storage.get("savedBooks");
    if (savedBooks) {
      return savedBooks.find((book) => book.id === bookId);
    } else {
      return null;
    }
  };
}

export default BookModel;
