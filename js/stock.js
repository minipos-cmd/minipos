// ================= LOGIN =================
if (localStorage.getItem("login") !== "true") {
  window.location.href = "index.html";
}

// ================= CONFIG =================
const API_URL = "PASTE_URL_WEB_APP_DI_SINI";
let stock = [];

// ================= LOAD DATA =================
function loadStock() {
  fetch(API_URL + "?action=getStock")
    .then(res => res.json())
    .then(data => {
      stock = data;
      render();
    });
}

// ================= RENDER =================
function render() {
  const list = document.getElementById("stockList");
  if (!list) return;

  list.innerHTML = "";

  let totalBarang = 0;
  let totalHarga = 0;

  stock.forEach((item, index) => {
    totalBarang += item.jumlah;
    totalHarga += item.harga * item.jumlah;

    list.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td>Rp ${item.harga.toLocaleString("id-ID")}</td>
        <td>${item.jumlah}</td>
        <td>
          <button onclick="ubah(${index}, 1)">+</button>
          <button onclick="ubah(${index}, -1)">-</button>
        </td>
        <td>${item.expired || "-"}</td>
      </tr>
    `;
  });

  document.getElementById("totalBarang").innerText = totalBarang;
  document.getElementById("totalHarga").innerText =
    "Rp " + totalHarga.toLocaleString("id-ID");
}

// ================= TAMBAH BARANG =================
function tambahBarang() {
  const nama = document.getElementById("nama").value.trim();
  const harga = parseInt(document.getElementById("harga").value);
  const jumlah = parseInt(document.getElementById("jumlah").value);
  const expired = document.getElementById("expired").value;

  if (!nama || isNaN(harga) || isNaN(jumlah)) {
    alert("Lengkapi data!");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "addStock",
      nama,
      harga,
      jumlah,
      expired
    })
  })
  .then(res => res.json())
  .then(() => {
    closeModal();
    loadStock();
  });
}

// ================= UPDATE JUMLAH =================
function ubah(index, nilai) {
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "updateQty",
      index,
      nilai
    })
  })
  .then(res => res.json())
  .then(() => loadStock());
}

// ================= MODAL =================
function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("nama").value = "";
  document.getElementById("harga").value = "";
  document.getElementById("jumlah").value = "";
  document.getElementById("expired").value = "";
}

function back() {
  window.location.href = "dashboard.html";
}

// ================= START =================
loadStock();
