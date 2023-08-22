import { validateForm } from "../helpers/validator";
import { getElementById, querySelector } from "../helpers/dom-helper";
import storage from "../services/localStorage";
import imgDelete from "../../assets/icon/delete.png";
import imgDetail from "../../assets/icon/detail.jpg";
import imgClose from "../../assets/icon/close.png";

class BookView {
    constructor() {
        this.bookListElement = getElementById("list-books");
        this.validationForm = getElementById("validation-form");
        this.overlay = getElementById("overlay");
        this.confirmationBox = getElementById("confirmation-box");
        this.sortOrder = "ascending";
        this.isFirstBookCreated = false

        const InputImageUpload = document.querySelector("#input-select-file");
        const ElementPreview = document.querySelector("#preview-image");
        InputImageUpload.addEventListener("change", (e) => {
            if (e.target.files[0]) {
                ElementPreview.innerHTML = `  <img src="${URL.createObjectURL(e.target.files[0])}" alt="" class ="preview-image-inner" /> `;
            }
        });

        querySelector(".create").addEventListener("click",this.showValidationForm);
        querySelector(".cancel").addEventListener("click",this.hideValidationForm);
        querySelector(".save").addEventListener("click",this.handleSaveButtonClick);
        querySelector(".ascending").addEventListener("click",this.handleAscendingClick);
        querySelector(".descending").addEventListener("click",this.handleDescendingClick);
        this.overlay.addEventListener("click",this.hideValidationForm.bind(this));

        document.addEventListener("DOMContentLoaded", () => {
            this.init();
        });
    }

    init = () => {
        this.hideValidationForm();
        const savedBooks = storage.get("savedBooks") || [];

        if (!savedBooks || savedBooks.length === 0) {
            this.dataDefault();
            this.noBooksMessage();
        } else {
            this.showBooks();
            this.setupSearch();
            querySelector(".btn-confirm").addEventListener("click", this.handleConfirmDelete);
            querySelector(".btn-cancel").addEventListener("click", this.handleCancelDelete);
        }
    };

    noBooksMessage = () => {
        const noBooksMessage = getElementById("no-books-message");
        noBooksMessage.style.display = "block";
    };

    showValidationForm = () => {
        this.setDisplay("block");
        this.clearErrorMessages();
        this.validationForm.reset();
        delete this.validationForm.dataset.bookIndex;

        const ElementPreview = document.querySelector("#preview-image");
        ElementPreview.innerHTML = "";

        const InputImageUpload = document.querySelector("#input-select-file");
        InputImageUpload.value = "";
    };

    hideValidationForm = () => {
        this.setDisplay("none");
    };

    showMention = (action, message) => {
        const mentionContainer = getElementById("mention-container");
        const mentionClass =
            action === "created" ? "mention-success" : "mention-danger";
        mentionContainer.innerHTML = `
    <div class="mention ${mentionClass}">
    <h3 class="mention-title">Your actions executed successfully!</h3>
    <p class="mention-message">${message}</p>
    <img src="${imgClose}" alt="close" class="close-mention">
    </div>
    `;
        setTimeout(() => {
            mentionContainer.innerHTML = "";
        }, 2000);
    };

    handleSaveButtonClick = async (event) => {
        event.preventDefault();
        const isValid = validateForm(this.validationForm);
        
        if (!isValid) {
            return; 
        }
    
        const savedBooks = storage.get("savedBooks") || [];
    
        const formInputs = this.validationForm.querySelectorAll(".form-input");
        const updatedBookInfo = {};
    
        const InputImageUpload = document.querySelector("#input-select-file");
    
        const existingImage = this.validationForm.dataset.bookIndex
            ? savedBooks[this.validationForm.dataset.bookIndex]?.image
            : null;
    
        if (existingImage && !InputImageUpload.files[0]) {
            updatedBookInfo.image = existingImage;
        } else if (!InputImageUpload.files[0]) {
            alert("Please upload book image");
            return;
        } else {
            const API_KEY = "e5588d24c18bd98a9b9aa46ec2e1769a";
    
            async function UploadImageAndSave() {
                const formData = new FormData();
                formData.append("key", API_KEY);
                formData.append("image", InputImageUpload.files[0]);
    
                try {
                    const response = await fetch(
                        "https://api.imgbb.com/1/upload",
                        {
                            method: "POST",
                            body: formData,
                        }
                    );
    
                    const data = await response.json();
                    console.log(
                        "Image uploaded successfully:",
                        data?.data?.url
                    );
                    updatedBookInfo.image = data?.data?.url;
                } catch (error) {
                    console.error("Error uploading image:", error);
                }
            }
    
            await UploadImageAndSave();
        }
    
        formInputs.forEach((input) => {
            const fieldName = input.getAttribute("name");
            const fieldValue = input.value;
            updatedBookInfo[fieldName] = fieldValue;
        });
    
        const bookIndex = this.validationForm.dataset.bookIndex;
    
        if (bookIndex !== undefined && savedBooks[bookIndex]) {
            const existingBook = savedBooks[bookIndex];
            existingBook.image = updatedBookInfo.image;
            existingBook.bookname = updatedBookInfo.bookname;
            existingBook.author = updatedBookInfo.author;
            existingBook.date = updatedBookInfo.date;
            existingBook.description = updatedBookInfo.description;
            storage.save("savedBooks", savedBooks);
        } else {
            const newBook = {
                id: `book-${Date.now()}`,
                ...updatedBookInfo,
            };
            savedBooks.unshift(newBook);
            storage.save("savedBooks", savedBooks);
        }

        const searchInput = querySelector(".filter-input");
        searchInput.style.display = "block";

        const ascendingButton = querySelector(".ascending");
        ascendingButton.style.display = "block";

        const descendingButton = querySelector(".descending");
        descendingButton.style.display = "block";

        const paginationLinks = document.querySelectorAll(".page-navigation");
        paginationLinks.forEach((link) => {
            link.style.display = "none";
        });

        this.checkAndDisplayBooks(); 
        this.hideNoBooksMessage();
        this.hideValidationForm();
        this.validationForm.reset();
        this.showMention("created", "Book created successfully!");
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
    
            const itemsPerPage = 6;
            const totalPages = Math.ceil(savedBooks.length / itemsPerPage);
    
            this.generatePaginationLinks(totalPages);
        }
    };

    displayAllBooks = (books) => {
        const itemsPerPage = 6;
        const maxPages = 100;

        const currentPage = parseInt(storage.get("currentPage")) || 1;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const booksToShow = books.slice(startIndex, endIndex);

        let bookListHtml = "";
        booksToShow.forEach((bookInfo, index) => {
            const bookId = `book-${startIndex + index}`
            bookListHtml += `
        <li id="${bookId}" class="book" data-book-index="${startIndex + index}">
          <h3 class="book-title">${bookInfo.bookname}</h3>
          <p class="book-author">${bookInfo.author}</p>
          <p class="book-date">${bookInfo.date}</p>
          <div class="cus-wp-preview-and-nav">
          <div>
          <p class="book-description">${bookInfo.description}</p>
          <a href="../../detail.html" class="book-detail-link">
            <img src="${imgDetail}" alt="" class="detail" data-book-index="${startIndex + index}" />
          </a>
          <img src="${imgDelete}" alt="delete" class="delete" data-book-index="${ startIndex + index}">
          </div>
          <img src="${bookInfo.image}" alt="detail" class="render-image">
            </div>
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

        const bookDetailLinks = document.querySelectorAll(".book-detail-link");
        bookDetailLinks.forEach((link) => {
            link.addEventListener("click", this.handleBookDetailClick);
        });
    };

    handleBookDetailClick = (event) => {
        event.preventDefault();
        const bookIndex = event.target.dataset.bookIndex;
        const savedBooks = storage.get("savedBooks");

        if (savedBooks && savedBooks[bookIndex]) {
            const bookInfo = savedBooks[bookIndex];
            const bookInfoString = JSON.stringify(bookInfo);
            window.location.href = `../../detail.html?bookInfo=${encodeURIComponent(
                bookInfoString
            )}`;
        }
    };

    handleEditBook = (event) => {
        const bookIndex = event.currentTarget.dataset.bookIndex;
        this.validationForm.dataset.bookIndex = bookIndex;
        const savedBooks = storage.get("savedBooks");

        if (savedBooks && savedBooks[bookIndex]) {
            this.showBookOnForm(savedBooks[bookIndex]);
            const bookImage = savedBooks[bookIndex].image;

            if (bookImage) {
                const previewImage = document.querySelector("#preview-image");
                previewImage.innerHTML = `<img src="${bookImage}" alt="" class ="preview-image-inner" />`;
            } else {
                const previewImage = document.querySelector("#preview-image");
                previewImage.innerHTML = "";
            }
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
        event.preventDefault();
        const bookIndex = event.target.dataset.bookIndex;
        const savedBooks = storage.get("savedBooks");

        if (savedBooks && savedBooks[bookIndex]) {
            this.confirmationBox.style.display = "block";
            this.overlay.style.display = "block";
            this.confirmationBox.dataset.bookIndex = bookIndex;
        }
    };

    handleConfirmDelete = () => {
        const bookIndex = this.confirmationBox.dataset.bookIndex;
        const savedBooks = storage.get("savedBooks");

        if (savedBooks && savedBooks[bookIndex]) {
            savedBooks.splice(bookIndex, 1);
            storage.save("savedBooks", savedBooks);

            const currentPage = parseInt(storage.get("currentPage")) || 1;

            if ((bookIndex >= (currentPage - 1) * 6) && (bookIndex < currentPage * 6)) {
                if (currentPage > 1) {
                    storage.save("currentPage", currentPage - 1);
                }
            }

            this.checkAndDisplayBooks();
        }

        this.confirmationBox.style.display = "none";
        this.overlay.style.display = "none";
        this.showMention("deleted", "Book deleted successfully!");
    };

    handleCancelDelete = () => {
        this.hideValidationForm();
        this.confirmationBox.style.display = "none";
        this.overlay.style.display = "none";
    }

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

    handleAscendingClick = () => {
        this.sortOrder = "ascending";
        this.applySorting();
    };

    handleDescendingClick = () => {
        this.sortOrder = "descending";
        this.applySorting();
    };

    applySorting = () => {
        const savedBooks = storage.get("savedBooks");

        if (savedBooks) {
            const sortedBooks = savedBooks.slice().sort((a, b) => {
                const bookNameA = a.bookname.toLowerCase();
                const bookNameB = b.bookname.toLowerCase();
                return this.sortOrder === "ascending"
                    ? bookNameA.localeCompare(bookNameB)
                    : bookNameB.localeCompare(bookNameA);
            });

            this.displayAllBooks(sortedBooks);
        }
    };

    dataDefault = () => {
        const searchInput = querySelector(".filter-input");
        searchInput.style.display = "none";

        const ascendingButton = querySelector(".ascending");
        ascendingButton.style.display = "none";

        const descendingButton = querySelector(".descending");
        descendingButton.style.display = "none";

        const paginationLinks = document.querySelectorAll(".page-navigation");
        paginationLinks.forEach((link) => {
            link.style.display = "none";
        });

        this.showNoBooksMessage()
    };

    showNoBooksMessage = () => {
        const noBooksMessage = getElementById("no-books-message");
        noBooksMessage.style.display = "block";
    };

    hideNoBooksMessage = () => {
        const noBooksMessage = getElementById("no-books-message");
        noBooksMessage.style.display = "none";
    };

    generatePaginationLinks = (totalPages) => {
        const paginationContainer = getElementById("pagination-container");
        paginationContainer.innerHTML = "";
    
        if (totalPages > 1) { 
            for (let i = 1; i <= totalPages; i++) {
                const link = document.createElement("a");
                link.href = "#";
                link.className = "pagination";
                link.textContent = i;
                link.dataset.page = i;
                link.addEventListener("click", this.handlePaginationClick);
                paginationContainer.appendChild(link);
            }
        }
    };
    
    checkAndDisplayBooks = () => {
        const savedBooks = storage.get("savedBooks");
        if (!savedBooks || savedBooks.length === 0) {
            this.showNoBooksMessage();
            this.dataDefault();
            this.bookListElement.innerHTML = "";
        } else {
            this.showBooks();
        }
    };
}

export default BookView;
