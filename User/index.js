// ✅ Lấy thông tin user hiện tại
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const authButtons = document.getElementById("authButtons");
const userSection = document.getElementById("userSection");
const usernameDisplay = document.getElementById("usernameDisplay");

// ✅ Kiểm tra đăng nhập
if (currentUser) {
    authButtons.style.display = "none";     // Ẩn đăng nhập/đăng ký
    userSection.style.display = "flex";     // Hiện avatar + tên user

    // ✅ Hiển thị họ tên (nếu có) → không có thì hiển thị username
    usernameDisplay.textContent =
        currentUser.hoten && currentUser.hoten.trim() !== "" 
            ? currentUser.hoten 
            : currentUser.tendangnhap;
} else {
    authButtons.style.display = "flex";
    userSection.style.display = "none";
}

// ✅ Slide ảnh
let index = 0;
const images = document.querySelectorAll('.box img');  

setInterval(() => {
  images[index].classList.remove('active');
  index = (index + 1) % images.length;
  images[index].classList.add('active');
}, 3000);
