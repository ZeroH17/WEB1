document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("Content-right");

  // --- LẤY USER HIỆN TẠI ---
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (!currentUser || !currentUser.tendangnhap) {
    alert("Vui lòng đăng nhập để xem lịch sử đơn hàng!");
    container.innerHTML =
      "<p style='color:white;text-align:center;'>Bạn chưa đăng nhập.</p>";
    return;
  }

  const historyKey = `orderHistory_${currentUser.tendangnhap}`;
  let history = JSON.parse(localStorage.getItem(historyKey)) || [];

  if (history.length === 0) {
    container.innerHTML =
      "<p style='color:white;text-align:center;'>Chưa có đơn hàng nào.</p>";
    return;
  }

  // NHẬN CẬP NHẬT TRẠNG THÁI TỪ ADMIN
  function syncFromAdmin() {
    const adminOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]");

    let updated = false;

    history.forEach(orderUser => {
      const adminMatch = adminOrders.find(a => a.id === orderUser.id);
      if (adminMatch) {
        if (orderUser.status !== adminMatch.status) {
          orderUser.status = adminMatch.status; 
          updated = true;
        }
        if (adminMatch.rating && orderUser.rating !== adminMatch.rating) {
          orderUser.rating = adminMatch.rating; 
          updated = true;
        }
      }
    });

    if (updated) {
      localStorage.setItem(historyKey, JSON.stringify(history));
    }
  }

  
  syncFromAdmin();

  // ========================= HIỂN THỊ ĐƠN ===========================
  function renderOrders() {
    container.innerHTML = history.length
      ? ""
      : "<p style='color:white;text-align:center;'>Chưa có đơn hàng nào.</p>";

    container.innerHTML = history
      .map((order, index) => {
        const total =
          order.total ||
          order.items?.reduce((s, item) => s + (item.total || 0), 0) ||
          0;

        const rating = order.rating || 0;
        const isCanceled = order.status === "Đã hủy" || order.status === "Hủy đơn";

        return `
        <div class="box-history ${isCanceled ? "canceled" : ""}" data-index="${index}">
            <div class="order-info">
                <p><strong>ID đơn hàng:</strong> ${order.id}</p>
                <p><strong>Ngày:</strong> ${order.date}</p>
                <p><strong>Tổng tiền:</strong> ${total.toLocaleString("vi-VN")}₫</p>
                <p><strong>Trạng thái:</strong>
                    <span class="status ${isCanceled ? "status-cancel" : "status-active"}">
                        ${order.status}
                    </span>
                </p>
            </div>

            <div class="order-actions">
                ${
                  order.status === "Chờ xác nhận"
                    ? `<button class="cancel-btn">HỦY ĐƠN HÀNG</button>`
                    : order.status === "Đã hủy" || order.status === "Hủy đơn"
                    ? `<button class="cancel-btn disabled" disabled>ĐÃ HỦY</button>`
                    : ``
                }
                <div class="rating-container">
                    <label>Đánh giá:</label>
                    <div class="rating" data-index="${index}">
                        ${[1, 2, 3, 4, 5]
                          .map(
                            (i) => `
                            <img src="../../image/Star 22.svg"
                                alt="star"
                                class="star ${i <= rating ? "active" : ""}"
                                data-star="${i}">`
                          )
                          .join("")}
                    </div>
                </div>
            </div>
        </div>
        `;
      })
      .join("");

    attachEvents();
  }

  // =========================== GẮN SỰ KIỆN ============================
  function attachEvents() {
    // HỦY ĐƠN
    document.querySelectorAll(".cancel-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const box = e.target.closest(".box-history");
        const index = box.dataset.index;

        if (history[index].status === "Đã hủy") return;

        if (confirm("Bạn có chắc muốn hủy đơn này không?")) {
          history[index].status = "Đã hủy";

          // đồng bộ sang admin
          syncStatusToAdmin(history[index]);

          localStorage.setItem(historyKey, JSON.stringify(history));
          renderOrders();
        }
      });
    });

    // ĐÁNH GIÁ
    document.querySelectorAll(".rating").forEach((ratingDiv) => {
      ratingDiv.addEventListener("click", (e) => {
        if (!e.target.classList.contains("star")) return;

        const orderIndex = ratingDiv.dataset.index;
        const starValue = Number(e.target.dataset.star);

        if (history[orderIndex].status === "Đã hủy") {
          alert("Không thể đánh giá đơn đã hủy!");
          return;
        }

        history[orderIndex].rating = starValue;
        localStorage.setItem(historyKey, JSON.stringify(history));

        // Gửi sang admin + reviews
        syncRatingToAdmin(history[orderIndex].id, starValue);

        updateStars(ratingDiv, starValue);
      });
    });

    // XEM CHI TIẾT
    document.querySelectorAll(".box-history").forEach((box) => {
      box.addEventListener("click", (e) => {
        if (e.target.closest(".cancel-btn") || e.target.closest(".rating"))
          return;

        const index = box.dataset.index;
        showOrderDetailPopup(history[index]);
      });
    });
  }

  // ========================== ĐỒNG BỘ RATING → ADMIN + REVIEWS ==========================
  function syncRatingToAdmin(orderId, rating) {
    let adminOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]");

    const match = adminOrders.find((o) => o.id === orderId);
    if (match) {
      match.rating = rating;
      localStorage.setItem("adminOrders", JSON.stringify(adminOrders));
    }

    syncRatingToReviews(orderId, rating); // Lưu vào bảng đánh giá chung
  }

  function syncRatingToReviews(orderId, rating) {
    let reviews = JSON.parse(localStorage.getItem("reviews") || "[]");

    const exist = reviews.find((r) => r.id_don_hang === orderId);

    if (exist) {
      exist.rating = rating;
    } else {
      reviews.push({
        id_don_hang: orderId,
        rating: rating
      });
    }

    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  // ========================== ĐỒNG BỘ HỦY ĐƠN → ADMIN ==============================
  function syncStatusToAdmin(orderUser) {
    let adminOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
    const match = adminOrders.find((o) => o.id === orderUser.id);
    if (match) {
      match.status = "Hủy đơn";
      localStorage.setItem("adminOrders", JSON.stringify(adminOrders));
    }
  }

  // ========================== CẬP NHẬT SAO ==========================
  function updateStars(container, starValue) {
    container.querySelectorAll(".star").forEach((star) => {
      const val = Number(star.dataset.star);
      star.classList.toggle("active", val <= starValue);
    });
  }

  // ========================== POPUP CHI TIẾT ===========================
  function showOrderDetailPopup(order) {
    const popup = document.getElementById("orderDetailPopup");
    const content = document.getElementById("orderDetailContent");

    const total =
      order.total ||
      order.items?.reduce((sum, i) => sum + (i.total || 0), 0) ||
      0;

    content.innerHTML = `
      <p><strong>Mã đơn hàng:</strong> ${order.id}</p>
      <p><strong>Ngày đặt:</strong> ${order.date}</p>
      <p><strong>Trạng thái:</strong> ${order.status}</p>
      <p><strong>Thanh toán:</strong> ${order.paymentMethod || "Tiền mặt"}</p>
      <h4>Danh sách món ăn:</h4>
      <ul>
        ${order.items
          .map((i) => `<li>${i.name} (${i.qty}) - ${i.total.toLocaleString()}₫</li>`)
          .join("")}
      </ul>
      <p><strong>Tổng cộng:</strong> ${total.toLocaleString()}₫</p>
    `;

    popup.style.display = "flex";

    document.getElementById("closeOrderDetail").onclick = () =>
      (popup.style.display = "none");
  }

  // HIỂN THỊ LẦN ĐẦU
  renderOrders();
});
