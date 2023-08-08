import BookModel from "../models/model";
import { querySelector,getElementById,getQueryParameter } from "../helper";

const deleteBookFromIndex = (bookInfo) => {
  const bookModel = new BookModel();
  bookModel.deleteBookByInfo(bookInfo);
};

document.addEventListener("DOMContentLoaded", () => {
  const bookInfoString = getQueryParameter("bookInfo");

  if (bookInfoString) {
    try {
      const bookInfo = JSON.parse(decodeURIComponent(bookInfoString));

      const bookTitleElement = getElementById("book-title");
      const bookAuthorElement = getElementById("book-author");
      const bookDateElement = getElementById("book-date");
      const bookDescriptionElement = getElementById("book-description");
      const bookCreateElement = getElementById("book-create");
      const bookUpdateElement = getElementById("book-update");

      bookTitleElement.textContent = bookInfo.bookname;
      bookAuthorElement.textContent = `Author: ${bookInfo.author}`;
      bookDateElement.textContent = `Published Date: ${bookInfo.date}`;
      bookCreateElement.textContent = `Create At: ${bookInfo.date}`;
      bookUpdateElement.textContent = `Update At: ${bookInfo.date}`;
      bookDescriptionElement.textContent = bookInfo.description;

      const editButton = querySelector(".edit-detail");
      const cancelButton = querySelector(".cancel");
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

      cancelButton.addEventListener("click", () => {
        validationForm.style.display = "none";
        overlay.style.display = "none";
      });

      const saveButton = querySelector(".save");
      saveButton.addEventListener("click", () => {
        const updatedBookInfo = {
          bookname: getElementById("bookname").value,
          author: getElementById("author").value,
          date: getElementById("date").value,
          description: getElementById("description").value,
        };

        const bookModel = new BookModel();
        bookModel.updateBookByInfo(bookInfo.id, updatedBookInfo);


        bookTitleElement.textContent = updatedBookInfo.bookname;
        bookAuthorElement.textContent = `Author: ${updatedBookInfo.author}`;
        bookDateElement.textContent = `Published Date: ${updatedBookInfo.date}`;
        bookDescriptionElement.textContent = updatedBookInfo.description;

        validationForm.style.display = "none";
        overlay.style.display = "none";
      });

      const deleteButton = querySelector(".delete-detail");
      deleteButton.addEventListener("click", () => {
        deleteBookFromIndex(bookInfo.id);
        window.location.href = "./index.html";
      });
    } catch (error) {
      alert("Error parsing bookInfo:", error);
    }
  } else {
    alert("No bookInfo parameter found in the URL.");
  }
});
