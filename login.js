function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("login", "true");
    window.location.href = "https://minipos-cmd.github.io/dashboard.html";
  } else {
    alert("Username atau password salah!");
  }
}
