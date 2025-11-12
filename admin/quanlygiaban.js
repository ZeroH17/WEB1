let products = [];


const costData = {
    "Gà rán truyền thống": { cost: 30000, profitRate: 0.40, loai: "Gà rán" }, 
    "Gà phô mai Hàn Quốc": { cost: 45000, profitRate: 0.35, loai: "Gà phô mai" },
    "Pizza phô mai": { cost: 80000, profitRate: 0.50, loai: "Pizza" },
    "Pizza hải sản": { cost: 90000, profitRate: 0.50, loai: "Pizza" },
    "Mì Ý sốt bò": { cost: 40000, profitRate: 0.60, loai: "Mì Ý" },
    "Mì Ý kem tôm": { cost: 45000, profitRate: 0.55, loai: "Mì Ý" }
};

let currentEditingFood = ''; 
const profitModal = document.getElementById('profitModal');
const modalFoodName = document.getElementById('modalFoodName');
const newProfitRateInput = document.getElementById('newProfitRate');
const closeBtn = profitModal ? profitModal.querySelector('.close-btn') : null;



function updatePriceInLocalStorage(foodName, newSalePrice) {
    let foodData = JSON.parse(localStorage.getItem('foodData'));

    if (foodData) {
        const newPriceFormatted = newSalePrice.toLocaleString('vi-VN');
        
        for (const category in foodData) {
            const index = foodData[category].findIndex(item => item.name === foodName);
            if (index !== -1) {
                foodData[category][index].price = newPriceFormatted;
                break;
            }
        }
        localStorage.setItem('foodData', JSON.stringify(foodData));
    }
}

function renderCostTable(filterCategory = null, filterFood = null) {
    const tbody = document.querySelector("#tableCost tbody");
    tbody.innerHTML = "";
    
    const productCurrentPrice = {};
    const productCategory = {}; 
    
    products.forEach(p => {
        productCurrentPrice[p.ten] = p.gia; 
        productCategory[p.ten] = p.loai;
    });

    Object.keys(costData).forEach(foodName => {
        const data = costData[foodName];
        const productLoai = productCategory[foodName] || data.loai;
        
        // 1. LOGIC LỌC
        const matchesCategory = !filterCategory || productLoai === filterCategory;
        const matchesFood = !filterFood || foodName === filterFood;

        if (!matchesCategory || !matchesFood) {
            return; // Bỏ qua món ăn không khớp bộ lọc
        }
        
        // 2. LOGIC HIỂN THỊ
        const currentSalePriceValue = productCurrentPrice[foodName];
        let currentSalePriceDisplay = 'N/A₫';
        
        if (currentSalePriceValue !== undefined && !isNaN(parseFloat(currentSalePriceValue))) {
             currentSalePriceDisplay = parseFloat(currentSalePriceValue).toLocaleString('vi-VN') + '₫';
        }
        
        const profitRateDisplay = (data.profitRate * 100).toFixed(1);

        tbody.innerHTML += `
            <tr>
                <td>${foodName}</td>
                <td>${productLoai}</td>
                <td>${data.cost.toLocaleString('vi-VN')}₫</td>
                <td>${profitRateDisplay}%</td>
                <td>${currentSalePriceDisplay}</td>
                <td><button onclick="openProfitModal('${foodName}')">Sửa % Lợi nhuận</button></td>
            </tr>`;
    });
}

function applyFilters() {
    const filterCategory = document.getElementById("categoryFilter").value;
    const filterFood = document.getElementById("foodNameFilter").value;
    
    // Gọi renderCostTable với các tham số lọc mới
    renderCostTable(filterCategory, filterFood);
}

async function loadDataAndRender() {
    
    try {
        const res = await fetch('../data/products.json'); 
        products = await res.json();
    } catch (e) {
        console.error("Không thể tải products.json, sử dụng giá bán giả định.");
        products = [];
    }

    
    let foodDataFromLS = localStorage.getItem('foodData');

    if (foodDataFromLS) {
        const parsedFoodData = JSON.parse(foodDataFromLS);
        
        const latestPrices = {};
        for (const category in parsedFoodData) {
            parsedFoodData[category].forEach(item => {
                const priceValue = parseInt(item.price.toString().replace(/\./g, ''));
                latestPrices[item.name] = priceValue;
            });
        }
        
        products.forEach(p => {
            if (latestPrices[p.ten] !== undefined) {
                p.gia = latestPrices[p.ten];
            }
        });
    }

    renderCostTable(); 
    populateFilters();
    
   
    if (profitModal) {
        closeBtn.onclick = () => { profitModal.style.display = 'none'; };
        window.onclick = (event) => {
            if (event.target === profitModal) {
                profitModal.style.display = 'none';
            }
        };
    }
}


function openProfitModal(foodName) {
    currentEditingFood = foodName;
    modalFoodName.textContent = foodName;
    const currentRate = costData[foodName].profitRate * 100;
    newProfitRateInput.value = currentRate.toFixed(1);
    profitModal.style.display = 'flex';
}

function saveProfitRate() {
    const newRatePercent = parseFloat(newProfitRateInput.value);
    if (isNaN(newRatePercent) || newRatePercent < 0) {
        alert("Tỉ lệ không hợp lệ!");
        return;
    }
    
    const newRate = newRatePercent / 100;
    
    costData[currentEditingFood].profitRate = newRate;
    
    const currentCost = costData[currentEditingFood].cost;
    const newSalePrice = currentCost * (1 + newRate); 
    
   
    products.forEach(p => {
        if (p.ten === currentEditingFood) {
            p.gia = Math.round(newSalePrice / 1000) * 1000;
        }
    });

    updatePriceInLocalStorage(currentEditingFood, newSalePrice); 

    renderCostTable();
    profitModal.style.display = 'none';
}
function applyBatchProfit() {
    const category = document.getElementById('categorySelect').value;
    const batchRatePercent = parseFloat(document.getElementById('batchProfitRate').value);

    if (!category || category === "") {
        return alert("Vui lòng chọn một Loại Sản phẩm để áp dụng!");
    }
    if (isNaN(batchRatePercent) || batchRatePercent < 0 || batchRatePercent > 100) {
        return alert("Vui lòng nhập tỉ lệ lợi nhuận hợp lệ (0-100)!");
    }

    if (!confirm(`Bạn có chắc chắn muốn áp dụng ${batchRatePercent}% lợi nhuận cho TẤT CẢ món ăn thuộc loại [${category}] không? Thao tác này không thể hoàn tác.`)) {
        return;
    }

    const batchRate = batchRatePercent / 100;
    let itemsUpdated = 0;

    Object.keys(costData).forEach(foodName => {
        const item = costData[foodName];
        
        if (item.loai === category) {
            
            item.profitRate = batchRate;
            
            const newSalePrice = item.cost * (1 + batchRate);
            
            products.forEach(p => {
                if (p.ten === foodName) {
                    p.gia = Math.round(newSalePrice / 1000) * 1000;
                }
            });
            
            updatePriceInLocalStorage(foodName, newSalePrice);
            
            itemsUpdated++;
        }
    });

    if (itemsUpdated > 0) {
        alert(`Đã áp dụng thành công ${batchRatePercent}% lợi nhuận cho ${itemsUpdated} món ăn thuộc loại ${category}.`);
    } else {
        alert(`Không tìm thấy món ăn nào thuộc loại ${category} để cập nhật.`);
    }
    renderCostTable();
}
function populateFilters() {
    const categoryFilter = document.getElementById("categoryFilter");
    const foodNameFilter = document.getElementById("foodNameFilter"); 

    // --- Lấy tên món duy nhất ---
    const uniqueFoods = [...new Set(products.map(p => p.ten))].sort();
    uniqueFoods.forEach(food => {
        const option = document.createElement('option');
        option.value = food;
        option.textContent = food;
        foodNameFilter.appendChild(option);
    });

    // --- Lấy loại sản phẩm duy nhất ---
    const uniqueCategories = [...new Set(products.map(p => p.loai))].sort();
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}
// Gọi hàm này trong loadDataAndRender()
// THÊM DÒNG NÀY: populateFilters(); VÀO CUỐI HÀM loadDataAndRender()

loadDataAndRender();