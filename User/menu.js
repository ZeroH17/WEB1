// ================== BỘ LỌC ==================
const filterIcon = document.getElementById("filterIcon");
const filterBox = document.getElementById("filterBox");
const btnLoai = document.getElementById("btnLoai");
const btnGia = document.getElementById("btnGia");
const filterLoai = document.getElementById("filterLoai");
const filterGia = document.getElementById("filterGia");
const searchInput = document.getElementById("searchInput");
const priceRange = document.getElementById("priceRange");
const maxPrice = document.getElementById("maxPrice");
const tagButtons = document.querySelectorAll(".tag");

// Toggle filter box
filterIcon?.addEventListener("click", (e) => {
  e.stopPropagation();
  filterBox.classList.toggle("active");
});
document.addEventListener("click", (e) => {
  if (!filterBox?.contains(e.target) && !filterIcon?.contains(e.target)) {
    filterBox?.classList.remove("active");
  }
});

// Chuyển tab
btnLoai?.addEventListener("click", () => {
  btnLoai.classList.add("active");
  btnGia.classList.remove("active");
  filterLoai.classList.remove("hidden");
  filterGia.classList.add("hidden");
});
btnGia?.addEventListener("click", () => {
  btnGia.classList.add("active");
  btnLoai.classList.remove("active");
  filterGia.classList.remove("hidden");
  filterLoai.classList.add("hidden");
});

// Áp dụng lọc
priceRange?.addEventListener("input", () => {
  maxPrice.textContent = Number(priceRange.value).toLocaleString("vi-VN");
  applyFilters();
});
searchInput?.addEventListener("input", applyFilters);
tagButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tagButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilters();
  });
});

function applyFilters() {
  const keyword = searchInput?.value.trim().toLowerCase() || "";
  const selectedTag = document.querySelector(".tag.active");
  const categoryFilter = selectedTag ? selectedTag.textContent.trim() : null;
  const maxPriceValue = parseInt(priceRange?.value || "0", 10);

  if (window.filterProducts) {
    window.filterProducts(keyword, categoryFilter, maxPriceValue);
  }
}

// ================== GIỎ HÀNG + USER ==================
document.addEventListener("DOMContentLoaded", () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  // ✅ Phải dùng tendangnhap mới đúng
  if (!currentUser || !currentUser.tendangnhap) {
    console.warn("⚠️ Chưa đăng nhập");
  }

  // ================== KEY GIỎ HÀNG ==================
  const cartKey = `cartItems_${currentUser.tendangnhap || "guest"}`;
  const totalKey = `cartTotal_${currentUser.tendangnhap || "guest"}`;
  const avatarKey = `avatar_${currentUser.tendangnhap || "guest"}`;

  // ================== AVATAR ==================
  const avatar = document.querySelector(".avatar") || document.querySelector("#userAvatar");
  const userNameDisplay = document.getElementById("userNameDisplay");

  if (avatar) {
    const savedAvatar = localStorage.getItem(avatarKey);
    if (savedAvatar) {
      avatar.style.backgroundImage = `url('${savedAvatar}')`;
      avatar.style.backgroundSize = "cover";
      avatar.style.backgroundPosition = "center";
    }

    // ✅ CHỈ CHO ĐỔI AVATAR TRONG TRANG info-user
    if (window.location.pathname.includes("info-user.html")) {
      avatar.addEventListener("click", () => {
        const url = prompt("Nhập link ảnh:");
        if (url && url.trim()) {
          localStorage.setItem(avatarKey, url);
          avatar.style.backgroundImage = `url('${url}')`;
        }
      });
    }
  }

  // ================== HIỂN TÊN USER ==================
  if (userNameDisplay && currentUser?.tendangnhap) {
    userNameDisplay.textContent = currentUser.tendangnhap;
  }

  // ================== CHECKOUT ==================
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!currentUser || !currentUser.tendangnhap) {
        alert("Vui lòng đăng nhập để thanh toán!");
        window.location.href = "login_user.html";
        return;
      }

      const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
      if (!cart.length) {
        alert("Giỏ hàng trống!");
        return;
      }

      const totalText = document.getElementById("cartTotalPrice")?.textContent || "0";
      const total = parseInt(totalText.replace(/[^\d]/g, ""), 10);
      localStorage.setItem(totalKey, total);

      window.location.href = "payment.html";
    });
  }

  // ================== POPUP: THÊM VÀO GIỎ ==================
  const addToCartBtn = document.getElementById("addToCart");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      if (!currentUser || !currentUser.tendangnhap) {
        alert("Vui lòng đăng nhập để thêm món!");
        window.location.href = "login_user.html";
        return;
      }

      const name = document.getElementById("modalName").textContent.trim();
      const price = parseInt(document.getElementById("modalPrice").textContent.replace(/[^\d]/g, ""));
      const img = document.getElementById("modalImg").src;
      const qty = parseInt(document.getElementById("modalQty").value);

      let cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

      const exist = cart.find((x) => x.name === name);
      if (exist) {
        exist.qty += qty;
        exist.total = exist.qty * exist.price;
      } else {
        cart.push({ name, price, qty, total: price * qty, img });
      }

      localStorage.setItem(cartKey, JSON.stringify(cart));
      alert("Đã thêm vào giỏ!");

      document.getElementById("orderModal").style.display = "none";
      window.renderCartUI(); // Gọi hàm toàn cục
    });
  }

  // ================== RENDER GIỎ HÀNG (GLOBAL) ==================
  // ✅ ĐỊNH NGHĨA HÀM NÀY TRONG PHẠM VI WINDOW ĐỂ menu-item.js CÓ THỂ GỌI ĐƯỢC
  window.renderCartUI = function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const cartKey = `cartItems_${currentUser.tendangnhap || "guest"}`;
    
    const cartArea = document.getElementById("cartItems");
    const totalLabel = document.getElementById("cartTotalPrice");

    if (!cartArea || !totalLabel) return;

    const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
    cartArea.innerHTML = "";

    if (!cart.length) {
      totalLabel.textContent = "0₫";
      return;
    }

    cart.forEach((item, i) => {
      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
        <span>${item.name}</span>
        <div class="cart-item-controls">
          <button class="cart-minus" data-i="${i}">−</button>
          <span>${item.qty}</span>
          <button class="cart-plus" data-i="${i}">+</button>
        </div>
        <span>${item.total.toLocaleString()}₫</span>
      `;

      cartArea.appendChild(div);
    });

    const total = cart.reduce((s, x) => s + x.total, 0);
    totalLabel.textContent = total.toLocaleString("vi-VN") + "₫";
  }

  // ================== THỰC HIỆN LẦN ĐẦU KHI TẢI TRANG ==================
  window.renderCartUI();


  // ================== NÚT + / - ==================
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-minus") || e.target.classList.contains("cart-plus")) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const cartKey = `cartItems_${currentUser.tendangnhap || "guest"}`;
      
      let cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
      const i = e.target.dataset.i;

      if (e.target.classList.contains("cart-plus")) {
        cart[i].qty++;
      } else {
        if (cart[i].qty > 1) cart[i].qty--;
        else cart.splice(i, 1);
      }

      cart.forEach((x) => (x.total = x.qty * x.price));
      localStorage.setItem(cartKey, JSON.stringify(cart));

      window.renderCartUI(); // Gọi lại hàm toàn cục
    }
  });

});