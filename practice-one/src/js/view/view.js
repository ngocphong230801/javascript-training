// views/bookView.js

class BookView {
    constructor() {
        this.bookListElement = document.getElementById('book-list');
        this.validationForm = document.querySelector(".validation-form");
        this.overlay = document.getElementById("overlay");

        document.getElementById("create").addEventListener("click", this.handleShowValidationForm);
        document.getElementById("cancel").addEventListener("click", this.handleHideValidationForm);
        this.overlay.addEventListener("click", this.handleHideValidationForm);
    }

    renderBookList = (books) => {
        this.bookListElement.innerHTML = '';

        if (books && books.length > 0) {
            books.forEach((book) => {
                const listItem = document.createElement('li');
                listItem.textContent = book.name;
                this.bookListElement.appendChild(listItem);
            });
        } else {
            const noBookItem = document.createElement('li');
            noBookItem.textContent = 'No books found.';
            this.bookListElement.appendChild(noBookItem);
        }
    };

    handleShowValidationForm = () => {
        this.validationForm.style.display = "block";
        this.overlay.style.display = "block";
    };

    handleHideValidationForm = () => {
        this.validationForm.style.display = "none";
        this.overlay.style.display = "none";
    };
}

const bookView = new BookView();
export default bookView;
