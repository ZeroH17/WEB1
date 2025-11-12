/* =============================
   ✅ TRẠNG THÁI
============================= */
const states = ["Chờ xác nhận", "Đang xử lý", "Thành công", "Hủy đơn"];

function statusClass(status) {
  if (status === "Chờ xác nhận") return "status-waiting";
  if (status === "Đang xử lý") return "status-processing";
  if (status === "Thành công") return "status-success";
  if (status === "Hủy đơn" || status === "Đã hủy") return "status-cancel";
  return "";
}

/* =============================
   ✅ LOAD adminOrders
============================= */
let orders = JSON.parse(localStorage.getItem("adminOrders") || "[]");

/* =============================
   ✅ TỰ ĐỘNG CHUYỂN ĐƠN ĐÃ HOÀN TẤT / HỦY
============================= */
orders.forEach(order => moveOrderToHistoryAndRemove(order));
orders = JSON.parse(localStorage.getItem("adminOrders") || "[]");

/* =============================
   ✅ HIỂN THỊ DANH SÁCH
============================= */
function renderOrders(list = orders) {
  const container = document.getElementById("ordersContainer");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<p style="color:white;text-align:center;font-size:18px;">Không có đơn hàng.</p>`;
    return;
  }

  list.forEach((o, i) => {
    let div = document.createElement("div");
    div.className = "rectangle-inner";

    div.innerHTML = `
      <div class="info-row">

        <div class="info-item">
          <small>Mã đơn</small>${o.id}
        </div>

        <div class="info-item">
          <small>ID khách</small>${o.id_khach || "KH???"}
        </div>

        <div class="info-item">
          <small>Khách hàng</small>${o.hoten}
        </div>

        <div class="info-item">
          <small>Tổng tiền</small>${o.total.toLocaleString()}₫
        </div>

        <div class="info-item">
          <small>Ngày đặt</small>${o.date}
        </div>

      </div>

      <div class="status-text ${statusClass(o.status)}">${o.status}</div>
    `;

    div.onclick = () => openPopup(i);
    container.appendChild(div);
  });
}

renderOrders();

/* =============================
   ✅ POPUP XEM CHI TIẾT
============================= */
function openPopup(index) {
  const order = orders[index];

  document.getElementById("popup-info").innerHTML = `
    <div><span>Mã đơn:</span> <span>${order.id}</span></div>
    <div><span>ID khách:</span> <span>${order.id_khach || "KH???"}</span></div>
    <div><span>Khách hàng:</span> <span>${order.hoten}</span></div>
    <div><span>Ngày đặt:</span> <span>${order.date}</span></div>
    <div><span>Phương thức:</span> <span>${order.payment}</span></div>
    <div><span>Trạng thái:</span> <span>${order.status}</span></div>
    <hr>
    <div><strong>Chi tiết món ăn:</strong></div>
    ${order.items
      .map(i => `<div><span>${i.name} (${i.qty})</span><span>${i.total.toLocaleString()}₫</span></div>`)
      .join("")}
  `;

  document.getElementById("bill-total").textContent =
    order.total.toLocaleString() + "₫";

  const select = document.getElementById("popup-status-select");
  select.innerHTML = states
    .map(s => `<option ${order.status === s ? "selected" : ""}>${s}</option>`)
    .join("");

  document.getElementById("popup").style.display = "flex";

  /* ✅ LƯU TRẠNG THÁI */
  document.getElementById("savePopup").onclick = function () {
    order.status = select.value;

    // ✅ Lưu vào adminOrders
    localStorage.setItem("adminOrders", JSON.stringify(orders));

    // ✅ Đồng bộ sang user
    syncStatusToUser(order);

    // ✅ Chuyển sang lịch sử (nếu cần)
    moveOrderToHistoryAndRemove(order);

    alert("Đã cập nhật!");
    document.getElementById("popup").style.display = "none";

    orders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
    renderOrders();
  };

  document.getElementById("closePopup").onclick = () => {
    document.getElementById("popup").style.display = "none";
  };
}

/* =====================================================
 ✅ CHUYỂN ĐƠN → LỊCH SỬ & XÓA KHỎI adminOrders
===================================================== */
function moveOrderToHistoryAndRemove(order) {
  if (
    order.status !== "Thành công" &&
    order.status !== "Hủy đơn" &&
    order.status !== "Đã hủy"
  ) return;

  if (order.status === "Đã hủy") order.status = "Hủy đơn";

  let history = JSON.parse(localStorage.getItem("orders") || "[]");

  let found = history.find(h => h.id_don_hang === order.id);

  if (!found) {
    history.push({
      id_don_hang: order.id,
      id_khach_hang: order.id_khach || "KH???",
      ten_khach_hang: order.hoten,
      ngay_dat: order.date,
      tong_tien: order.total,
      trang_thai: order.status,
      thanh_toan: { phuong_thuc: order.payment },
      mon_an: order.items.map(i => ({
        ten: i.name,
        so_luong: i.qty,
        thanh_tien: i.total
      }))
    });
  } else {
    found.trang_thai = order.status;
  }

  localStorage.setItem("orders", JSON.stringify(history));

  // ✅ Xóa khỏi adminOrders
  let newOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
  newOrders = newOrders.filter(o => o.id !== order.id);
  localStorage.setItem("adminOrders", JSON.stringify(newOrders));
}

/* =====================================================
 ✅ ĐỒNG BỘ TRẠNG THÁI VỀ USER
===================================================== */
function syncStatusToUser(order) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("orderHistory_")) {
      let userOrders = JSON.parse(localStorage.getItem(key) || "[]");

      let found = userOrders.find(o => o.id === order.id);

      if (found) {
        found.status = order.status;
        localStorage.setItem(key, JSON.stringify(userOrders));
      }
    }
  }
}

/* =============================
   ✅ LỌC ĐƠN
============================= */
document.getElementById("filterStatus").innerHTML =
  `<option value="">Tất cả</option>` +
  states.map(s => `<option>${s}</option>`).join("");

document.getElementById("applyFilter").onclick = () => {
  let from = document.getElementById("filterFrom").value;
  let to = document.getElementById("filterTo").value;
  let status = document.getElementById("filterStatus").value;

  let filtered = orders.filter(o => {
    let ok = true;
    if (from && o.date < from) ok = false;
    if (to && o.date > to) ok = false;
    if (status && o.status !== status) ok = false;
    return ok;
  });

  renderOrders(filtered);
};

document.getElementById("resetFilter").onclick = () => {
  document.getElementById("filterFrom").value = "";
  document.getElementById("filterTo").value = "";
  document.getElementById("filterStatus").value = "";
  renderOrders();
};
