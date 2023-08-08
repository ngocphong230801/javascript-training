import BookModel from "../models/book.model";
import { querySelector, getElementById, getQueryParameter } from "../helpers";

class BookDetailPage {
  constructor() {
    this.initialize();
  }

  initialize() {
    document.addEventListener("DOMContentLoaded", () => {
      const bookInfoString = getQueryParameter("bookInfo");

      if (bookInfoString) {
        try {
          const bookInfo = JSON.parse(decodeURIComponent(bookInfoString));
          this.displayBookInfo(bookInfo);
          this.setupEditButton(bookInfo);
          this.setupCancelButton();
          this.setupSaveButton(bookInfo);
          this.setupDeleteButton(bookInfo);
        } catch (error) {
          alert("Error parsing bookInfo:", error);
        }
      } else {
        alert("No bookInfo parameter found in the URL.");
      }
    });
  }

  displayBookInfo(bookInfo) {
    const bookTitleElement = getElementById("book-title");
    const bookAuthorElement = getElementById("book-author");
    const bookDateElement = getElementById("book-date");
    const bookDescriptionElement = getElementById("book-description");
    const bookCreateElement = getElementById("book-create");
    const bookUpdateElement = getElementById("book-update");

    bookTitleElement.textContent = bookInfo.bookname;
    bookAuthorElement.textContent = `Author: ${bookInfo.author}`;
    bookDateElement.textContent = `Published Date: ${bookInfo.date}`;
    bookDescriptionElement.textContent = bookInfo.description;
    bookCreateElement.textContent = `Create At: ${bookInfo.date}`;
    bookUpdateElement.textContent = `Update At: ${bookInfo.date}`;
  }

  setupEditButton(bookInfo) {
    const editButton = querySelector(".edit-detail");
    const validationForm = getElementById("validation-form");
    const overlay = getElementById("overlay");

    editButton.addEventListener("click", () => {
      getElementById("bookname").value = bookInfo.bookname;
      getElementById("author").value = bookInfo.author;
      getElementById("date").value = bookInfo.date;
      getElementById("description").value = bookInfo.description;
      validationForm.style.display = "block";
      overlay.style.display = "block";
    });
  }

  setupCancelButton() {
    const cancelButton = querySelector(".cancel");
    const validationForm = getElementById("validation-form");
    const overlay = getElementById("overlay");

    cancelButton.addEventListener("click", () => {
      validationForm.style.display = "none";
      overlay.style.display = "none";
    });
  }

  setupSaveButton(bookInfo) {
    const saveButton = querySelector(".save");
    const validationForm = getElementById("validation-form");
    const overlay = getElementById("overlay");

    saveButton.addEventListener("click", () => {
      const updatedBookInfo = {
        bookname: getElementById("bookname").value,
        author: getElementById("author").value,
        date: getElementById("date").value,
        description: getElementById("description").value,
      };

      const bookModel = new BookModel();
      bookModel.updateBookByInfo(bookInfo.id, updatedBookInfo);

      this.displayBookInfo(updatedBookInfo);

      validationForm.style.display = "none";
      overlay.style.display = "none";
    });
  }

  setupDeleteButton(bookInfo) {
    const deleteButton = querySelector(".delete-detail");

    deleteButton.addEventListener("click", () => {
      this.deleteBookFromIndex(bookInfo.id);
      window.location.href = "./index.html";
    });
  }

  deleteBookFromIndex(bookId) {
    const bookModel = new BookModel();
    bookModel.deleteBookByInfo(bookId);
  }
}

const bookDetailPage = new BookDetailPage();
