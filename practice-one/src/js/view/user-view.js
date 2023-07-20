class BookView {
    constructor(controller) {
        this.controller = controller;
        this.validationForm = document.getElementById('validation-form');
        this.filterInput = document.getElementById('filter');
        this.createButton = document.getElementById('create');
        this.listBook = document.querySelector('.list-book');

        // Bind event handlers for form
        this.validationForm.addEventListener('submit', this.handleFormSubmit);
        const cancelButton = this.validationForm.querySelector('.cancel');
        cancelButton.addEventListener('click', this.handleCancel);
        const saveButton = this.validationForm.querySelector('.save');
        saveButton.addEventListener('click', this.handleSave);

        // Bind event handler for filter input
        this.filterInput.addEventListener('input', this.handleFilterInput);

        // Bind event handler for create button
        this.createButton.addEventListener('click', this.controller.showValidationForm);
    }

    renderBookList = (books) => {
        this.listBook.innerHTML = '';
        books.forEach((book, index) => {
            const bookItem = document.createElement('li');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
          <h3>${book.bookname}</h3>
          <p>Author: ${book.author}</p>
          <p>Published date: ${book.date}</p>
          <img src="${book.image}" alt="Book cover">
          <p>Description: ${book.description}</p>
          <button class="remove" data-index="${index}">Remove</button>
          <button class="detail" data-index="${index}">Detail</button>
        `;
            this.listBook.appendChild(bookItem);
        });

        // Bind event handlers for remove and detail buttons
        const removeButtons = this.listBook.querySelectorAll('.remove');
        removeButtons.forEach((button) => {
            button.addEventListener('click', this.handleRemove);
        });

        const detailButtons = this.listBook.querySelectorAll('.detail');
        detailButtons.forEach((button) => {
            button.addEventListener('click', this.handleDetail);
        });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();

        const bookData = {
            bookname: this.validationForm.querySelector('#bookname').value,
            author: this.validationForm.querySelector('#author').value,
            date: this.validationForm.querySelector('#date').value,
            image: this.validationForm.querySelector('#image').value,
            description: this.validationForm.querySelector('#description').value,
        };

        this.controller.handleFormSubmit(bookData);
    };

    handleCancel = () => {
        this.controller.hideValidationForm();
    };

    handleSave = () => {
        this.validationForm.dispatchEvent(new Event('submit'));
    };

    handleFilterInput = (event) => {
        const filterText = event.target.value;
        this.controller.filterBooks(filterText);
    };

    handleRemove = (event) => {
        const index = event.target.dataset.index;
        this.controller.removeBook(index);
    };

    handleDetail = (event) => {
        const index = event.target.dataset.index;
        this.controller.viewDetail(index);
    };

    showValidationForm = () => {
        this.validationForm.style.display = 'block';
    };

    hideValidationForm = () => {
        this.validationForm.style.display = 'none';
    };

    resetForm = () => {
        this.validationForm.reset();
    };

    initForm = () => {
        this.validationForm.style.display = 'none';
    };
}

export default BookView;