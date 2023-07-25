const form = document.getElementById('validation-form');
const bookName = document.getElementById('bookname');
const author = document.getElementById('author');
const date = document.getElementById('date');
const image = document.getElementById('image');
const description = document.getElementById('description');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;
    //Check Book Name
    if (bookName.value.trim() === ''){
        document.getElementById('bookname-error').textContent = "Please enter your Book Name";
        isValid = false;
    } else {
        document.getElementById('bookname-error').textContent = '';
    }
    //Check Author
    if (author.value.trim() === ''){
        document.getElementById('author-error').textContent = "Please enter your Author";
        isValid = false;
    } else {
        document.getElementById('author-error').textContent = '';
    }

    //Check Date

    if (date.value.trim() === ''){
        document.getElementById('date-error').textContent = "Please enter your date ";
        isValid = false;

    } else {
        document.getElementById('date-error').textContent = '';
    }

    if (description.value.trim() === ''){
        document.getElementById('description-error').textContent = "Please enter your description";
        isValid = false;
    } else {
        document.getElementById('description-error').textContent = '';
    }

});

