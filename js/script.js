document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('Form');
    const nameInput = document.getElementById('nameInput');
    const nameCInput = document.getElementById('nameCInput');
    const emailInput = document.getElementById('emailInput');
    const addressInput = document.getElementById('addressInput');
    const dateInput = document.getElementById('dateInput');

    const nameError = document.getElementById('nameError');
    const nameCError = document.getElementById('nameCError');
    const emailError = document.getElementById('emailError');
    const addressError = document.getElementById('addressError');
    const dateError = document.getElementById('dateError');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        resetErrors();

        const name = nameInput.value.trim();
        const nameC = nameCInput.value.trim();
        const email = emailInput.value.trim();
        const address = addressInput.value.trim();
        const date = dateInput.value.trim();

        let isValid = true;

        if (name === '') {
            setError(nameInput, nameError, 'Tên không được để trống.');
            isValid = false;
        }

        if (nameC === '') {
            setError(nameCInput, nameCError, 'Tên hội thảo không được để trống.');
            isValid = false;
        } else if (nameC.length > 60) {
            setError(nameCInput, nameCError, 'Tên hội thảo không được quá 60 ký tự.');
            isValid = false;
        }

        if (email === '') {
            setError(emailInput, emailError, 'Email không được để trống.');
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError(emailInput, emailError, 'Email không hợp lệ.');
            isValid = false;
        }

        if (address === '') {
            setError(addressInput, addressError, 'Địa chỉ không được để trống.');
            isValid = false;
        }

        if (date === '') {
            setError(dateInput, dateError, 'Ngày tháng không được để trống.');
            isValid = false;
        } else {
            const selectedDate = new Date(date);
            const today = new Date();

            today.setHours(0, 0, 0, 0);

            if (selectedDate <= today) {
                setError(dateInput, dateError, 'Ngày hội thảo phải lớn hơn ngày hôm nay.');
                isValid = false;
            }
        }

        if (!isValid) {
            return;
        }

        alert('Dữ liệu hợp lệ! Đã thêm nhân viên thành công.');
        form.reset();
    });

    function resetErrors() {
        [nameError, nameCError, emailError, addressError, dateError].forEach((error) => {
            if (error) {
                error.textContent = '';
                error.style.display = 'none';
            }
        });

        [nameInput, nameCInput, emailInput, addressInput, dateInput].forEach((input) => {
            if (input) {
                input.classList.remove('is-invalid');
            }
        });
    }

    function setError(inputEl, errorEl, message) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        inputEl.classList.add('is-invalid');
    }
});