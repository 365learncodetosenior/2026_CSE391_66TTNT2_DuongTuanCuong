const form = document.getElementById('regForm');

function showError(id, message) {
    const input = document.getElementById(id);
    const errorDisplay = document.getElementById(`${id}Error`);
    if (input && input.type !== 'radio') input.classList.add('invalid');
    if (errorDisplay) errorDisplay.innerText = message;
}

function clearError(id) {
    const input = document.getElementById(id);
    const errorDisplay = document.getElementById(`${id}Error`);
    if (input) input.classList.remove('invalid');
    if (errorDisplay) errorDisplay.innerText = "";
}

function validateFullname() {
    const val = document.getElementById('fullname').value.trim();
    const regex = /^[a-zA-ZÀ-ỹ\s]{3,}$/; 
    if (!val) { showError('fullname', "Họ tên không được để trống"); return false; }
    if (!regex.test(val)) { showError('fullname', "Tối thiểu 3 ký tự, chỉ chứa chữ"); return false; }
    clearError('fullname'); return true;
}

function validateEmail() {
    const val = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) { showError('email', "Email không được trống"); return false; }
    if (!regex.test(val)) { showError('email', "Email không đúng định dạng"); return false; }
    clearError('email'); return true;
}

function validatePhone() {
    const val = document.getElementById('phone').value.trim();
    const regex = /^0\d{9}$/;
    if (!val) { showError('phone', "Số điện thoại không được trống"); return false; }
    if (!regex.test(val)) { showError('phone', "Phải có 10 số và bắt đầu bằng số 0"); return false; }
    clearError('phone'); return true;
}

function validatePassword() {
    const val = document.getElementById('password').value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!val) { showError('password', "Mật khẩu không được trống"); return false; }
    if (!regex.test(val)) { showError('password', "Tối thiểu 8 ký tự, 1 hoa, 1 thường, 1 số"); return false; }
    clearError('password'); return true;
}

function validateConfirm() {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (!confirm) { showError('confirmPassword', "Vui lòng xác nhận mật khẩu"); return false; }
    if (confirm !== pass) { showError('confirmPassword', "Mật khẩu không khớp"); return false; }
    clearError('confirmPassword'); return true;
}

function validateGender() {
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        document.getElementById('genderError').innerText = "Vui lòng chọn giới tính";
        return false;
    }
    document.getElementById('genderError').innerText = "";
    return true;
}

function validateTerms() {
    const checked = document.getElementById('terms').checked;
    if (!checked) { showError('terms', "Bạn chưa đồng ý điều khoản"); return false; }
    clearError('terms'); return true;
}

const fields = ['fullname', 'email', 'phone', 'password', 'confirmPassword'];
fields.forEach(id => {
    const element = document.getElementById(id);
    element.addEventListener('blur', () => {
        if (id === 'fullname') validateFullname();
        if (id === 'email') validateEmail();
        if (id === 'phone') validatePhone();
        if (id === 'password') validatePassword();
        if (id === 'confirmPassword') validateConfirm();
    });
    element.addEventListener('input', () => clearError(id));
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateFullname();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPassValid = validatePassword();
    const isConfirmValid = validateConfirm();
    const isGenderValid = validateGender();
    const isTermsValid = validateTerms();

    if (isNameValid & isEmailValid & isPhoneValid & isPassValid & isConfirmValid & isGenderValid & isTermsValid) {
        const name = document.getElementById('fullname').value;
        document.getElementById('registerContainer').style.display = 'none';
        const success = document.getElementById('successMsg');
        success.style.display = 'block';
        success.innerHTML = `Đăng ký thành công! 🎉 <br> Chào mừng, ${name}!`;
    }
});