let students = [];

const nameInput = document.getElementById('txtName');
const scoreInput = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tableBody = document.getElementById('studentTableBody');
const summaryArea = document.getElementById('summaryArea');

function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

function renderTable() {
    tableBody.innerHTML = '';
    let totalScore = 0;

    students.forEach((student, index) => {
        const rank = getRank(student.score);
        const rowClass = student.score < 5 ? 'bg-yellow' : '';
        totalScore += student.score;

        const row = `
            <tr class="${rowClass}">
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.score}</td>
                <td>${rank}</td>
                <td><button class="btn-delete" data-index="${index}">Xóa</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    const avgScore = students.length > 0 ? (totalScore / students.length).toFixed(2) : 0;
    summaryArea.innerHTML = `Tổng số SV: ${students.length} | Điểm trung bình lớp: ${avgScore}`;
}

function addStudent() {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    students.push({ name, score });

    renderTable();

    nameInput.value = '';
    scoreInput.value = '';
    nameInput.focus();
}

btnAdd.addEventListener('click', addStudent);

scoreInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addStudent();
});

tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const index = e.target.getAttribute('data-index');
        students.splice(index, 1); 
        renderTable(); 
    }
});
