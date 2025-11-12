const products = [
  // --- Gà Rán ---
  { id: 1, name: "Gà Rán Truyền Thống", category: "Gà Rán", price: 45000, img: "../image/ga1.png" },
  { id: 2, name: "Gà Rán Cay", category: "Gà Rán", price: 48000, img: "../image/ga2.png" },
  { id: 3, name: "Gà Rán Giòn", category: "Gà Rán", price: 47000, img: "../image/ga3.png" },
  { id: 4, name: "Gà Rán Mật Ong", category: "Gà Rán", price: 49000, img: "../image/ga4.png" },
  { id: 5, name: "Gà Rán Tỏi", category: "Gà Rán", price: 50000, img: "../image/ga5.png" },
  { id: 6, name: "Gà Rán Sốt BBQ", category: "Gà Rán", price: 52000, img: "../image/ga6.png" },
  { id: 7, name: "Gà Rán Cay Hàn", category: "Gà Rán", price: 53000, img: "../image/ga7.png" },
  { id: 8, name: "Gà Rán Tứ Xuyên", category: "Gà Rán", price: 54000, img: "../image/ga8.png" },
  { id: 9, name: "Gà Rán Mù Tạt", category: "Gà Rán", price: 55000, img: "../image/ga9.png" },
  { id: 10, name: "Gà Rán Chanh", category: "Gà Rán", price: 56000, img: "../image/ga10.png" },
  { id: 11, name: "Gà Rán Phô Mai", category: "Gà Rán", price: 57000, img: "../image/ga11.png" },
  { id: 12, name: "Gà Rán Sốt Cay", category: "Gà Rán", price: 58000, img: "../image/ga12.png" },
  { id: 13, name: "Gà Rán Cajun", category: "Gà Rán", price: 60000, img: "../image/ga13.png" },
  { id: 14, name: "Gà Rán Mắm", category: "Gà Rán", price: 50000, img: "../image/ga14.png" },
  { id: 15, name: "Gà Rán Ngũ Vị", category: "Gà Rán", price: 58000, img: "../image/ga15.png" },

  // --- Gà Phô Mai ---
  { id: 16, name: "Gà Phô Mai Tan Chảy", category: "Gà Phô Mai", price: 55000, img: "../image/ga_phomai_tanchay.jpg" },
  { id: 17, name: "Gà Phô Mai BBQ", category: "Gà Phô Mai", price: 56000, img: "../image/ga_phomai_bbq.jpg" },
  { id: 18, name: "Gà Phô Mai Cay", category: "Gà Phô Mai", price: 57000, img: "../image/ga_phomai_cay.jpg" },
  { id: 19, name: "Gà Phô Mai Hàn Quốc", category: "Gà Phô Mai", price: 58000, img: "../image/ga_phomai_hanquoc.jpg" },
  { id: 20, name: "Gà Phô Mai Trứng Muối", category: "Gà Phô Mai", price: 59000, img: "../image/ga_phomai_trungmuoi.jpg" },
  { id: 21, name: "Gà Phô Mai Mật Ong", category: "Gà Phô Mai", price: 60000, img: "../image/ga_phomai_matong.jpg" },
  { id: 22, name: "Gà Phô Mai Giòn", category: "Gà Phô Mai", price: 61000, img: "../image/ga_phomai_gion.jpg" },
  { id: 23, name: "Gà Phô Mai Bơ Tỏi", category: "Gà Phô Mai", price: 62000, img: "../image/ga_phomai_botoi.jpg" },
  { id: 24, name: "Gà Phô Mai Tỏi Ớt", category: "Gà Phô Mai", price: 63000, img: "../image/ga_phomai_toiot.jpg" },
  { id: 25, name: "Gà Phô Mai Cay Nồng", category: "Gà Phô Mai", price: 64000, img: "../image/ga_phomai_caynong.jpg" },
  { id: 26, name: "Gà Phô Mai Xông Khói", category: "Gà Phô Mai", price: 65000, img: "../image/ga_phomai_xongkhoi.jpg" },
  { id: 27, name: "Gà Phô Mai Tiêu Đen", category: "Gà Phô Mai", price: 66000, img: "../image/ga_phomai_tieuden.jpg" },
  { id: 28, name: "Gà Phô Mai Thảo Mộc", category: "Gà Phô Mai", price: 66000, img: "../image/ga_phomai_thaomoc.jpg" },
  { id: 29, name: "Gà Phô Mai Cajun", category: "Gà Phô Mai", price: 69000, img: "../image/ga_phomai_cajun.jpg" },
  { id: 30, name: "Gà Phô Mai Đút Lò", category: "Gà Phô Mai", price: 66000, img: "../image/ga_phomai_dutlo.jpg" },

  // --- Mì Ý ---
  { id: 31, name: "Mì Ý Sốt Bò Bằm", category: "Mì Ý", price: 70000, img: "../image/my_y_bo.jpg" },
  { id: 32, name: "Mì Ý Sốt Kem Nấm", category: "Mì Ý", price: 72000, img: "../image/my_y_kemnam.jpg" },
  { id: 33, name: "Mì Ý Hải Sản", category: "Mì Ý", price: 75000, img: "../image/my_y_haisan.jpg" },
  { id: 34, name: "Mì Ý Gà Nướng", category: "Mì Ý", price: 73000, img: "../image/my_y_ganuong.jpg" },
  { id: 35, name: "Mì Ý Thịt Xông Khói", category: "Mì Ý", price: 76000, img: "../image/my_y_xongkhoi.jpg" },
  { id: 36, name: "Mì Ý Sốt Cà", category: "Mì Ý", price: 72000, img: "../image/my_y_sotca.jpg" },
  { id: 37, name: "Mì Ý Tôm", category: "Mì Ý", price: 77000, img: "../image/my_y_tom.jpg" },
  { id: 38, name: "Mì Ý Chay", category: "Mì Ý", price: 68000, img: "../image/my_y_chay.jpg" },
  { id: 39, name: "Mì Ý Sốt Trắng", category: "Mì Ý", price: 74000, img: "../image/my_y_trang.jpg" },
  { id: 40, name: "Mì Ý Sốt Kem Tôm", category: "Mì Ý", price: 78000, img: "../image/my_y_kemtom.jpg" },
  { id: 41, name: "Mì Ý Bò Phô Mai", category: "Mì Ý", price: 79000, img: "../image/my_y_bophomai.jpg" },
  { id: 42, name: "Mì Ý Gà Phô Mai", category: "Mì Ý", price: 80000, img: "../image/my_y_gapho.jpg" },
  { id: 43, name: "Mì Ý Mai Cua", category: "Mì Ý", price: 60000, img: "../image/my_y_maicua.jpg" },
  { id: 44, name: "Mì Ý Sốt Gạch Cua", category: "Mì Ý", price: 80000, img: "../image/my_y_sotgachcua.jpg" },
  { id: 45, name: "Mì Ý Gà Phô Mai Đút Lò", category: "Mì Ý", price: 80000, img: "../image/my_y_gaphomaidutlo.jpg" },


  // --- PIZZA ---
  { id: 46, name: "Pizza Hải Sản", category: "PIZZA", price: 89000, img: "../image/pizza_hai_san.jpg" },
  { id: 47, name: "Pizza Bò Phô Mai", category: "PIZZA", price: 95000, img: "../image/pizza_bo.jpg" },
  { id: 48, name: "Pizza Gà Nướng", category: "PIZZA", price: 92000, img: "../image/pizza_ganuong.jpg" },
  { id: 49, name: "Pizza Thập Cẩm", category: "PIZZA", price: 97000, img: "../image/pizza_thapcam.jpg" },
  { id: 50, name: "Pizza Xúc Xích", category: "PIZZA", price: 91000, img: "../image/pizza_xucxich.jpg" },
  { id: 51, name: "Pizza Phô Mai", category: "PIZZA", price: 90000, img: "../image/pizza_phomai.jpg" },
  { id: 52, name: "Pizza Trứng Muối", category: "PIZZA", price: 96000, img: "../image/pizza_trungmuoi.jpg" },
  { id: 53, name: "Pizza Tôm Mực", category: "PIZZA", price: 97000, img: "../image/pizza_tommuc.jpg" },
  { id: 54, name: "Pizza Bò Cay", category: "PIZZA", price: 98000, img: "../image/pizza_bocay.jpg" },
  { id: 55, name: "Pizza Rau Củ", category: "PIZZA", price: 87000, img: "../image/pizza_raucu.jpg" },
  { id: 56, name: "Pizza Chay", category: "PIZZA", price: 86000, img: "../image/pizza_chay.jpg" },
  { id: 57, name: "Pizza Gà Phô Mai", category: "PIZZA", price: 94000, img: "../image/pizza_gapho.jpg" },
  { id: 58, name: "Pizza Gà Phô Mai Cay", category: "PIZZA", price: 94000, img: "../image/pizza_gaphocay.jpg" },
  { id: 59, name: "Pizza Gà Phô Mai Đút Lò", category: "PIZZA", price: 94000, img: "../image/pizza_gaphodutlo.jpg" },
  { id: 60, name: "Pizza Gà Phô Mai BBQ", category: "PIZZA", price: 94000, img: "../image/pizza_gaphomaibbq.jpg" },
];


let currentCategory = "Gà Rán";

const listContainer = document.getElementById("productList");
const categoryBtns = document.querySelectorAll(".list-product");

let categoryPage = {};
const itemsPerPage = 10;

// === LOGIC MODAL & GIỎ HÀNG (VARIABLES) ===
const modal = document.getElementById("orderModal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalQty = document.getElementById("modalQty");
const modalTotal = document.getElementById("modalTotal");
const closeModal = document.getElementById("closeModal");
const addToCart = document.getElementById("addToCart");
const minusQty = document.getElementById("minusQty");
const plusQty = document.getElementById("plusQty");

let selectedProduct = null;
let basePrice = 0;

// === HÀM VẼ SẢN PHẨM ===
function renderProducts() {
  const filtered = products.filter(p => p.category === currentCategory);
  if (!categoryPage[currentCategory]) categoryPage[currentCategory] = 1;

  const currentPage = categoryPage[currentCategory];
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginated = filtered.slice(start, end);

  const listContainer = document.getElementById("productList");
  listContainer.innerHTML = paginated.map(p => `
    <div class="production-item" 
         data-name="${p.name}" 
         data-price="${p.price}" 
         data-img="${p.img}">
      <img src="${p.img}" alt="${p.name}">
      <p>${p.name}</p>
      <hr>
      <span>${p.price.toLocaleString()}₫</span>
      <div class="cart-btn" data-name="${p.name}">
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
    </div>
  `).join("");

  renderPagination(totalPages);
  // Cần gán lại event listeners sau khi render
  attachProductEvents(); 
}

// === HÀM VẼ PHÂN TRANG ===
function renderPagination(totalPages) {
  const container = document.getElementById("pageNumbers");
  if (!container) return;

  container.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "page-btn" + (i === categoryPage[currentCategory] ? " active" : "");
    btn.addEventListener("click", () => {
      categoryPage[currentCategory] = i;
      renderProducts();
    });
    container.appendChild(btn);
  }
}

// === GÁN EVENT CHO NÚT CATEGORY ===
categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.textContent.trim();
    renderProducts();
  });
});

categoryBtns[0].classList.add("active");
renderProducts();

// === HÀM LỌC SẢN PHẨM (Không đổi) ===
window.filterProducts = function (keyword, categoryFilter, maxPrice) {
  const filtered = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(keyword.toLowerCase());
    const matchCategory = categoryFilter
      ? p.category.toLowerCase() === categoryFilter.toLowerCase()
      : true;
    const matchPrice = p.price <= maxPrice;
    return matchName && matchCategory && matchPrice;
  });

  const listContainer = document.getElementById("productList");
  const paginationContainer = document.getElementById("pageNumbers");
  const itemsPerPage = 10;
  let currentPage = 1;

  if (filtered.length === 0) {
    listContainer.innerHTML =
      "<p style='color:white;text-align:center;'>Không tìm thấy món phù hợp.</p>";
    paginationContainer.innerHTML = "";
    return;
  }

  function renderFilteredPage(page) {
    currentPage = page;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = filtered.slice(start, end);

    listContainer.innerHTML = paginated
      .map(
        (p) => `
        <div class="production-item" 
             data-name="${p.name}" 
             data-price="${p.price}" 
             data-img="${p.img}">
          <img src="${p.img}" alt="${p.name}">
          <p>${p.name}</p>
          <hr>
          <span>${p.price.toLocaleString()}₫</span>
          <div class="cart-btn" data-name="${p.name}">
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
        </div>`
      )
      .join("");
    
    // Gán lại event listeners sau khi lọc
    attachProductEvents(); 

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = "page-btn" + (i === currentPage ? " active" : "");
      btn.addEventListener("click", () => renderFilteredPage(i));
      paginationContainer.appendChild(btn);
    }
  }

  renderFilteredPage(1);
  if (!keyword && !categoryFilter && maxPrice === 100000) {
    renderProducts();
  }
};

// === LOGIC MŨI TÊN CHUYỂN CATEGORY (Không đổi) ===
const leftArrow = document.querySelector(".category-prev");
const rightArrow = document.querySelector(".category-next");

let currentIndex = 0; 

function updateCategory(index) {
  categoryBtns.forEach(b => b.classList.remove("active"));
  categoryBtns[index].classList.add("active");
  currentCategory = categoryBtns[index].textContent.trim();
  if (!categoryPage[currentCategory]) categoryPage[currentCategory] = 1;
  renderProducts();
  
}
leftArrow.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + categoryBtns.length) % categoryBtns.length;
  updateCategory(currentIndex);
});

rightArrow.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % categoryBtns.length;
  updateCategory(currentIndex);
});

categoryBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    currentIndex = idx;
    updateCategory(idx);
  });
});


// === HÀM THÊM VÀO GIỎ (Dùng chung cho cả modal và click nhanh) ===
function addItemToCart(product, quantity) {
  if (!product || !product.name) {
      alert("Lỗi: Không tìm thấy thông tin sản phẩm.");
      return;
  }
    
  const qty = parseInt(quantity, 10);
  const price = product.price;
  const total = qty * price;

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  // SỬ DỤNG TENDANGNHAP ĐỂ TẠO KEY GIỎ HÀNG (ĐỒNG BỘ VỚI menu.js)
  const cartKey = `cartItems_${currentUser.tendangnhap || "guest"}`;

  // Kiểm tra đăng nhập
  if (!currentUser.tendangnhap) {
      alert("Vui lòng đăng nhập để thêm món vào giỏ hàng!");
      return;
  }


  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.qty += qty;
    existing.total = existing.qty * price;
  } else {
    cart.push({
      name: product.name,
      price,
      qty,
      total,
      img: product.img
    });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert(`Đã thêm ${qty} phần ${product.name} vào giỏ!`);
  
  // Gọi hàm renderCartUI từ menu.js (đảm bảo menu.js được load)
  if (typeof window.renderCartUI === 'function') {
      window.renderCartUI();
  }
}

// === HÀM GẮN SỰ KIỆN CHO MÓN ĂN (SỬA LỖI NHÂN ĐÔI TRÊN MENU) ===
function attachProductEvents() {
    const items = document.querySelectorAll(".production-item");
    
    items.forEach(oldItem => {
        // ✅ Kỹ thuật: Thay thế node cũ bằng node mới để xóa mọi Event Listener cũ
        const newItem = oldItem.cloneNode(true);
        if (oldItem.parentNode) {
            oldItem.parentNode.replaceChild(newItem, oldItem);
        } else {
            return;
        }
        
        const name = newItem.dataset.name;
        const price = parseInt(newItem.dataset.price);
        const img = newItem.dataset.img;
        const product = { name, price, img };

        // 1. EVENT CLICK VÀO CẢ MÓN ĂN (TRỪ NÚT GIỎ HÀNG) -> MỞ MODAL
        newItem.addEventListener('click', (e) => {
            // Ngăn sự kiện lan truyền nếu click vào nút giỏ hàng con
            if (e.target.closest('.cart-btn')) {
                return;
            }
            
            // ✅ FIX: Gán giá trị ngay khi modal mở (LỖI 0 VND)
            basePrice = price;
            selectedProduct = product;

            modalImg.src = img;
            modalName.textContent = name;
            modalPrice.textContent = `${basePrice.toLocaleString()} VND`;
            modalQty.value = 1;
            updateTotal(); // Tính toán lại tổng tiền ban đầu
            modal.style.display = "flex";
        });
        
        // 2. EVENT CLICK VÀO NÚT GIỎ HÀNG -> THÊM NHANH 1 MÓN
        const cartBtn = newItem.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Quan trọng: Ngăn không cho mở modal
                addItemToCart(product, 1);
            });
        }
    });
}


// === HÀM TÍNH TỔNG TRONG MODAL ===
function updateTotal() {
  // ✅ FIX: Kiểm tra basePrice có giá trị trước khi tính
  if (basePrice <= 0) {
      modalTotal.textContent = `0 VND`;
      return;
  }
    
  const total = basePrice * parseInt(modalQty.value);
  modalTotal.textContent = `${total.toLocaleString()} VND`;
}

// === KHỐI GẮN SỰ KIỆN CỐ ĐỊNH CHỈ CHẠY MỘT LẦN (FIX LỖI NHÂN ĐÔI MODAL) ===
document.addEventListener("DOMContentLoaded", () => {
    // Đảm bảo nút điều khiển số lượng được gắn một lần duy nhất
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    minusQty.addEventListener("click", () => {
      if (modalQty.value > 1) modalQty.value--;
      updateTotal();
    });

    plusQty.addEventListener("click", () => {
      modalQty.value = parseInt(modalQty.value) + 1; // Đảm bảo luôn tăng
      updateTotal();
    });

    modalQty.addEventListener("input", updateTotal);

    // === NÚT THÊM VÀO GIỎ TRONG MODAL (FIX LỖI NHÂN ĐÔI) ===
    // Logic này chỉ được chạy 1 lần nhờ nằm trong DOMContentLoaded
    addToCart.addEventListener("click", () => {
      const qty = parseInt(modalQty.value, 10);
      
      if (!selectedProduct) {
          alert("Vui lòng chọn món trước!");
          return;
      }

      // Kiểm tra đăng nhập lại trước khi thêm từ modal (đề phòng)
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      if (!currentUser.tendangnhap) {
          alert("Vui lòng đăng nhập để thêm món vào giỏ hàng!");
          return;
      }
      
      addItemToCart(selectedProduct, qty);
      modal.style.display = "none";
    });
});