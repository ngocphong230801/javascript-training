import { validateForm } from "../helper/validator";
import { getElementById, querySelector } from "../helper/dom-helper";
import storage from "../services/localStorage";
import imgDelete from "../../assets/icon/delete.png";
import imgDetail from "../../assets/icon/detail.jpg";

class BookView {
  constructor() {
    this.bookListElement = getElementById("list-books");
    this.validationForm = getElementById("validation-form");
    this.overlay = getElementById("overlay");

    querySelector(".create").addEventListener("click", this.showValidationForm);
    querySelector(".cancel").addEventListener("click", this.hideValidationForm);
    querySelector(".save").addEventListener("click", this.handleSaveButtonClick);
    this.overlay.addEventListener("click", this.hideValidationForm.bind(this));

    this.init();
  }

  init = () => {
    this.hideValidationForm();
    this.showBooks();
    this.setupSearch();
  };

  showValidationForm = () => {
    this.setDisplay("block");
    this.clearErrorMessages();
    this.validationForm.reset();
    delete this.validationForm.dataset.bookIndex;
  };

  hideValidationForm = () => {
    this.setDisplay("none");
  };

  handleSaveButtonClick = (event) => {
    event.preventDefault();
    if (validateForm(this.validationForm)) {
      const formInputs = this.validationForm.querySelectorAll(".form-input");
      const updatedBookInfo = {};

      formInputs.forEach((input) => {
        const fieldName = input.getAttribute("name");
        const fieldValue = input.value;
        updatedBookInfo[fieldName] = fieldValue;
      });

      const bookIndex = this.validationForm.dataset.bookIndex;
      const savedBooks = storage.get("savedBooks");

      if (bookIndex !== undefined && savedBooks && savedBooks[bookIndex]) {
        savedBooks[bookIndex] = {
          ...savedBooks[bookIndex],
          ...updatedBookInfo,
        };
        storage.save("savedBooks", savedBooks);
      } else {
        const existingData = savedBooks || [];
        existingData.push(updatedBookInfo);
        storage.save("savedBooks", existingData);
      }

      this.hideValidationForm();
      this.validationForm.reset();
      this.showBooks();
    }
  };

  setDisplay = (displayValue) => {
    this.validationForm.style.display = displayValue;
    this.overlay.style.display = displayValue;
  };

  clearErrorMessages = () => {
    const errorElements = this.validationForm.querySelectorAll(".error");
    errorElements.forEach((errorElement) => {
      errorElement.textContent = "";
    });
  };

  showBooks = () => {
    const savedBooks = storage.get("savedBooks");
    if (savedBooks) {
      this.displayAllBooks(savedBooks);
    }
  };

  displayAllBooks = (books) => {
    const itemsPerPage = 6;
    const maxPages = 3;

    const currentPage = parseInt(storage.get("currentPage")) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const booksToShow = books.slice(startIndex, endIndex);

    let bookListHtml = "";
    booksToShow.forEach((bookInfo, index) => {
      bookListHtml += `
        <li class="book" data-book-index="${startIndex + index}">
          <h3 class="book-title">${bookInfo.bookname}</h3>
          <p class="book-author">${bookInfo.author}</p>
          <p class="book-date">${bookInfo.date}</p>
          <p class="book-description">${bookInfo.description}</p>
          <img src="${imgDetail}" alt="detail" class="detail">
          <img src="${imgDelete}" alt="delete" class="delete" data-book-index="${
        startIndex + index
      }">
        </li>
      `;
    });

    this.bookListElement.innerHTML = bookListHtml;

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", this.handleDeleteBook);
    });

    const bookElements = document.querySelectorAll(".book");
    bookElements.forEach((bookElement) => {
      bookElement.addEventListener("dblclick", this.handleEditBook);
    });

    const paginationLinks = document.querySelectorAll(".pagination");
    paginationLinks.forEach((link, index) => {
      link.style.display = index < maxPages ? "block" : "none";
      link.dataset.page = index + 1;
      link.addEventListener("click", this.handlePaginationClick);
    });
  };

  handleEditBook = (event) => {
    const bookIndex = event.currentTarget.dataset.bookIndex;
    this.validationForm.dataset.bookIndex = bookIndex;
    const savedBooks = storage.get("savedBooks");

    if (savedBooks && savedBooks[bookIndex]) {
      this.showBookOnForm(savedBooks[bookIndex]);
    }
  };

  showBookOnForm = (bookInfo) => {
    this.setDisplay("block");
    this.clearErrorMessages();

    const formInputs = this.validationForm.querySelectorAll(".form-input");
    formInputs.forEach((input) => {
      const fieldName = input.getAttribute("name");
      if (bookInfo[fieldName] !== undefined) {
        input.value = bookInfo[fieldName];
      }
    });
  };

  handleDeleteBook = (event) => {
    const bookIndex = event.target.dataset.bookIndex;
    const savedBooks = storage.get("savedBooks");

    if (savedBooks && savedBooks[bookIndex]) {
      savedBooks.splice(bookIndex, 1);
      storage.save("savedBooks", savedBooks);
      this.showBooks();
    }
  };

  handlePaginationClick = (event) => {
    event.preventDefault();
    const currentPage = parseInt(event.target.dataset.page);
    storage.save("currentPage", currentPage);
    this.showBooks();
  };

  setupSearch = () => {
    const searchInput = getElementById("filter");
    searchInput.addEventListener("input", this.handleSearch);
  };

  handleSearch = () => {
    const searchTerm = getElementById("filter").value.toLowerCase();

    const savedBooks = storage.get("savedBooks");
    if (savedBooks) {
      const filteredBooks = savedBooks.filter((bookInfo) => {
        const bookName = bookInfo.bookname.toLowerCase();
        return bookName.includes(searchTerm);
      });

      if (filteredBooks.length === 0) {
        this.displayNoResultsMessage();
        this.hidePagination();
      } else {
        this.displayAllBooks(filteredBooks);
      }
    } else {
      this.displayNoResultsMessage();
      this.hidePagination();
    }
  };

  displayNoResultsMessage = () => {
    const html = `
      <div class="no-results-message">
        <h2 class="custom-heading">Oops! Nothing matches with your keyword!</h2>
        <p class="custom-paragraph">You can search with other keywords or add another new book.</p>
      </div>
    `;

    this.bookListElement.innerHTML = html;
  };

  hidePagination = () => {
    const paginationLinks = document.querySelectorAll(".pagination");
    paginationLinks.forEach((link) => {
      link.style.display = "none";
    });
  };
}

export default BookView;
