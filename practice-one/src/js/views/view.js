// views/bookView.js

class BookView {
    constructor() {
        this.bookListElement = document.getElementById('book-list');
        this.validationForm = document.querySelector(".validation-form");
        this.overlay = document.getElementById("overlay");

        document.getElementById("create").addEventListener("click", this.handleShowValidationForm);
        document.getElementById("cancel").addEventListener("click", this.handleHideValidationForm);
        document.getElementById("save").addEventListener("submit", this)
        this.overlay.addEventListener("click", this.handleHideValidationForm.bind(this));
    }

    init = () => {
        this.validationForm.style.display = "none";
        this.overlay.style.display = "none";
    }

    handleShowValidationForm = () => {
        this.validationForm.style.display = "block";
        this.overlay.style.display = "block";
        // console.log('Show fomr');
    };

    handleHideValidationForm = () => {
        this.validationForm.style.display = "none";
        this.overlay.style.display = "none";
        // console.log('Hide form');
    };

}

const bookView = new BookView();

export default bookView;
