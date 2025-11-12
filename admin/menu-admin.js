
 // ========================= MENU ADMIN =========================
document.addEventListener('DOMContentLoaded', function () {
  // ================== DỮ LIỆU MÓN ĂN HOÀN CHỈNH (CÓ CODE, MÔ TẢ VÀ isVisible) ==================
const defaultData = {
  "Gà giòn": [
    { id: 1, name: "Gà Rán Truyền Thống", code: "GRT-01", description: "Gà rán giòn rụm với công thức truyền thống.", price: 45000, img: "../image/ga1.png", isVisible: true },
    { id: 2, name: "Gà Rán Cay", code: "GRT-02", description: "Gà rán với sốt cay đậm đà, thách thức vị giác.", price: 48000, img: "../image/ga2.png", isVisible: true },
    { id: 3, name: "Gà Rán Giòn", code: "GRT-03", description: "Lớp vỏ siêu giòn, thịt gà mềm ngọt.", price: 47000, img: "../image/ga3.png", isVisible: true },
    { id: 4, name: "Gà Rán Mật Ong", code: "GRT-04", description: "Gà phủ lớp mật ong ngọt ngào, thơm lừng.", price: 49000, img: "../image/ga4.png", isVisible: true },
    { id: 5, name: "Gà Rán Tỏi", code: "GRT-05", description: "Vị tỏi thơm phức, hấp dẫn.", price: 50000, img: "../image/ga5.png", isVisible: true },
    { id: 6, name: "Gà Rán Sốt BBQ", code: "GRT-06", description: "Sốt BBQ đậm chất Mỹ, khó cưỡng.", price: 52000, img: "../image/ga6.png", isVisible: true },
    { id: 7, name: "Gà Rán Cay Hàn", code: "GRT-07", description: "Cay nhẹ kiểu Hàn Quốc, ăn kèm cơm rất hợp.", price: 53000, img: "../image/ga7.png", isVisible: true },
    { id: 8, name: "Gà Rán Tứ Xuyên", code: "GRT-08", description: "Vị cay nồng đặc trưng của Tứ Xuyên.", price: 54000, img: "../image/ga8.png", isVisible: true },
    { id: 9, name: "Gà Rán Mù Tạt", code: "GRT-09", description: "Mù tạt cay nhẹ, kích thích vị giác.", price: 55000, img: "../image/ga9.png", isVisible: true },
    { id: 10, name: "Gà Rán Chanh", code: "GRT-10", description: "Chua nhẹ, thanh mát, hợp khẩu vị nhiều người.", price: 56000, img: "../image/ga10.png", isVisible: true },
    { id: 11, name: "Gà Rán Phô Mai", code: "GRT-11", description: "Phủ bột phô mai béo ngậy.", price: 57000, img: "../image/ga11.png", isVisible: true },
    { id: 12, name: "Gà Rán Sốt Cay", code: "GRT-12", description: "Cay nồng, dành cho người thích ăn cay.", price: 58000, img: "../image/ga12.png", isVisible: true },
    { id: 13, name: "Gà Rán Cajun", code: "GRT-13", description: "Hương vị Cajun độc đáo, khó quên.", price: 60000, img: "../image/ga13.png", isVisible: true },
    { id: 14, name: "Gà Rán Mắm", code: "GRT-14", description: "Vị mặn ngọt của nước mắm truyền thống.", price: 50000, img: "../image/ga14.png", isVisible: true },
    { id: 15, name: "Gà Rán Ngũ Vị", code: "GRT-15", description: "Hương vị ngũ vị hương đậm đà.", price: 58000, img: "../image/ga15.png", isVisible: true },
  ],
  "Gà phô mai": [
    { id: 16, name: "Gà Phô Mai Tan Chảy", code: "GPM-01", description: "Phô mai tan chảy béo ngậy.", price: 55000, img: "../image/ga_phomai_tanchay.jpg", isVisible: true },
    { id: 17, name: "Gà Phô Mai BBQ", code: "GPM-02", description: "Phô mai kết hợp sốt BBQ.", price: 56000, img: "../image/ga_phomai_bbq.jpg", isVisible: true },
    { id: 18, name: "Gà Phô Mai Cay", code: "GPM-03", description: "Phô mai và vị cay nồng.", price: 57000, img: "../image/ga_phomai_cay.jpg", isVisible: true },
    { id: 19, name: "Gà Phô Mai Hàn Quốc", code: "GPM-04", description: "Phô mai Hàn Quốc chuẩn vị.", price: 58000, img: "../image/ga_phomai_hanquoc.jpg", isVisible: true },
    { id: 20, name: "Gà Phô Mai Trứng Muối", code: "GPM-05", description: "Trứng muối béo bùi, độc đáo.", price: 59000, img: "../image/ga_phomai_trungmuoi.jpg", isVisible: true },
    { id: 21, name: "Gà Phô Mai Mật Ong", code: "GPM-06", description: "Phô mai và mật ong thơm ngọt.", price: 60000, img: "../image/ga_phomai_matong.jpg", isVisible: true },
    { id: 22, name: "Gà Phô Mai Giòn", code: "GPM-07", description: "Lớp phô mai giòn tan.", price: 61000, img: "../image/ga_phomai_gion.jpg", isVisible: true },
    { id: 23, name: "Gà Phô Mai Bơ Tỏi", code: "GPM-08", description: "Bơ tỏi thơm lừng, cuốn hút.", price: 62000, img: "../image/ga_phomai_botoi.jpg", isVisible: true },
    { id: 24, name: "Gà Phô Mai Tỏi Ớt", code: "GPM-09", description: "Vị tỏi ớt cay nhẹ, kích thích.", price: 63000, img: "../image/ga_phomai_toiot.jpg", isVisible: true },
    { id: 25, name: "Gà Phô Mai Cay Nồng", code: "GPM-10", description: "Vị cay nồng, đậm đà.", price: 64000, img: "../image/ga_phomai_caynong.jpg", isVisible: true },
    { id: 26, name: "Gà Phô Mai Xông Khói", code: "GPM-11", description: "Vị xông khói độc đáo.", price: 65000, img: "../image/ga_phomai_xongkhoi.jpg", isVisible: true },
    { id: 27, name: "Gà Phô Mai Tiêu Đen", code: "GPM-12", description: "Tiêu đen thơm cay.", price: 66000, img: "../image/ga_phomai_tieuden.jpg", isVisible: true },
    { id: 28, name: "Gà Phô Mai Thảo Mộc", code: "GPM-13", description: "Hương vị thảo mộc tự nhiên.", price: 66000, img: "../image/ga_phomai_thaomoc.jpg", isVisible: true },
    { id: 29, name: "Gà Phô Mai Cajun", code: "GPM-14", description: "Gia vị Cajun cay nồng.", price: 69000, img: "../image/ga_phomai_cajun.jpg", isVisible: true },
    { id: 30, name: "Gà Phô Mai Đút Lò", code: "GPM-15", description: "Gà đút lò, phô mai tan chảy.", price: 66000, img: "../image/ga_phomai_dutlo.jpg", isVisible: true },
  ],
  
  "Mỳ ý": [
    { id: 31, name: "Mì Ý Sốt Bò Bằm", code: "MY-01", description: "Mì Ý Sốt Bò Bằm", price: 70000, img: "../image/my_y_bo.jpg", isVisible: true },
    { id: 32, name: "Mì Ý Sốt Kem Nấm", code: "MY-02", description: "Mì Ý Sốt Kem Nấm", price: 72000, img: "../image/my_y_kemnam.jpg", isVisible: true },
    { id: 33, name: "Mì Ý Hải Sản", code: "MY-03", description: "Mì Ý Hải Sản", price: 75000, img: "../image/my_y_haisan.jpg", isVisible: true },
    { id: 34, name: "Mì Ý Gà Nướng", code: "MY-04", description: "Mì Ý Gà Nướng", price: 73000, img: "../image/my_y_ganuong.jpg", isVisible: true },
    { id: 35, name: "Mì Ý Thịt Xông Khói", code: "MY-05", description: "Mì Ý Thịt Xông Khói", price: 76000, img: "../image/my_y_xongkhoi.jpg", isVisible: true },
    { id: 36, name: "Mì Ý Sốt Cà", code: "MY-06", description: "Mì Ý Sốt Cà", price: 72000, img: "../image/my_y_sotca.jpg", isVisible: true },
    { id: 37, name: "Mì Ý Tôm", code: "MY-07", description: "Mì Ý Tôm", price: 77000, img: "../image/my_y_tom.jpg", isVisible: true },
    { id: 38, name: "Mì Ý Chay", code: "MY-08", description: "Mì Ý Chay", price: 68000, img: "../image/my_y_chay.jpg", isVisible: true },
    { id: 39, name: "Mì Ý Sốt Trắng", code: "MY-09", description: "Mì Ý Sốt Trắng", price: 74000, img: "../image/my_y_trang.jpg", isVisible: true },
    { id: 40, name: "Mì Ý Sốt Kem Tôm", code: "MY-10", description: "Mì Ý Sốt Kem Tôm", price: 78000, img: "../image/my_y_kemtom.jpg", isVisible: true },
    { id: 41, name: "Mì Ý Bò Phô Mai", code: "MY-11", description: "Mì Ý Bò Phô Mai", price: 79000, img: "../image/my_y_bophomai.jpg", isVisible: true },
    { id: 42, name: "Mì Ý Gà Phô Mai", code: "MY-12", description: "Mì Ý Gà Phô Mai", price: 80000, img: "../image/my_y_gapho.jpg", isVisible: true },
    { id: 43, name: "Mì Ý Mai Cua", code: "MY-13", description: "Mì Ý Mai Cua", price: 60000, img: "../image/my_y_maicua.jpg", isVisible: true },
    { id: 44, name: "Mì Ý Sốt Gạch Cua", code: "MY-14", description: "Mì Ý Sốt Gạch Cua", price: 80000, img: "../image/my_y_sotgachcua.jpg", isVisible: true },
    { id: 45, name: "Mì Ý Gà Phô Mai Đút Lò", code: "MY-15", description: "Mì Ý Gà Phô Mai Đút Lò", price: 80000, img: "../image/my_y_gaphomaidutlo.jpg", isVisible: true },
  ],
  "Pizza": [
    { id: 46, name: "Pizza Hải Sản", code: "PZ-01", description: "Pizza Hải Sản", price: 89000, img: "../image/pizza_hai_san.jpg", isVisible: true },
    { id: 47, name: "Pizza Bò Phô Mai", code: "PZ-02", description: "Pizza Bò Phô Mai", price: 95000, img: "../image/pizza_bo.jpg", isVisible: true },
    { id: 48, name: "Pizza Gà Nướng", code: "PZ-03", description: "Pizza Gà Nướng", price: 92000, img: "../image/pizza_ganuong.jpg", isVisible: true },
    { id: 49, name: "Pizza Thập Cẩm", code: "PZ-04", description: "Pizza Thập Cẩm", price: 97000, img: "../image/pizza_thapcam.jpg", isVisible: true },
    { id: 50, name: "Pizza Xúc Xích", code: "PZ-05", description: "Pizza Xúc Xích", price: 91000, img: "../image/pizza_xucxich.jpg", isVisible: true },
    { id: 51, name: "Pizza Phô Mai", code: "PZ-06", description: "Pizza Phô Mai", price: 90000, img: "../image/pizza_phomai.jpg", isVisible: true },
    { id: 52, name: "Pizza Trứng Muối", code: "PZ-07", description: "Pizza Trứng Muối", price: 96000, img: "../image/pizza_trungmuoi.jpg", isVisible: true },
    { id: 53, name: "Pizza Tôm Mực", code: "PZ-08", description: "Pizza Tôm Mực", price: 97000, img: "../image/pizza_tommuc.jpg", isVisible: true },
    { id: 54, name: "Pizza Bò Cay", code: "PZ-09", description: "Pizza Bò Cay", price: 98000, img: "../image/pizza_bocay.jpg", isVisible: true },
    { id: 55, name: "Pizza Rau Củ", code: "PZ-10", description: "Pizza Rau Củ", price: 87000, img: "../image/pizza_raucu.jpg", isVisible: true },
    { id: 56, name: "Pizza Chay", code: "PZ-11", description: "Pizza Chay", price: 86000, img: "../image/pizza_chay.jpg", isVisible: true },
    { id: 57, name: "Pizza Gà Phô Mai", code: "PZ-12", description: "Pizza Gà Phô Mai", price: 94000, img: "../image/pizza_gapho.jpg", isVisible: true },
    { id: 58, name: "Pizza Gà Phô Mai Cay", code: "PZ-13", description: "Pizza Gà Phô Mai Cay", price: 94000, img: "../image/pizza_gaphocay.jpg", isVisible: true },
    { id: 59, name: "Pizza Gà Phô Mai Đút Lò", code: "PZ-14", description: "Pizza Gà Phô Mai Đút Lò", price: 94000, img: "../image/pizza_gaphodutlo.jpg", isVisible: true },
    { id: 60, name: "Pizza Gà Phô Mai BBQ", code: "PZ-15", description: "Pizza Gà Phô Mai BBQ", price: 94000, img: "../image/pizza_gaphomaibbq.jpg", isVisible: true },
  ],
 
};


  let foodData = JSON.parse(localStorage.getItem('foodData')) || defaultData;
  const categoriesContainer = document.querySelector('.categories');
  const grid = document.querySelector('.menu-grid');
  const menuTitle = document.querySelector('.menu h2');
  
  // KHAI BÁO CÁC BIẾN MODAL THÊM MÓN ĂN (FOOD MODAL)
  const foodModal = document.getElementById('foodModal'); 
  const closeModal = document.querySelector('#foodModal .close'); 
  const saveBtn = document.getElementById('saveBtn');
  const imgPreview = document.getElementById('imgPreview');

  // KHAI BÁO CÁC BIẾN MODAL LOẠI SẢN PHẨM (CATEGORY MODAL)
  const categoryModal = document.getElementById('categoryModal');
  const closeCategoryModal = document.getElementById('closeCategoryModal');
  const saveCategoryBtn = document.getElementById('saveCategoryBtn');
  const categoryNameInput = document.getElementById('categoryNameInput');
  const categoryModalTitle = document.getElementById('categoryModalTitle');
  const addCategoryBtn = document.getElementById('addCategoryBtn');

  // KHAI BÁO CÁC TRƯỜNG INPUT MỚI
  const foodModalTitle = document.getElementById('foodModalTitle');
  const foodCodeInput = document.getElementById('foodCode');
  const foodNameInput = document.getElementById('foodName');
  const foodDescriptionInput = document.getElementById('foodDescription');
  const foodPriceInput = document.getElementById('foodPrice');


  let currentCategory = 'Gà giòn';
  let selectedImg = '';
  let editingCategoryName = null;
  let editingFoodIndex = -1; // -1: Thêm mới, >= 0: Index của món đang sửa


  // ====== HÀM VẼ DANH MỤC (RENDER CATEGORIES) ======
  function renderCategories() {
    const leftBtn = categoriesContainer.querySelector('.nav-btn.left');
    const rightBtn = categoriesContainer.querySelector('.nav-btn.right');
    const addBtn = categoriesContainer.querySelector('.category-add');

    categoriesContainer.querySelectorAll('.category-wrapper').forEach(el => el.remove());
    
    const categoryNames = Object.keys(foodData);

    categoryNames.forEach((name, index) => {
        // Kiểm tra xem danh mục có thuộc tính isVisible không. Nếu không, đặt mặc định là true.
        if (typeof foodData[name].isVisible === 'undefined') {
            foodData[name].isVisible = true; 
        }
        
        const wrapper = document.createElement('div');
        wrapper.classList.add('category-wrapper');

        const div = document.createElement('div');
        div.classList.add('category');
        div.dataset.name = name;
        div.textContent = name;
        
        // Thêm class 'hidden-category' nếu danh mục bị ẩn
        if (!foodData[name].isVisible) {
            div.classList.add('hidden-category');
        }

        if (name === currentCategory) {
            div.classList.add('active');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-category-btn');
        deleteBtn.textContent = 'x';
        deleteBtn.onclick = (e) => {
            e.stopPropagation(); 
            deleteCategory(name);
        };
        
        // NÚT ẨN/HIỆN (MẮT)
        const visibilityBtn = document.createElement('button');
        visibilityBtn.classList.add('toggle-visibility-btn');
        visibilityBtn.innerHTML = foodData[name].isVisible ? '<i class="fa fa-eye"></i>' : '<i class="fa fa-eye-slash"></i>';
        visibilityBtn.onclick = (e) => {
             e.stopPropagation();
             toggleCategoryVisibility(name);
        };

        wrapper.appendChild(div);
        wrapper.appendChild(deleteBtn);
        wrapper.appendChild(visibilityBtn); // Thêm nút ẩn/hiện
        
        categoriesContainer.insertBefore(wrapper, addBtn);
        
        div.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.detail === 1) { 
                switchCategory(name);
            }
        });
        
        div.addEventListener('dblclick', () => {
             openCategoryModal(name);
        });
    });

    menuTitle.textContent = currentCategory;
  }

  // ====== HÀM XỬ LÝ CHUYỂN CATEGORY VÀ RENDER MENU ======
  function switchCategory(categoryName) {
    document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
    document.querySelector(`.category[data-name="${categoryName}"]`)?.classList.add('active');
    currentCategory = categoryName;
    menuTitle.textContent = currentCategory;
    renderMenu(currentCategory);
  }

  // ====== HÀM XÓA LOẠI SẢN PHẨM ======
  function deleteCategory(categoryName) {
    if (Object.keys(foodData).length <= 1) {
        alert("Không thể xóa loại sản phẩm cuối cùng!");
        return;
    }
    
    if (confirm(`Bạn có chắc chắn muốn xóa loại [${categoryName}] và TẤT CẢ món ăn trong đó không?`)) {
        delete foodData[categoryName];
        localStorage.setItem('foodData', JSON.stringify(foodData));
        
        currentCategory = Object.keys(foodData)[0];
        renderCategories();
        renderMenu(currentCategory);
    }
  }
  
  // ====== HÀM ẨN/HIỆN LOẠI SẢN PHẨM ======
  function toggleCategoryVisibility(categoryName) {
      // Đảm bảo thuộc tính tồn tại
      if (typeof foodData[categoryName].isVisible === 'undefined') {
          foodData[categoryName].isVisible = true; 
      }
      
      // Đảo ngược trạng thái
      foodData[categoryName].isVisible = !foodData[categoryName].isVisible;
      localStorage.setItem('foodData', JSON.stringify(foodData));
      
      // Render lại
      renderCategories();
  }

  // ====== HÀM MỞ MODAL SỬA/THÊM LOẠI ======
  function openCategoryModal(nameToEdit = null) {
    categoryModal.style.display = 'flex';
    if (nameToEdit) {
        categoryModalTitle.textContent = 'Sửa Tên Loại Sản phẩm';
        categoryNameInput.value = nameToEdit;
        editingCategoryName = nameToEdit;
    } else {
        categoryModalTitle.textContent = 'Thêm Loại Sản phẩm Mới';
        categoryNameInput.value = '';
        editingCategoryName = null;
    }
  }

  // ====== HÀM LƯU LOẠI SẢN PHẨM (Thêm hoặc Sửa) ======
  function saveCategory() {
    const newName = categoryNameInput.value.trim();
    if (!newName) {
        alert("Tên loại sản phẩm không được để trống!");
        return;
    }
    
    if (editingCategoryName) {
        if (newName !== editingCategoryName) {
            if (foodData[newName]) {
                alert(`Loại sản phẩm "${newName}" đã tồn tại!`);
                return;
            }
            // Lưu trạng thái isVisible của danh mục cũ sang danh mục mới (nếu có)
            const isVisible = foodData[editingCategoryName].isVisible;
            foodData[newName] = foodData[editingCategoryName];
            foodData[newName].isVisible = isVisible; // Cập nhật isVisible
            delete foodData[editingCategoryName];
            currentCategory = newName;
        }
    } else {
        if (foodData[newName]) {
            alert(`Loại sản phẩm "${newName}" đã tồn tại!`);
            return;
        }
        // Khi thêm mới, mặc định isVisible là true
        foodData[newName] = []; 
        foodData[newName].isVisible = true; 
        currentCategory = newName;
    }
    
    localStorage.setItem('foodData', JSON.stringify(foodData));
    categoryModal.style.display = 'none';
    renderCategories();
    renderMenu(currentCategory);
  }

  // ====== GÁN SỰ KIỆN CHO MODAL CATEGORY ======
  addCategoryBtn.addEventListener('click', () => openCategoryModal(null));
  closeCategoryModal.addEventListener('click', () => categoryModal.style.display = 'none');
  saveCategoryBtn.addEventListener('click', saveCategory);

  // ====== HÀM MỞ MODAL THÊM/SỬA SẢN PHẨM ======
  function openFoodModal(itemToEdit = null, index = -1) {
      // 1. Reset form và biến trạng thái
      foodCodeInput.value = '';
      foodNameInput.value = '';
      foodDescriptionInput.value = '';
      foodPriceInput.value = '';
      imgPreview.innerHTML = `<i class="fa fa-plus"></i>`;
      selectedImg = '';
      editingFoodIndex = index;

      if (itemToEdit) {
          // Chế độ SỬA (Hiển thị đúng thông tin trước khi sửa)
          foodModalTitle.textContent = 'Sửa Thông tin Món ăn';
          
          foodCodeInput.value = itemToEdit.code || '';
          foodNameInput.value = itemToEdit.name;
          foodDescriptionInput.value = itemToEdit.description || '';
          foodPriceInput.value = itemToEdit.price.toLocaleString('vi-VN').replace('.', ''); // Bỏ dấu chấm phân cách
          
          selectedImg = itemToEdit.img;
          imgPreview.innerHTML = `<img src="${itemToEdit.img}" alt="${itemToEdit.name}">`;
      } else {
          // Chế độ THÊM MỚI
          foodModalTitle.textContent = 'Thêm Món ăn Mới';
      }
      
      foodModal.style.display = 'flex';
  }
  
  // ====== HÀM ẨN/HIỆN TỪNG MÓN ĂN ======
  function toggleFoodVisibility(categoryName, index) {
      const item = foodData[categoryName][index];
      // Đảm bảo thuộc tính tồn tại
      if (typeof item.isVisible === 'undefined') {
          item.isVisible = true; 
      }
      
      // Đảo ngược trạng thái
      item.isVisible = !item.isVisible;
      localStorage.setItem('foodData', JSON.stringify(foodData));
      
      // Render lại
      renderMenu(categoryName);
  }


  // ====== HÀM VẼ DANH SÁCH MÓN (Render Menu) ======
  function renderMenu(category) {
    grid.innerHTML = '';
    const list = foodData[category] || [];
    
    // Đặt tên tiêu đề (Gà giòn, Pizza,...)
    menuTitle.textContent = category; 
    
    // ===========================================
    // ✅ 1. CHÈN NÚT THÊM SẢN PHẨM (+) VÀO VỊ TRÍ ĐẦU TIÊN
    // ===========================================
    const addDiv = document.createElement('div');
    addDiv.className = 'item add';
    addDiv.innerHTML = `<i class="fa fa-plus"></i>`;
    addDiv.addEventListener('click', () => openFoodModal(null, -1)); // Gán sự kiện cho nút Thêm (+)
    grid.appendChild(addDiv); 
    
    // ===========================================
    // ✅ 2. CHÈN TẤT CẢ SẢN PHẨM ĐÃ CÓ SAU NÚT THÊM (+)
    // ===========================================
    if (list.length === 0) {
        // Nếu danh sách trống, chỉ có nút Thêm (+) được hiển thị
    } else {
        list.forEach((item, index) => {
            // Đảm bảo thuộc tính isVisible tồn tại
            if (typeof item.isVisible === 'undefined') {
                item.isVisible = true;
            }
            
            const div = document.createElement('div');
            div.className = 'item';
            // Thêm class 'hidden-item' nếu món ăn bị ẩn
            if (!item.isVisible) {
                div.classList.add('hidden-item');
            }
            
            const isVisibleIcon = item.isVisible ? '<i class="fa fa-eye"></i>' : '<i class="fa fa-eye-slash"></i>';

            div.innerHTML = `
                <div class="menu-card">
                    <div class="menu-img">
                        <img src="${item.img}" alt="${item.name}">
                        <button class="delete-btn" data-index="${index}">✖</button>
                        <button class="item-visibility-btn" data-index="${index}" title="Ẩn/Hiện món">${isVisibleIcon}</button>
                    </div>
                    <div class="menu-content">
                    <h3 class="menu-title">${item.name}</h3>
                    <hr class="menu-line">
                    <div class="menu-bottom">
                        <span class="menu-price">${item.price.toLocaleString('vi-VN')}₫</span>
                        <button class="cart-btn"><i class="fa fa-shopping-cart"></i></button>
                    </div>
                    </div>
                </div>`;
            
            // Chèn món ăn vào grid. Vì `addDiv` đã được chèn trước đó bằng `grid.appendChild(addDiv);`
            // nên các món ăn được chèn sau sẽ nằm ở vị trí thứ 2 trở đi.
            grid.appendChild(div); 
            
            // Gán sự kiện click để SỬA SẢN PHẨM
            div.addEventListener('click', (e) => {
                // Chỉ mở modal sửa nếu không click vào nút xóa hoặc nút ẩn/hiện
                if (!e.target.closest('.delete-btn') && !e.target.closest('.item-visibility-btn')) {
                    openFoodModal(item, index);
                }
            });
        });
    }


    // Xử lý nút XÓA
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation(); // Ngăn mở modal sửa
        const index = e.target.dataset.index;
        if (confirm('Bạn có muốn xóa món này không?')) {
          foodData[category].splice(index, 1);
          localStorage.setItem('foodData', JSON.stringify(foodData));
          renderMenu(category);
        }
      });
    });
    
    // Xử lý nút ẨN/HIỆN
    const visibilityBtns = document.querySelectorAll('.item-visibility-btn');
    visibilityBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation(); // Ngăn mở modal sửa
            // Lấy index từ data-index của button
            const index = parseInt(e.currentTarget.dataset.index); 
            toggleFoodVisibility(category, index);
        });
    });
  }

  // ====== LOGIC LƯU SẢN PHẨM (Thêm hoặc Sửa) ======
  if(saveBtn) {
      saveBtn.addEventListener('click', () => {
          const foodCode = foodCodeInput.value.trim();
          const foodName = foodNameInput.value.trim();
          const foodDescription = foodDescriptionInput.value.trim();
          const foodPrice = foodPriceInput.value.trim();

          if (!foodCode || !foodName || !foodPrice || !selectedImg) {
              alert('Vui lòng nhập đủ thông tin (Mã, Tên, Giá, Ảnh)!');
              return;
          }
          
          const priceValue = parseInt(foodPrice.replace(/[^\d]/g, ''));
          
          // Lấy trạng thái isVisible hiện tại (khi sửa) hoặc mặc định là true (khi thêm mới)
          const isVisibleStatus = editingFoodIndex === -1 ? true : foodData[currentCategory][editingFoodIndex].isVisible;

          const newItem = {
              id: editingFoodIndex === -1 ? Date.now() : foodData[currentCategory][editingFoodIndex].id,
              code: foodCode,
              name: foodName,
              description: foodDescription,
              price: priceValue,
              img: selectedImg,
              isVisible: isVisibleStatus // Giữ nguyên trạng thái cũ khi sửa, mặc định là hiện khi thêm mới
          };

          if (editingFoodIndex === -1) {
              // THÊM MỚI
              foodData[currentCategory].push(newItem);
          } else {
              // SỬA SẢN PHẨM
              foodData[currentCategory][editingFoodIndex] = newItem;
          }

          localStorage.setItem('foodData', JSON.stringify(foodData));
          foodModal.style.display = 'none';
          renderMenu(currentCategory); 
      });
  }
  
  // ====== GÁN SỰ KIỆN ĐÓNG MODAL THÊM MÓN (CLOSE BUTTON) ======
  if(closeModal) {
      closeModal.addEventListener('click', () => {
        foodModal.style.display = 'none';
      });
  }

  // ====== BẮT ĐẦU CHẠY SCRIPT ======
  renderCategories(); 
  renderMenu(currentCategory);
});