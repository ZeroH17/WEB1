document.addEventListener("DOMContentLoaded", function () {
  const fields = document.querySelectorAll(".field input");
  const editButtons = document.querySelectorAll(".edit-btn");
const userid = document.querySelector(".userid");

  const ho = document.querySelector(".first-name");
  const ten = document.querySelector(".last-name");
  const email = document.querySelector(".email");
  const username = document.querySelector(".username");
  const password = document.querySelector(".password");
  const address = document.querySelector(".address");

  const saveBtn = document.querySelector(".btn-save");
  const saveExitBtn = document.querySelector(".btn-save_exit");

  // Mặc định khóa tất cả input
  fields.forEach((input) => {
    input.disabled = true;
    input.style.opacity = "0.6";
    input.style.cursor = "not-allowed";
  });

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (user) {
    // TÁCH họ tên (hoten) ra họ + tên
    const parts = (user.hoten || "").trim().split(" ");
    ho.value = parts.slice(0, -1).join(" "); // họ
    ten.value = parts.slice(-1).join(" ");   // tên
userid.value = user.id_khach || "";

    email.value = user.email || "";
    username.value = user.tendangnhap || "";
    password.value = user.matkhau || "";
    address.value = user.address || "";
  }

  // Bật input khi nhấn "Chỉnh sửa"
  editButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetClass = btn.dataset.target;
      const input = document.querySelector(`.${targetClass}`);

      if (input.disabled) {
        input.disabled = false;
        input.focus();
        input.style.opacity = "1";
        input.style.cursor = "text";
        btn.textContent = "Hủy";
        btn.style.background = "linear-gradient(to right, #dc3545, #ff6b6b)";
      } else {
        input.disabled = true;
        input.style.opacity = "0.6";
        input.style.cursor = "not-allowed";
        btn.textContent = "Chỉnh sửa";
        btn.style.background = "linear-gradient(to right, #007bff, #00c6ff)";
      }
    });
  });

  // Lưu dữ liệu
  function saveUserData(redirect = false) {
    if (!user) {
      alert("Không tìm thấy thông tin người dùng!");
      return;
    }

    const newHoten = (ho.value + " " + ten.value).trim();

    const updatedUser = {
      ...user,
      hoten: newHoten,
      email: email.value.trim(),
      tendangnhap: username.value.trim(),
      matkhau: password.value.trim(),
      address: address.value.trim(),
    };

    // Cập nhật currentUser
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Cập nhật danh sách users
    const updatedUsers = users.map((u) =>
      u.tendangnhap === user.tendangnhap ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Đã lưu thông tin!");

    fields.forEach((input) => {
      input.disabled = true;
      input.style.opacity = "0.6";
      input.style.cursor = "not-allowed";
    });

    editButtons.forEach((btn) => {
      btn.textContent = "Chỉnh sửa";
      btn.style.background = "linear-gradient(to right, #007bff, #00c6ff)";
    });

    if (redirect) {
      window.location.href = "/index.html";
    }
  }

  saveBtn.addEventListener("click", () => saveUserData(false));
  saveExitBtn.addEventListener("click", () => saveUserData(true));
});
