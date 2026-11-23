// ===== Bagian 1: Ambil elemen dan data =====
const semuaKartu = document.querySelectorAll("article");
const kolomCari = document.getElementById("kolom-cari");
const tombolKategori = document.querySelectorAll("nav button");
const pesanKosong = document.getElementById("pesan-kosong");
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
  const kataKunci = kolomCari.value.toLowerCase().trim();
  let jumlahTampil = 0;

  semuaKartu.forEach(function (kartu) {
    const judul = kartu.querySelector("h3").textContent.toLowerCase();
    const cocokKategori = kategoriAktif === "semua" || kartu.dataset.kategori === kategoriAktif;
    const cocokJudul = judul.includes(kataKunci);
    const tampil = cocokKategori && cocokJudul;

    kartu.classList.toggle("sembunyi", !tampil);
    if (tampil) {
      jumlahTampil++;
    }
  });

  pesanKosong.classList.toggle("sembunyi", jumlahTampil > 0);
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
