let stok = JSON.parse(localStorage.getItem("stok")) || [];
let cart = [];

function renderStok() {
  const list = document.getElementById("barangList");
  list.innerHTML = "";

  stok.forEach((item, index) => {
    list.innerHTML += `
      <tr>
        <td>${item.nama}</td>
        <td>${item.jumlah}</td>
        <td>
          <button onclick="tambahKeCart(${index})">➜</button>
        </td>
      </tr>
    `;
  });
}

function tambahKeCart(index) {
  if (stok[index].jumlah <= 0) return;

  let item = cart.find(i => i.nama === stok[index].nama);

  if (item) {
    item.qty++;
  } else {
    cart.push({
      nama: stok[index].nama,
      harga: stok[index].harga,
      qty: 1
    });
  }

  stok[index].jumlah--;
  localStorage.setItem("stok", JSON.stringify(stok));

  renderStok();
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cartList");
  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.harga * item.qty;
    total += subtotal;

    list.innerHTML += `
      <tr>
        <td>${item.nama}</td>
        <td>${item.qty}</td>
        <td>Rp ${item.harga.toLocaleString("id-ID")}</td>
        <td>Rp ${subtotal.toLocaleString("id-ID")}</td>
      </tr>
    `;
  });

  document.getElementById("grandTotal").innerText =
    total.toLocaleString("id-ID");
}

function hitung() {
  const bayar = parseInt(document.getElementById("bayar").value) || 0;
  let total = cart.reduce((sum, i) => sum + i.harga * i.qty, 0);

  if (bayar < total) {
    alert("Uang kurang!");
    return;
  }

  document.getElementById("kembalian").innerText =
    (bayar - total).toLocaleString("id-ID");
}

renderStok();
renderCart();
