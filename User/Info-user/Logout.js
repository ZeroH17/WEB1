document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
        localStorage.removeItem("currentUser");
        window.location.href = "/index.html";
      }
    });
  }
});
