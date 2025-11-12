document.addEventListener("DOMContentLoaded", function () {
  const avatar = document.querySelector(".avatar") || document.querySelector("#userAvatar");
  if (!avatar) return;

  // Lấy user từ localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || !currentUser.tendangnhap) return;

  // Tạo key avatar theo tên đăng nhập
  const avatarKey = `avatar_${currentUser.tendangnhap}`;

  // Lấy avatar từ localStorage
  const savedAvatar = localStorage.getItem(avatarKey);

  if (savedAvatar) {
    avatar.style.backgroundImage = `url('${savedAvatar}')`;
    avatar.style.backgroundSize = "cover";
    avatar.style.backgroundPosition = "center center";
    avatar.style.backgroundRepeat = "no-repeat";
  }

  // Chỉ đổi avatar khi đang ở trang info-user.html
  const currentPage = window.location.pathname;
  const isInfoUserPage = currentPage.includes("info-user.html");

  if (isInfoUserPage) {
    avatar.addEventListener("click", function () {
      const imageUrl = prompt("Nhập link ảnh bạn muốn đặt làm avatar:");

      if (imageUrl && imageUrl.trim() !== "") {
        const url = imageUrl.trim();

        // Lưu avatar theo user
        localStorage.setItem(avatarKey, url);

        // Cập nhật ngay
        avatar.style.backgroundImage = `url('${url}')`;
        avatar.style.backgroundSize = "cover";
        avatar.style.backgroundPosition = "center center";
        avatar.style.backgroundRepeat = "no-repeat";
      } else {
        alert("Bạn chưa nhập link ảnh!");
      }
    });
  }
});
