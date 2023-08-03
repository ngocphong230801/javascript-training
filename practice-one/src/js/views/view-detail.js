// detail.js

const getQueryParameter = (parameterName) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(parameterName);
};

const displayBookDetails = (bookInfo) => {
    const bookTitleElement = document.getElementById("book-title");
    const bookAuthorElement = document.getElementById("book-author");
    const bookDateElement = document.getElementById("book-date");
    const bookDescriptionElement = document.getElementById("book-description");

    bookTitleElement.textContent = bookInfo.bookname;
    bookAuthorElement.textContent = `Author: ${bookInfo.author}`;
    bookDateElement.textContent = `Date: ${bookInfo.date}`;
    bookDescriptionElement.textContent = bookInfo.description;

};

document.addEventListener("DOMContentLoaded", () => {

    const bookInfoString = getQueryParameter("bookInfo");

    if (bookInfoString) {
        try {
            const bookInfo = JSON.parse(decodeURIComponent(bookInfoString));
            displayBookDetails(bookInfo);
        } catch (error) {
            console.error("Error parsing bookInfo:", error);
        }
    } else {
        console.error("No bookInfo parameter found in the URL.");
    }
});
