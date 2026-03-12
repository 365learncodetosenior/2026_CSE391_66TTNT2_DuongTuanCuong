    const prices = { "Laptop": 20000000, "iPhone": 25000000, "Tai nghe": 2500000 };
    const form = document.getElementById('orderForm');

    function updateTotal() {
        const prod = document.getElementById('product').value;
        const qty = parseInt(document.getElementById('quantity').value) || 0;
        const total = (prices[prod] || 0) * qty;
        document.getElementById('totalDisplay').innerText = `Tổng tiền: ${total.toLocaleString('vi-VN')}đ`;
        return total;
    }

    document.getElementById('product').addEventListener('change', updateTotal);
    document.getElementById('quantity').addEventListener('input', updateTotal);

    document.getElementById('note').addEventListener('input', function() {
        const len = this.value.length;
        const counter = document.getElementById('charCount');
        counter.innerText = `${len}/200`;
        if (len > 200) {
            counter.classList.add('red-count');
            document.getElementById('noteError').innerText = "Ghi chú quá dài!";
        } else {
            counter.classList.remove('red-count');
            document.getElementById('noteError').innerText = "";
        }
    });

    function showError(id, msg) { document.getElementById(id + 'Error').innerText = msg; }
    function clearError(id) { document.getElementById(id + 'Error').innerText = ""; }

    function validate() {
        let isValid = true;

        if (!document.getElementById('product').value) { showError('product', "Vui lòng chọn sản phẩm"); isValid = false; }
        else clearError('product');

        const qty = document.getElementById('quantity').value;
        if (qty < 1 || qty > 99) { showError('quantity', "Số lượng từ 1-99"); isValid = false; }
        else clearError('quantity');

        const dateVal = document.getElementById('deliveryDate').value;
        if (!dateVal) { 
            showError('deliveryDate', "Vui lòng chọn ngày giao"); isValid = false; 
        } else {
            const selectedDate = new Date(dateVal).setHours(0,0,0,0);
            const today = new Date().setHours(0,0,0,0);
            const maxDate = new Date().setDate(new Date().getDate() + 30);

            if (selectedDate < today) {
                showError('deliveryDate', "Không được chọn ngày quá khứ"); isValid = false;
            } else if (selectedDate > maxDate) {
                showError('deliveryDate', "Không quá 30 ngày từ hôm nay"); isValid = false;
            } else clearError('deliveryDate');
        }

        if (document.getElementById('address').value.trim().length < 10) {
            showError('address', "Địa chỉ phải từ 10 ký tự"); isValid = false;
        } else clearError('address');

        if (!document.querySelector('input[name="payment"]:checked')) {
            showError('payment', "Chọn phương thức thanh toán"); isValid = false;
        } else clearError('payment');

        return isValid;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validate()) {
            const summary = `
                <p><b>Sản phẩm:</b> ${document.getElementById('product').value}</p>
                <p><b>Số lượng:</b> ${document.getElementById('quantity').value}</p>
                <p><b>Tổng tiền:</b> ${document.getElementById('totalDisplay').innerText.split(': ')[1]}</p>
                <p><b>Ngày giao:</b> ${document.getElementById('deliveryDate').value}</p>
            `;
            document.getElementById('summaryContent').innerHTML = summary;
            document.getElementById('confirmOverlay').style.display = 'flex';
        }
    });

    function closeModal() { document.getElementById('confirmOverlay').style.display = 'none'; }

    function finishOrder() {
        alert("🎉 Đặt hàng thành công! Cảm ơn bạn.");
        location.reload();
    }
