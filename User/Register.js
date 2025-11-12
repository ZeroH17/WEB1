document.getElementById("registerBtn").addEventListener("click", function () {
    const tendangnhap = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const matkhau = document.getElementById("password").value;
    const nhaplai = document.getElementById("repassword").value;

    if (!tendangnhap || !email || !matkhau || !nhaplai) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (matkhau !== nhaplai) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check trùng
    if (users.find(u => u.tendangnhap === tendangnhap)) {
        alert("Tên đăng nhập đã tồn tại!");
        return;
    }

    if (users.find(u => u.email === email)) {
        alert("Email đã được đăng ký!");
        return;
    }

    // TẠO ID KHÁCH TỰ ĐỘNG
    let newId = 1;

    if (users.length > 0) {
        // Lấy số ID lớn nhất
        const last = users[users.length - 1].id_khach || "KH000";
        const num = parseInt(last.replace("KH", "")) || 0;
        newId = num + 1;
    }

    const id_khach = "KH" + newId.toString().padStart(3, "0");

    // TẠO USER MỚI
    const newUser = {
        id_khach: id_khach,     // ID tự động
        tendangnhap: tendangnhap,
        email: email,
        matkhau: matkhau,
        hoten: "",
        trangthai: "Hoạt động",
        vipham: 0
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    window.location.href = "login_user.html";
});
