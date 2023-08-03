import BookModel from "../models/model";
import { getElementById } from "./dom-helper";
const getQueryParameter = (parameterName) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameterName);
};


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

      const deleteButton = querySelector(".delete-detail");
      deleteButton.addEventListener("click", () => {
        deleteBookFromIndex(bookInfo);

        window.location.href = "./index.html";
      });
    } catch (error) {
      console.error("Error parsing bookInfo:", error);
    }
  } else {
  
    console.error("No bookInfo parameter found in the URL.");
  }
});
