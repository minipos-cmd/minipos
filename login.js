console.log("login.js TERLOAD");

document.getElementById("loginBtn").addEventListener("click", function () {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  console.log("Klik login:", user, pass);

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("login", "true");
    window.location.href = "https://minipos-cmd.github.io/minipos/dashboard.html";
  } else {
    alert("Username atau password salah");
  }
});
