document.getElementById('loginForm').addEventListener('submit', async function(e){
  e.preventDefault();

  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value;

  try {
    const res = await fetch('../data/admins.json');
    const list = await res.json();
    const found = list.find(a => a.username === user && a.password === pass);

    if(found) {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminUser', user);
      alert('Đăng nhập thành công!');
      window.location.href = 'index_admin.html';
    } else {
      alert('Sai tên đăng nhập hoặc mật khẩu (mặc định: admin/admin)');
    }
  } catch(err) {
    console.error(err);
    alert('Không thể đọc dữ liệu tài khoản (admins.json).');
  }
});
