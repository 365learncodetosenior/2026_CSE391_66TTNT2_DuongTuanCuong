let students = []; 
let sortDirection = 0; 

const nameInput = document.getElementById('txtName');
const scoreInput = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tableBody = document.getElementById('studentTableBody');
const summaryArea = document.getElementById('summaryArea');
const searchInput = document.getElementById('searchName');
const rankSelect = document.getElementById('filterRank');
const sortBtn = document.getElementById('sortScore');
const sortIcon = document.getElementById('sortIcon');


function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}


function applyFilters() {
    let keyword = searchInput.value.toLowerCase();
    let selectedRank = rankSelect.value;

    let filtered = students.filter(s => {
        const matchesName = s.name.toLowerCase().includes(keyword);
        const matchesRank = (selectedRank === "All") || (getRank(s.score) === selectedRank);
        return matchesName && matchesRank;
    });

    if (sortDirection !== 0) {
        filtered.sort((a, b) => {
            return sortDirection === 1 ? a.score - b.score : b.score - a.score;
        });
    }

    renderTable(filtered);
}

function renderTable(dataToDisplay) {
    tableBody.innerHTML = '';
    
    if (dataToDisplay.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center">Không tìm thấy kết quả</td></tr>';
        summaryArea.innerHTML = `Tổng số SV: 0 | Điểm trung bình: 0`;
        return;
    }

    let totalScore = 0;
    dataToDisplay.forEach((st, index) => {
        const rank = getRank(st.score);
        totalScore += st.score;
        
        const row = document.createElement('tr');
        if (st.score < 5) row.classList.add('bg-yellow');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${st.name}</td>
            <td>${st.score.toFixed(1)}</td>
            <td>${rank}</td>
            <td><button class="btn-delete">Xóa</button></td>
        `;

        row.querySelector('.btn-delete').onclick = function() {
            if(confirm(`Xóa sinh viên ${st.name}?`)) {
                const originalIndex = students.indexOf(st);
                students.splice(originalIndex, 1);
                applyFilters();
            }
        };

        tableBody.appendChild(row);
    });

    const avg = (totalScore / dataToDisplay.length).toFixed(2);
    summaryArea.innerHTML = `Đang hiển thị: ${dataToDisplay.length} | Điểm trung bình nhóm này: ${avg}`;
}


function addStudent() {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    students.push({ name, score });

    applyFilters();

    nameInput.value = '';
    scoreInput.value = '';
    nameInput.focus();
}

btnAdd.addEventListener('click', addStudent);

scoreInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addStudent();
});

searchInput.addEventListener('input', applyFilters);

rankSelect.addEventListener('change', applyFilters);

sortBtn.addEventListener('click', () => {
    if (sortDirection === 0) sortDirection = 1;
    else if (sortDirection === 1) sortDirection = -1;
    else sortDirection = 0;

    sortIcon.innerText = sortDirection === 1 ? '▲' : (sortDirection === -1 ? '▼' : '↕');
    
    applyFilters();
});
