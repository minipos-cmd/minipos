// Proteksi login
if (localStorage.getItem("login") !== "true") {
  window.location.href = "index.html";
}

let stock = JSON.parse(localStorage.getItem("stock")) || [];

function render() {
  const list = document.getElementById("stockList");
  list.innerHTML = "";

  stock.forEach((item, index) => {
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
      </tr>
    `;
  });

  localStorage.setItem("stock", JSON.stringify(stock));
}

// Modal
function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("nama").value = "";
  document.getElementById("harga").value = "";
  document.getElementById("jumlah").value = "";
}

// Tambah barang
function tambahBarang() {
  const nama = document.getElementById("nama").value.trim();
  const harga = parseInt(document.getElementById("harga").value);
  const jumlah = parseInt(document.getElementById("jumlah").value);

  if (!nama || isNaN(harga) || isNaN(jumlah)) {
    alert("Semua field wajib diisi!");
    return;
  }

  stock.push({ nama, harga, jumlah });
  closeModal();
  render();
}

// Ubah jumlah
function ubah(index, nilai) {
  if (stock[index].jumlah + nilai < 0) return;
  stock[index].jumlah += nilai;

  if (stock[index].jumlah === 0) {
    if (confirm("Hapus barang ini?")) {
      stock.splice(index, 1);
    }
  }

  render();
}

function back() {
  window.location.href = "dashboard.html"; // sesuaikan path
}

render();
