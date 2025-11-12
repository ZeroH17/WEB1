// ================= KIỂM TRA ĐĂNG NHẬP =================
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  if (!currentUser || !currentUser.tendangnhap) {
    alert("Vui lòng đăng nhập để thực hiện thanh toán!");
    window.location.href = "login_user.html";
    return;
  }
});

// ================= NÚT QUAY LẠI / HỦY =================
function goBack() {
  window.history.back();
}

function cancelPayment() {
  alert("Bạn đã hủy thanh toán!");
  window.location.href = "menu.html";
}

// ================= XÁC NHẬN PHƯƠNG THỨC =================
function confirmPayment() {
  const selected = document.querySelector('input[name="method"]:checked');
  if (!selected) {
    alert("Vui lòng chọn phương thức thanh toán!");
    return;
  }

  localStorage.setItem("paymentMethod", selected.id.toUpperCase());

  // Nếu là tiền mặt thì xử lý luôn không cần popup
  if (selected.id === "cash") {
    processPaymentSuccess();
    return;
  }

  // Các phương thức khác: hiển thị mã QR
  const qrPopup = document.getElementById("qr-popup");
  const qrImage = document.getElementById("qr-image");
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${selected.id.toUpperCase()}-PAYMENT`;
  qrPopup.style.display = "flex";
}

function closeQR() {
  document.getElementById("qr-popup").style.display = "none";
}

function confirmReceived() {
  document.getElementById("qr-popup").style.display = "none";
  processPaymentSuccess();
}

// ============================================
// THANH TOÁN THÀNH CÔNG + POPUP CHỌN ĐỊA CHỈ
// ============================================
function processPaymentSuccess() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (!currentUser || !currentUser.tendangnhap) {
    alert("Phiên đăng nhập đã hết hạn!");
    window.location.href = "login_user.html";
    return;
  }

  const cartKey = `cartItems_${currentUser.tendangnhap}`;
  const totalKey = `cartTotal_${currentUser.tendangnhap}`;
  const historyKey = `orderHistory_${currentUser.tendangnhap}`;

  const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
  if (!cart.length) {
    alert("Không có sản phẩm trong giỏ hàng.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.total, 0);

  // 🔹 ID đơn hàng: DH + yyyyMMdd + 3 số cuối id_khach
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const customerId = currentUser.id_khach || "KH000";
  const last3 = customerId.slice(-3);
  const orderId = "DH" + datePart + last3;

  const paymentMethod = localStorage.getItem("paymentMethod") || "TIỀN MẶT";
  const date = new Date().toLocaleString("vi-VN");

  const savedAddress = currentUser.address || "Chưa có địa chỉ đã lưu";

  let newOrder = {
    id: orderId,
    id_khach: customerId,
    username: currentUser.tendangnhap,
    hoten: currentUser.hoten || "Chưa cập nhật",
    diachi: savedAddress,
    items: cart,
    total: total,
    payment: paymentMethod,
    status: "Chờ xác nhận",
    date: date,
  };

  const successPopup = document.getElementById("success-popup");
  const successIcon = successPopup.querySelector(".success-icon");
  const successTitle = successPopup.querySelector("h3");
  const orderDetails = document.getElementById("order-details");

  successIcon.style.display = "none";
  successTitle.style.display = "none";

  function renderPopup(isNewAddress = false) {
    orderDetails.innerHTML = `
      <p><strong>ID khách:</strong> ${newOrder.id_khach}</p>
      <p><strong>Họ và tên:</strong> ${newOrder.hoten}</p>
      <p><strong>Tên đăng nhập:</strong> ${newOrder.username}</p>
      <p><strong>Thanh toán:</strong> ${newOrder.payment}</p>
      
      <h4>Chọn Địa chỉ giao hàng:</h4>
      
      <div class="address-options">
        <label>
          <input type="radio" name="addressOption" value="saved" 
            ${!isNewAddress ? "checked" : ""}>
          Địa chỉ đã lưu: <strong>${savedAddress}</strong>
        </label>
        
        <label>
          <input type="radio" name="addressOption" value="new" 
            ${isNewAddress ? "checked" : ""}>
          Nhập địa chỉ mới
        </label>
      </div>
      
      <div id="newAddressForm" class="${isNewAddress ? "active" : ""}">
        <p><strong>Địa chỉ hiện tại:</strong> 
          <span id="currentDisplayedAddress">${newOrder.diachi}</span>
        </p>
        <label for="inputNewAddress">Địa chỉ chi tiết (nhập mới):</label>
        <input type="text" id="inputNewAddress" 
               value="${isNewAddress && newOrder.diachi !== savedAddress ? newOrder.diachi : ""}"
               placeholder="Số nhà, Tên đường, Phường/Xã...">
      </div>

      <h4>Chi tiết món ăn:</h4>
      <ul>
        ${newOrder.items
          .map((i) => `<li>${i.name} x ${i.qty} - ${i.total.toLocaleString()}₫</li>`)
          .join("")}
      </ul>

      <p><strong>Tổng cộng:</strong> ${newOrder.total.toLocaleString()}₫</p>

      <div class="popup-buttons">
        <button id="saveInfoBtn" class="btn-blue" style="display:none;">Lưu thông tin</button>
        <button id="confirmDoneBtn" class="btn-green">Xác nhận đơn hàng</button>
        <button id="cancelBtn" class="btn-red">Hủy</button>
      </div>
    `;
    attachAddressEvents();
  }

  function attachAddressEvents() {
    const radioSaved = document.querySelector('input[value="saved"]');
    const radioNew = document.querySelector('input[value="new"]');
    const newAddressForm = document.getElementById("newAddressForm");
    const inputNewAddress = document.getElementById("inputNewAddress");
    const confirmDoneBtn = document.getElementById("confirmDoneBtn");
    const currentDisplayedAddress = document.getElementById("currentDisplayedAddress");

    // === XỬ LÝ CHUYỂN RADIO ===
    function handleAddressChange() {
      if (radioNew.checked) {
        newAddressForm.classList.add("active");
        currentDisplayedAddress.textContent =
          inputNewAddress.value.trim() || savedAddress;
      } else {
        newAddressForm.classList.remove("active");
        currentDisplayedAddress.textContent = savedAddress;
      }
    }

    radioSaved.onchange = handleAddressChange;
    radioNew.onchange = handleAddressChange;
    inputNewAddress.oninput = () => {
      if (radioNew.checked) {
        currentDisplayedAddress.textContent =
          inputNewAddress.value.trim() || savedAddress;
      }
    };

    // === XÁC NHẬN ĐƠN HÀNG CUỐI CÙNG ===
    confirmDoneBtn.onclick = () => {
      let finalAddress = savedAddress;

      if (radioNew.checked) {
        finalAddress = inputNewAddress.value.trim();
        if (!finalAddress) {
          alert("Vui lòng nhập địa chỉ mới hoặc chọn địa chỉ đã lưu.");
          return;
        }
      }

      newOrder.diachi = finalAddress;

      // --- Lưu đơn hàng ---
      successIcon.style.display = "block";
      successTitle.style.display = "block";
      successTitle.textContent = "Đặt đơn thành công!";

      const history = JSON.parse(localStorage.getItem(historyKey) || "[]");
      history.unshift(newOrder);
      localStorage.setItem(historyKey, JSON.stringify(history));

      const adminOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
      adminOrders.unshift(newOrder);
      localStorage.setItem("adminOrders", JSON.stringify(adminOrders));

      localStorage.removeItem(cartKey);
      localStorage.removeItem(totalKey);

      setTimeout(() => {
        successPopup.style.display = "none";
        window.location.href = "info-user/history-user.html";
      }, 1800);
    };

    document.getElementById("cancelBtn").onclick = () => {
      if (confirm("Bạn có chắc muốn hủy đơn vừa đặt không?")) {
        successPopup.style.display = "none";
        window.location.href = "menu.html";
      }
    };
  }

  successPopup.style.display = "flex";
  renderPopup(false);
}

// ================= HIỂN THỊ TỔNG TIỀN =================
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  if (!currentUser.tendangnhap) return;

  const totalKey = `cartTotal_${currentUser.tendangnhap}`;
  const total = localStorage.getItem(totalKey);

  if (total) {
    const money = Number(total).toLocaleString("vi-VN") + "₫";
    document.querySelectorAll("#cash-total, #displayTotal").forEach(
      (el) => (el.textContent = money)
    );
  }
});
