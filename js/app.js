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
// Suara "ting" dibuat langsung oleh browser, jadi tidak perlu file suara
let konteksSuara;
function bunyiKlik() {
  if (!konteksSuara) {
    konteksSuara = new (window.AudioContext || window.webkitAudioContext)();
  }
  const osilator = konteksSuara.createOscillator();
  const volume = konteksSuara.createGain();
  const mulai = konteksSuara.currentTime;
  osilator.frequency.setValueAtTime(660, mulai);
  osilator.frequency.setValueAtTime(880, mulai + 0.08);
  volume.gain.setValueAtTime(0.15, mulai);
  volume.gain.exponentialRampToValueAtTime(0.001, mulai + 0.25);
  osilator.connect(volume);
  volume.connect(konteksSuara.destination);
  osilator.start(mulai);
  osilator.stop(mulai + 0.25);
}

// Memberi gerakan sebentar, lalu dilepas lagi
function animasi(elemen, namaKelas) {
  elemen.classList.add(namaKelas);
  setTimeout(function () {
    elemen.classList.remove(namaKelas);
  }, 400);
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
  const tombol = kartu.querySelector("button");
  tombol.addEventListener("click", function () {
    const judul = kartu.querySelector("h3").textContent;
    const teksHarga = kartu.querySelectorAll("p")[1].textContent;
    const harga = Number(teksHarga.replace(/\D/g, ""));
    keranjang.push({ judul: judul, harga: harga });
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    updateJumlah();
    bunyiKlik();
    animasi(tombol, "pop");
    animasi(document.getElementById("jumlah-keranjang"), "pop");
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
