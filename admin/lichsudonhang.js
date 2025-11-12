/* ===================== KHỞI TẠO ===================== */

/* ✅ Nếu chưa có orders → tạo danh sách rỗng */
if (!localStorage.getItem('orders')) {
  localStorage.setItem('orders', JSON.stringify([]));
}

/* ✅ Nếu chưa có reviews (đánh giá) → tạo mảng rỗng */
if (!localStorage.getItem('reviews')) {
  localStorage.setItem('reviews', JSON.stringify([]));
}

/* ===================== DOM ===================== */
const ordersList = document.getElementById('ordersList');
const searchInput = document.getElementById('searchInput');
const fromDate = document.getElementById('fromDate');
const toDate = document.getElementById('toDate');
const searchCount = document.getElementById('searchCount');
const popup = document.getElementById('popup');
const billBody = document.getElementById('billBody');
const billTotal = document.getElementById('billTotal');
const closePopup = document.getElementById('closePopup');

/* ===================== HÀM DÙNG CHUNG ===================== */
function formatVND(n) {
  return n.toLocaleString('vi-VN') + " VND";
}

function getOrders() {
  return JSON.parse(localStorage.getItem('orders')) || [];
}

function getReviews() {
  return JSON.parse(localStorage.getItem('reviews')) || [];
}

/* ✅ Lấy sao user đã đánh giá */
function findRating(orderId) {
  const r = getReviews().find(x => x.id_don_hang === orderId);
  return r ? r.rating : 0;
}

/* ✅ Tạo HTML sao ⭐⭐⭐⭐⭐ */
function renderStars(rating) {
  if (!rating || rating === 0) {
    return `<div class="stars-empty">Chưa đánh giá</div>`;
  }

  return `
    <div class="stars-box">
      ${"★".repeat(rating)}
      ${"<span style='opacity:0.25'>★</span>".repeat(5 - rating)}
    </div>
  `;
}

/* ===================== HIỂN THỊ DANH SÁCH ===================== */
function renderList(keyword = '') {
  const kw = keyword.toLowerCase();

  let orders = getOrders().filter(o =>
    o.trang_thai === "Thành công" ||
    o.trang_thai === "Hủy đơn" ||
    o.trang_thai === "Đã hủy"
  );

  if (fromDate.value) {
    const f = new Date(fromDate.value);
    orders = orders.filter(o => new Date(o.ngay_dat) >= f);
  }

  if (toDate.value) {
    const t = new Date(toDate.value);
    t.setHours(23, 59, 59, 999);
    orders = orders.filter(o => new Date(o.ngay_dat) <= t);
  }

  const filtered = orders.filter(o =>
    o.id_don_hang.toLowerCase().includes(kw) ||
    o.id_khach_hang.toLowerCase().includes(kw) ||
    o.mon_an.some(m => m.ten.toLowerCase().includes(kw))
  );

  ordersList.innerHTML = "";
  searchCount.textContent = filtered.length + " kết quả";

  filtered.forEach(o => {
    const rating = findRating(o.id_don_hang);

    const card = document.createElement('div');
    card.className = "order-card";

    const trangThaiHTML = `
      <div class="info-item">
        Trạng thái<br>
        <span class="status-tag ${o.trang_thai === "Thành công" ? "status-success" : "status-cancel"}">
          ${o.trang_thai}
        </span>
      </div>
    `;

    card.innerHTML = `
      <div class="info-row">
        <div class="info-item">ID đơn<br>${o.id_don_hang}</div>
        <div class="info-item">ID khách<br>${o.id_khach_hang}</div>
        <div class="info-item">Ngày đặt<br>${o.ngay_dat}</div>
      </div>

      <div class="info-row">
        <div class="info-item">Thanh toán<br>${o.thanh_toan.phuong_thuc}</div>
        <div class="info-item">Đánh giá<br>${renderStars(rating)}</div>
        ${trangThaiHTML}
      </div>
    `;

    card.addEventListener("click", () => showPopup(o));
    ordersList.appendChild(card);
  });
}

/* ===================== POPUP CHI TIẾT ĐƠN ===================== */
function showPopup(o) {
  billBody.innerHTML = `
    <div><strong>ID đơn:</strong><span>${o.id_don_hang}</span></div>
    <div><strong>ID khách:</strong><span>${o.id_khach_hang}</span></div>
    <div><strong>Tên khách:</strong><span>${o.ten_khach_hang}</span></div>
    <div><strong>Ngày đặt:</strong><span>${o.ngay_dat}</span></div>
    <div><strong>Trạng thái:</strong><span>${o.trang_thai}</span></div>
    <div><strong>Phương thức thanh toán:</strong><span>${o.thanh_toan.phuong_thuc}</span></div>
    <br>
    <strong>Danh sách món:</strong>
    ${o.mon_an
      .map(m => `<div><span>${m.ten} x${m.so_luong}</span><span>${formatVND(m.thanh_tien)}</span></div>`)
      .join('')}
  `;

  billTotal.textContent = formatVND(o.tong_tien);
  popup.style.display = "flex";
}

/* ===================== SỰ KIỆN ===================== */
closePopup.addEventListener("click", () => popup.style.display = "none");
popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});

searchInput.addEventListener("input", (e) => renderList(e.target.value));
fromDate.addEventListener("change", () => renderList(searchInput.value));
toDate.addEventListener("change", () => renderList(searchInput.value));

/* ===================== KHỞI CHẠY ===================== */
renderList();
