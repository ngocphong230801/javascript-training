const form = document.getElementById('registration-form');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const address = document.getElementById('address');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const memberTable = document.getElementById('member-table');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let isValid = true;
  // Check fullname
  if (fullname.value.trim() === '') {
    document.getElementById('fullname-error').textContent = 'Please enter your fullname';
    isValid = false;
    console.log('Please enter your name');
  } else if (!isNaN(fullname.value.trim())) {
    document.getElementById('fullname-error').textContent = 'Not Number';
  } else {
    document.getElementById('fullname-error').textContent = '';
  }
  // Check email
  if (email.value.trim() === '') {
    document.getElementById('email-error').textContent = 'Please enter your email';
    isValid = false;
  } else {
    document.getElementById('email-error').textContent = '';
  }
  // Check password
  if (password.value.trim() === '') {
    document.getElementById('password-error').textContent = 'Please enter your password';
    isValid = false;
  } else if (password.value.trim().length < 6) {
    document.getElementById('password-error').textContent = 'Password must be more than 6 characters';
    isValid = false;
  }
  else {
    document.getElementById('password-error').textContent = '';
  }
  // Check address
  if (address.value.trim() === '') {
    document.getElementById('address-error').textContent = 'Please enter your address'
    isValid = false;
  } else {
    document.getElementById('address-error').textContent = '';
  }

  // Check confim password
  if (confirmPassword.value.trim() === '') {
    document.getElementById('confirm-password-error').textContent = 'Please confim the password';
    isValid = false;
  } else if (confirmPassword.value !== password.value) {
    document.getElementById('confirm-password-error').textContent = 'Password incorrect';
    isValid = false;
  }
  else {
    document.getElementById('confirm-password-error').textContent = '';
  }
  if (isValid) {
    // Add values to table

    localStorage.getItem('listAcount')
    localStorage.setItem('listAcount', JSON.stringify(list))

    const row = memberTable.insertRow(-1);
    const fullNameCell = row.insertCell(0);
    const emailCell = row.insertCell(1);
    const addressCell = row.insertCell(2)

    fullNameCell.textContent = fullname.value.trim();
    emailCell.textContent = email.value.trim();
    addressCell.textContent = address.value.trim();
    // Reset form
    form.reset();
  }
});
