// Simulasi akun login
const adminAccount = {
    username: "admin",
    password: "12345"
  };
  
  function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const error = document.getElementById("loginError");
  
    if (user === adminAccount.username && pass === adminAccount.password) {
      localStorage.setItem("isLoggedIn", "true");
      document.getElementById("loginSection").classList.add("hidden");
      document.getElementById("adminSection").classList.remove("hidden");
      loadMenu();
    } else {
      error.textContent = "Username atau password salah!";
    }
  }
  
  function logout() {
    localStorage.removeItem("isLoggedIn");
    document.getElementById("loginSection").classList.remove("hidden");
    document.getElementById("adminSection").classList.add("hidden");
  }
  
  // Cek login saat load halaman
  window.onload = () => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      document.getElementById("loginSection").classList.add("hidden");
      document.getElementById("adminSection").classList.remove("hidden");
      loadMenu();
    }
  };
  
  // CRUD menu pakai localStorage
  function getMenus() {
    return JSON.parse(localStorage.getItem("menus") || "[]");
  }
  
  function saveMenus(menus) {
    localStorage.setItem("menus", JSON.stringify(menus));
  }
  
  function addMenu() {
    const name = document.getElementById("menuName").value;
    const price = document.getElementById("menuPrice").value;
    const image = document.getElementById("menuImage").value || "./assets/img/default.jpg";
  
    if (!name || !price) return alert("Isi nama dan harga!");
  
    const menus = getMenus();
    menus.push({ id: Date.now(), name, price, image });
    saveMenus(menus);
    loadMenu();
  
    document.getElementById("menuName").value = "";
    document.getElementById("menuPrice").value = "";
    document.getElementById("menuImage").value = "";
  }
  
  function loadMenu() {
    const tbody = document.querySelector("#menuTable tbody");
    tbody.innerHTML = "";
    const menus = getMenus();
  
    menus.forEach(menu => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${menu.name}</td>
        <td>Rp ${menu.price}</td>
        <td><img src="${menu.image}" width="50" height="50"></td>
        <td>
          <button onclick="editMenu(${menu.id})">Edit</button>
          <button onclick="deleteMenu(${menu.id})" style="background:red;">Hapus</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  function editMenu(id) {
    const menus = getMenus();
    const menu = menus.find(m => m.id === id);
    const name = prompt("Nama baru:", menu.name);
    const price = prompt("Harga baru:", menu.price);
    if (name && price) {
      menu.name = name;
      menu.price = price;
      saveMenus(menus);
      loadMenu();
    }
  }
  
  function deleteMenu(id) {
    const menus = getMenus().filter(m => m.id !== id);
    saveMenus(menus);
    loadMenu();
  }
  