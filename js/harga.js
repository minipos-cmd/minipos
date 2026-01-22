let stok = JSON.parse(localStorage.getItem("stok")) || [];
let cart = [];

function renderStok() {
  const el = document.getElementById("barangList");
  el.innerHTML = "";

  stok.forEach((item, i) => {
    el.innerHTML += `
      <div class="card">
        <h4>${item.nama}</h4>
        <p>(${item.jumlah})</p>
        <button ${item.jumlah === 0 ? "disabled" : ""} 
          onclick="tambah(${i})">TAMBAH</button>
      </div>
    `;
  });
}

function tambah(i) {
  if (stok[i].jumlah <= 0) return;

  let item = cart.find(c => c.nama === stok[i].nama);
  if (item) item.qty++;
  else cart.push({ nama: stok[i].nama, harga: stok[i].harga, qty: 1 });

  stok[i].jumlah--;
  save();
}

function kurang(nama) {
  let item = cart.find(c => c.nama === nama);
  let stokItem = stok.find(s => s.nama === nama);

  item.qty--;
  stokItem.jumlah++;

  if (item.qty <= 0)
    cart = cart.filter(c => c.nama !== nama);

  save();
}

function renderCart() {
  const el = document.getElementById("cartList");
  el.innerHTML = "";
  let total = 0;

  cart.forEach(c => {
    let sub = c.harga * c.qty;
    total += sub;

    el.innerHTML += `
      <tr>
        <td>${c.nama}</td>
        <td>${c.qty}</td>
        <td>
          <button onclick="tambahByName('${c.nama}')">+</button>
          <button onclick="kurang('${c.nama}')">-</button>
        </td>
        <td>Rp ${sub.toLocaleString("id-ID")}</td>
      </tr>
    `;
  });

  document.getElementById("grandTotal").innerText =
    total.toLocaleString("id-ID");
}

function tambahByName(nama) {
  let index = stok.findIndex(s => s.nama === nama);
  tambah(index);
}

function bayar() {
  let uang = parseInt(document.getElementById("bayar").value);
  let total = cart.reduce((s, i) => s + i.harga * i.qty, 0);

  if (uang < total) return alert("Uang kurang!");

  document.getElementById("popup").style.display = "flex";
  document.getElementById("strukList").innerHTML =
    cart.map(i => `${i.nama} x${i.qty}`).join("<br>");

  document.getElementById("strukTotal").innerText = total.toLocaleString("id-ID");
  document.getElementById("strukBayar").innerText = uang.toLocaleString("id-ID");
  document.getElementById("strukKembali").innerText =
    (uang - total).toLocaleString("id-ID");
}

function closePopup() {
  cart = [];
  document.getElementById("popup").style.display = "none";
  save();
}

function save() {
  localStorage.setItem("stok", JSON.stringify(stok));
  renderStok();
  renderCart();
}

function back() {
  window.location.href = "dashboard.html";
}

renderStok();
renderCart();
