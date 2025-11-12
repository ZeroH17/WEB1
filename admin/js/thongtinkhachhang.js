// ✅ Chỉ cập nhật trạng thái hoặc hoten nếu thiếu
let users = JSON.parse(localStorage.getItem('users')) || [];
users.forEach(u => { 
    if (!u.trangthai) u.trangthai = "Hoạt động"; 
    if (u.hoten === undefined) u.hoten = ""; 
});
localStorage.setItem('users', JSON.stringify(users));

const bigRect = document.getElementById('bigRect');
const popupsContainer = document.getElementById('popups-container');
const searchInput = document.getElementById('searchInput');  // ✅ Ô tìm kiếm


/* ============================================================
 ✅ HÀM HIỂN THỊ DANH SÁCH KHÁCH HÀNG (CÓ BỘ LỌC TÊN)
============================================================ */
function renderCustomers(filter = "") {
    bigRect.innerHTML = "";
    popupsContainer.innerHTML = "";

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ chuyển về lowercase để lọc dễ dàng
    filter = filter.toLowerCase();

    // ✅ Lọc theo tên, username, email, sdt (nếu có)
    let filteredUsers = users.filter(u =>
        (u.hoten || "").toLowerCase().includes(filter) ||
        (u.tendangnhap || "").toLowerCase().includes(filter) ||
        (u.email || "").toLowerCase().includes(filter) ||
        (u.sdt || "").toLowerCase().includes(filter)
    );

    // ✅ duyệt theo dạng 3 khách 1 dòng
    for (let i = 0; i < filteredUsers.length; i += 3) {
        const row = document.createElement("div");
        row.className = "row";

        for (let j = 0; j < 3 && i + j < filteredUsers.length; j++) {
            const index = i + j;
            const user = filteredUsers[index];

            const outer = document.createElement("div");
            outer.className = "small-rect";

            const innerTop = document.createElement("div");
            innerTop.className = "inner-rect-top";

            const innerBottom = document.createElement("div");
            innerBottom.className = "inner-rect-bottom";
            innerBottom.textContent = user.hoten?.trim() !== "" ? user.hoten : "Chưa cập nhật";

            outer.appendChild(innerTop);
            outer.appendChild(innerBottom);
            row.appendChild(outer);
            bigRect.appendChild(row);

            // ✅ popup
            const popupOverlay = document.createElement("div");
            popupOverlay.className = "popup-overlay";
            popupOverlay.id = `popup-${index}`;

           popupOverlay.innerHTML = `
    <div class="popup">
        <span class="close-btn">&times;</span>
        <h2>Thông tin khách hàng</h2>
        <div class="popup-content">

            <div class="popup-row">
                <div>
                    <label>Họ tên:</label>
                    <input type="text" id="hoten-${index}" value="${user.hoten || ""}">
                </div>

                <div>
                    <label>ID khách hàng:</label>
                    <input type="text" id="idkhach-${index}" value="${user.id_khach || ""}" readonly>
                </div>
            </div>

            <div class="popup-row">
                <div>
                    <label>Username:</label>
                    <input type="text" id="tendangnhap-${index}" value="${user.tendangnhap}">
                </div>

                <div>
                    <label>Mật khẩu:</label>
                    <input type="text" id="matkhau-${index}" value="${user.matkhau}">
                </div>
            </div>

            <div class="popup-row">
                <div>
                    <label>Email:</label>
                    <input type="text" id="email-${index}" value="${user.email}">
                </div>

                <div>
                    <label>Vi phạm:</label>
                    <input type="number" id="vipham-${index}" value="${user.vipham || 0}">
                </div>
            </div>

            <div>
                <label>Trạng thái:</label>
                <input type="text" id="trangthai-${index}" value="${user.trangthai}" readonly />

                <div style="display:flex; gap:10px; margin-top:8px;">
                    <button onclick="khoaTaiKhoan(${index})">Khóa tài khoản</button>
                    <button onclick="moTaiKhoan(${index})">Mở tài khoản</button>
                </div>
            </div>

            <button onclick="saveUser(${index})">Lưu</button>
        </div>
    </div>
`;


            popupsContainer.appendChild(popupOverlay);

            // ✅ MỞ POPUP
            outer.onclick = () => document.getElementById(`popup-${index}`).style.display = "flex";

            // ✅ ĐÓNG POPUP
            popupOverlay.addEventListener("click", e => {
                if (e.target === popupOverlay || e.target.classList.contains("close-btn")) {
                    popupOverlay.style.display = "none";
                }
            });
        }
    }
}


/* ============================================================
 ✅ LƯU THÔNG TIN KHÁCH HÀNG
============================================================ */
function saveUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users[index].hoten = document.getElementById(`hoten-${index}`).value.trim();
    users[index].tendangnhap = document.getElementById(`tendangnhap-${index}`).value.trim();
    users[index].matkhau = document.getElementById(`matkhau-${index}`).value.trim();
    users[index].email = document.getElementById(`email-${index}`).value.trim();
    users[index].vipham = parseInt(document.getElementById(`vipham-${index}`).value) || 0;

    localStorage.setItem("users", JSON.stringify(users));
    renderCustomers(searchInput.value); 
}


/* ============================================================
 ✅ KHÓA / MỞ TÀI KHOẢN
============================================================ */
function khoaTaiKhoan(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users[index].trangthai = "Đã bị khóa";
    localStorage.setItem("users", JSON.stringify(users));
    renderCustomers(searchInput.value);
}

function moTaiKhoan(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users[index].trangthai = "Hoạt động";
    localStorage.setItem("users", JSON.stringify(users));
    renderCustomers(searchInput.value);
}


/* ============================================================
 ✅ SỰ KIỆN TÌM KIẾM REALTIME
============================================================ */
searchInput.addEventListener("input", () => {
    renderCustomers(searchInput.value);
});


/* ============================================================
 ✅ KHỞI CHẠY
============================================================ */
renderCustomers();
