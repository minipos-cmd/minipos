function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user === "admin" && pass === "Mimin1234") {
    localStorage.setItem("login", "true");
    window.location.href = "https://minipos-cmd.github.io/minipos/dashboard.html";
  } else {
    alert("Username atau password salah!");
  }
}
