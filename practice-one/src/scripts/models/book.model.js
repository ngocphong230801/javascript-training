// Import the localStorage service.
import storage from '../services/localStorage';


const defaultBooks = [
  {
    id: "book-1",
    bookname: "HTML/CSS",
    author: "Phong Nguyen",
    date: "23/08/2023",
    description: "Books to help programmers better understand HTML/CSS",
    image: "https://i.ibb.co/1QtGN3P/book-3.jpg",
  },
]

// Class definition for the BookModel.
class BookModel {
  constructor() {
    this.init();
  }

  init = () => {
    const savedBooks = storage.get("savedBooks");
    if (savedBooks === null) {
      storage.save("savedBooks", defaultBooks);
    }
  };

  saveSampleBooks = () => {
    const savedBooks = storage.get("savedBooks");
    if (!savedBooks || savedBooks.length === 0) {
      storage.save("savedBooks", defaultBooks);
    }
  };

  removeAllBooks = () => {
    storage.remove("savedBooks"); // Remove the savedBooks entry entirely
  };
  
  // Method to retrieve saved books from localStorage.
  getSavedBooks = () => {
    try {
      const savedBooks = storage.get("savedBooks");
      if (savedBooks === null || savedBooks === undefined) {
        return defaultBooks;
      }
      return savedBooks || [];
    } catch (error) {
      console.error("Error while retrieving saved books:", error);
      return [];
    }
  };

  // Method to delete a book from saved books by index.
  deleteBook = (bookIndex) => {
    const savedBooks = storage.get("savedBooks");
    if (savedBooks && savedBooks[bookIndex]) {
      savedBooks.splice(bookIndex, 1);
      storage.save("savedBooks", savedBooks);
    }
  };

  // Method to set the current page in localStorage.
  setCurrentPage = (currentPage) => {
    storage.save("currentPage", currentPage);
  };

  // Method to get filtered books based on a search term.
  getFilteredBooks = (searchTerm) => {
    const savedBooks = storage.get("savedBooks");
    if (savedBooks) {
      const filteredBooks = savedBooks.filter((bookInfo) => {
        const bookname = bookInfo.bookname.toLowerCase();
        return bookname.includes(searchTerm.toLowerCase());
      });
      return filteredBooks;
    } else {
      return [];
    }
  };

  // Method to delete a book from saved books by book ID.
  deleteBookByInfo = (bookId) => {
    const savedBooks = storage.get("savedBooks");
    if (savedBooks) {
      const filteredBooks = savedBooks.filter((book) => book.id !== bookId);
      storage.save("savedBooks", filteredBooks);
    }
  };

  // Method to save a book ID to localStorage.
  saveBookId = (bookId) => {
    const bookIds = storage.get("bookIds") || [];
    if (!bookIds.includes(bookId)) {
        bookIds.push(bookId);
        storage.save("bookIds", bookIds);
    }
  };

  // Method to update a book's information by book ID.
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

  // Method to get a book from saved books by book ID.
  getBookById = (bookId) => {
    const savedBooks = storage.get("savedBooks");
    if (savedBooks) {
      return savedBooks.find((book) => book.id === bookId);
    } else {
      return null;
    }
  };
}

// Export the BookModel class as default.
export default BookModel;
