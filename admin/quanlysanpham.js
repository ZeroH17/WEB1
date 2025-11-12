 let products = [];

    async function loadData() {
      const res = await fetch('../data/products.json');
      products = await res.json();
      renderTon(products);
    }

   function renderTon(data) {
  const tbody = document.querySelector("#tableTon tbody");
  tbody.innerHTML = "";
  const grouped = {};

  data.forEach(p => {
    if (!grouped[p.ten]) grouped[p.ten] = { ten: p.ten, loai: p.loai, gia: p.gia, nhap: 0, xuat: 0 };
    grouped[p.ten].nhap += p.nhap;
    grouped[p.ten].xuat += p.xuat;
  });

  Object.values(grouped).forEach(p => {
    const ton = Math.max(0, p.nhap - p.xuat); 
    const trangthai = ton <= 10 
      ? `<span class='alert'>Sắp hết</span>` 
      : `<span class='alert ok'>Đủ hàng</span>`;

    tbody.innerHTML += `
      <tr>
        <td>${p.ten}</td>
        <td>${p.loai}</td>
        <td>${p.gia.toLocaleString()}đ</td>
        <td>${ton}</td>
        <td>${trangthai}</td>
      </tr>`;
  });
}


    function filterByDate() {
    const date = document.getElementById("specificDate").value;
    const category = document.getElementById("category").value;
    const foodName = document.getElementById("foodNameTon").value;
    
    let filtered = products;
    let startDate = null;
    
    // 1. TÍNH TOÁN NGÀY BẮT ĐẦU KỲ (Đầu tháng của ngày được chọn)
    if (date) {
        // Lấy ngày được chọn: "yyyy-mm-dd"
        const [year, month] = date.split('-');
        
        // Thiết lập ngày bắt đầu là ngày 1 của tháng đó: "yyyy-mm-01"
        startDate = `${year}-${month}-01`;
    }
    
    // 2. LỌC TÍCH LŨY TRONG KỲ (Từ đầu tháng đến ngày được chọn)
    if (startDate) {
        filtered = filtered.filter(p => p.ngay >= startDate && p.ngay <= date);
    }

    // 3. Lọc theo Loại sản phẩm
    if (category) {
        filtered = filtered.filter(p => p.loai === category);
    }

    // 4. Lọc theo Tên món
    if (foodName) {
        filtered = filtered.filter(p => p.ten === foodName);
    }

    renderTon(filtered);
}

    function filterByRange() {
      const food = document.getElementById("foodSelect").value;
      const from = document.getElementById("fromDate").value;
      const to = document.getElementById("toDate").value;

      let filtered = products.filter(p =>
        (!food || p.ten === food) &&
        (!from || p.ngay >= from) &&
        (!to || p.ngay <= to)
      );

      renderHistory(filtered);
    }

    function renderHistory(data) {
      const tbody = document.querySelector("#tableHistory tbody");
      tbody.innerHTML = "";

      const grouped = {};
      data.forEach(p => {
        if (!grouped[p.ten]) grouped[p.ten] = { ten: p.ten, nhap: 0, xuat: 0 };
        grouped[p.ten].nhap += p.nhap;
        grouped[p.ten].xuat += p.xuat;
      });

      Object.values(grouped).forEach(p => {
        const ton = p.nhap - p.xuat;
        tbody.innerHTML += `
          <tr>
            <td>${p.ten}</td>
            <td>${p.nhap}</td>
            <td>${p.xuat}</td>
            <td>${ton}</td>
          </tr>`;
      });
    }

function populateFilters() {
    // 1. Lấy tham chiếu đến các thẻ SELECT
    const categorySelect = document.getElementById("category");
    const foodSelectTon = document.getElementById("foodNameTon"); 
    
    // --- THÊM: Lựa chọn mặc định cho Loại sản phẩm (Category) ---
    const defaultOptionCat = document.createElement('option');
    defaultOptionCat.value = ""; // Giá trị rỗng
    defaultOptionCat.textContent = "Chọn danh mục món ăn";
    categorySelect.appendChild(defaultOptionCat);
    // -------------------------------------------------------------

    // --- Lấy và Điền Dữ liệu Tên Món (foodNameTon) ---
    const uniqueFoods = [...new Set(products.map(p => p.ten))].sort();
    
    uniqueFoods.forEach(food => {
        const optionTon = document.createElement('option');
        optionTon.value = food;
        optionTon.textContent = food;
        foodSelectTon.appendChild(optionTon);
    });

    // --- Lấy và Điền Dữ liệu Loại Sản phẩm (categorySelect) ---
    const uniqueCategories = [...new Set(products.map(p => p.loai))].sort();
    
    uniqueCategories.forEach(category => {
        const optionCat = document.createElement('option');
        optionCat.value = category;
        optionCat.textContent = category;
        categorySelect.appendChild(optionCat);
    });
}


// Sửa lại loadData để gọi populateFilters
async function loadData() {
    const res = await fetch('../data/products.json');
    products = await res.json();
    
    renderTon(products);
    populateFilters(); // 
}
 
function filterByDate() {
    const date = document.getElementById("specificDate").value;
    const category = document.getElementById("category").value;
    const foodName = document.getElementById("foodNameTon").value; // <--- LẤY TÊN MÓN
    
    let filtered = products;

    // 1. Lọc tích lũy theo ngày
    if (date) {
        filtered = filtered.filter(p => p.ngay <= date);
    }
    
    // 2. Lọc theo Loại sản phẩm
    if (category) {
        filtered = filtered.filter(p => p.loai === category);
    }

    // 3. Lọc theo Tên món (nếu có)
    if (foodName) {
        filtered = filtered.filter(p => p.ten === foodName);
    }

    renderTon(filtered);
}

    loadData();