document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    // Ẩn nút đăng nhập / đăng ký
    const authButtons = document.getElementById("authButtons");
    if (authButtons) authButtons.style.display = "none";

    // Hiện vùng user
    const userSection = document.getElementById("userSection");
    const usernameDisplay = document.getElementById("usernameDisplay");
    const userAvatar = document.getElementById("userAvatar");

    userSection.style.display = "flex";

    // Hiển thị tên đúng:
    // - Nếu có họ tên → dùng hoten
    // - Nếu chưa có → dùng tendangnhap
    usernameDisplay.textContent =
      currentUser.hoten && currentUser.hoten.trim() !== ""
        ? currentUser.hoten
        : currentUser.tendangnhap;

    // Avatar
    if (currentUser.avatarUrl) {
      userAvatar.style.backgroundImage = `url(${currentUser.avatarUrl})`;
    } else {
      userAvatar.style.backgroundColor = "#ccc";
    }

    // Khi click vào avatar → chuyển trang info-user
    userAvatar.addEventListener("click", function () {
      window.location.href = "/User/Info-user/info-user.html";
    });
  }
});
