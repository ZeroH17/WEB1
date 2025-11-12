document.getElementById("loginBtn").addEventListener("click", function () {
    const usernameOrEmail = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!usernameOrEmail || !password) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(u =>
        (u.tendangnhap === usernameOrEmail || u.email === usernameOrEmail) &&
        u.matkhau === password
    );

    if (!foundUser) {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!");
        return;
    }

    if (foundUser.trangthai === "Đã bị khóa") {
        alert("Tài khoản đã bị khóa, không thể đăng nhập!");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    alert(`Chào mừng ${foundUser.hoten}!`);
    window.location.href = "/index.html";
});
