// ===== Bagian 1: Ambil elemen dan data =====
const semuaKartu = document.querySelectorAll("article");
const kolomCari = document.getElementById("kolom-cari");
const tombolKategori = document.querySelectorAll("nav button");
let kategoriAktif = "semua";

// Keranjang diambil dari localStorage (kalau kosong, mulai dari daftar kosong)
let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

function updateJumlah() {
  document.getElementById("jumlah-keranjang").textContent = keranjang.length;
}

// ===== Bagian 2: Filter kategori dan pencarian =====
function tampilkanBuku() {
  const kataKunci = kolomCari.value.toLowerCase();
  semuaKartu.forEach(function (kartu) {
    const judul = kartu.querySelector("h3").textContent.toLowerCase();
    const cocokKategori = kategoriAktif === "semua" || kartu.dataset.kategori === kategoriAktif;
    const cocokJudul = judul.includes(kataKunci);
    kartu.classList.toggle("sembunyi", !(cocokKategori && cocokJudul));
  });
}

kolomCari.addEventListener("input", tampilkanBuku);

tombolKategori.forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    kategoriAktif = tombol.dataset.kategori;
    tombolKategori.forEach(function (t) { t.classList.remove("aktif"); });
    tombol.classList.add("aktif");
    tampilkanBuku();
  });
});

// ===== Bagian 3: Tombol "Tambah ke Keranjang" =====
semuaKartu.forEach(function (kartu) {
  kartu.querySelector("button").addEventListener("click", function () {
    const judul = kartu.querySelector("h3").textContent;
    const teksHarga = kartu.querySelectorAll("p")[1].textContent;
    const harga = Number(teksHarga.replace(/\D/g, ""));
    keranjang.push({ judul: judul, harga: harga });
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    updateJumlah();
  });
});

// ===== Bagian 4: Sampul buku otomatis =====
const warnaSampul = {
  novel: "#2a6f97",
  pelajaran: "#2d6a4f",
  komik: "#b5651d",
  teknologi: "#5a189a",
  sejarah: "#8a4f7d",
  motivasi: "#c1121f"
};

semuaKartu.forEach(function (kartu) {
  const sampul = document.createElement("div");
  sampul.className = "sampul";
  sampul.textContent = kartu.querySelector("h3").textContent;
  sampul.style.backgroundColor = warnaSampul[kartu.dataset.kategori] || "#555";
  kartu.prepend(sampul);
});

updateJumlah();
