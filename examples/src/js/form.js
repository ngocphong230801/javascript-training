const form = document.getElementById('registration-form');
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      let isValid = true;
      if (fullname.value.trim() === '') {
        document.getElementById('fullname-error').textContent = 'Vui lòng nhập họ và tên';
        isValid = false;
      } else {
        document.getElementById('fullname-error').textContent = '';
      }
      if (email.value.trim() === '') {
        document.getElementById('email-error').textContent = 'Vui lòng nhập email';
        isValid = false;
      } else {
        document.getElementById('email-error').textContent = '';
      }
      if (password.value.trim() === '') {
        document.getElementById('password-error').textContent = 'Vui lòng nhập mật khẩu';
        isValid = false;
      } else if (password.value.trim().length < 6) {
        document.getElementById('password-error').textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
        isValid = false;
      }
      else {
        document.getElementById('password-error').textContent = '';
      }
      if (confirmPassword.value.trim() === '') {
        document.getElementById('confirm-password-error').textContent = 'Vui lòng xác nhận mật khẩu';
        isValid = false;
      } else if (confirmPassword.value !== password.value) {
        document.getElementById('confirm-password-error').textContent = 'Mật khẩu xác nhận không khớp';
        isValid = false;
      }
      else{
        document.getElementById('confirm-password-error').textContent = '';
      }
      if (isValid) {
        alert('Đăng kí thành công!');
        form.reset();
      }
    });