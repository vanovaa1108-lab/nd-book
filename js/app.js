// ===== Bagian 1: Ambil elemen dan data =====
const semuaKartu = document.querySelectorAll("article");
const kolomCari = document.getElementById("kolom-cari");
const tombolKategori = document.querySelectorAll("nav button");
const pesanKosong = document.getElementById("pesan-kosong");
const tombolRekomendasi = document.querySelectorAll(".btn-rek");
const teksRekomendasi = document.getElementById("teks-rekomendasi");
let modeRekomendasi = "semua";
let kategoriAktif = "semua";

// Keranjang diambil dari localStorage (kalau kosong, mulai dari daftar kosong)
let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

function updateJumlah() {
  const elJumlah = document.getElementById("jumlah-keranjang");
  if (elJumlah) {
    elJumlah.textContent = keranjang.length;
  }
}

updateJumlah();

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

// ===== Bagian 2: Filter kategori, pencarian, dan rekomendasi =====
function tampilkanBuku() {
  const kataKunci = kolomCari ? kolomCari.value.toLowerCase().trim() : "";
  let jumlahTampil = 0;

  semuaKartu.forEach(function (kartu) {
    const judul = kartu.querySelector("h3").textContent.toLowerCase();
    const kategoriKartu = (kartu.dataset.kategori || "").toLowerCase();

    const cocokKategori = kategoriAktif === "semua" || kategoriKartu === kategoriAktif;
    const cocokJudul = judul.includes(kataKunci);

    let cocokRek = true;
    if (modeRekomendasi === "coding") {
      cocokRek =
        judul.includes("coding") ||
        judul.includes("html") ||
        judul.includes("kecerdasan") ||
        kategoriKartu === "teknologi";
    } else if (modeRekomendasi === "fiksi") {
      cocokRek =
        judul.includes("langit") ||
        judul.includes("rahasia") ||
        judul.includes("detektif") ||
        kategoriKartu === "novel" ||
        kategoriKartu === "komik";
    } else if (modeRekomendasi === "wawasan") {
      cocokRek =
        judul.includes("kerajaan") ||
        judul.includes("proklamasi") ||
        judul.includes("matematika") ||
        judul.includes("langkah") ||
        kategoriKartu === "sejarah" ||
        kategoriKartu === "pelajaran" ||
        kategoriKartu === "motivasi";
    }

    const tampil = cocokKategori && cocokJudul && cocokRek;
    kartu.classList.toggle("sembunyi", !tampil);
    if (tampil) {
      jumlahTampil++;
    }
  });

  if (pesanKosong) {
    pesanKosong.classList.toggle("sembunyi", jumlahTampil > 0);
  }
}

if (kolomCari) {
  kolomCari.addEventListener("input", tampilkanBuku);
}

tombolKategori.forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    kategoriAktif = (tombol.dataset.kategori || "semua").toLowerCase();
    tombolKategori.forEach(function (t) {
      t.classList.remove("aktif");
    });
    tombol.classList.add("aktif");
    tampilkanBuku();
  });
});

// ===== Bagian 3: Tombol "Tambah ke Keranjang" =====
semuaKartu.forEach(function (kartu) {
  const tombol = kartu.querySelector("button");
  if (!tombol) return;
  tombol.addEventListener("click", function () {
    const judul = kartu.querySelector("h3").textContent;
    const teksHarga = kartu.querySelectorAll("p")[1].textContent;
    const harga = Number(teksHarga.replace(/\D/g, ""));
    keranjang.push({ judul: judul, harga: harga });
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    updateJumlah();
    bunyiKlik();
    animasi(tombol, "pop");
    const elJumlah = document.getElementById("jumlah-keranjang");
    if (elJumlah) {
      animasi(elJumlah, "pop");
    }
  });
});

// ===== Bagian 4: Rekomendasi buku =====
const deskripsiRekomendasi = {
  semua: "",
  coding: "Rekomendasi untuk mulai belajar coding, web dasar, dan kecerdasan artifisial.",
  fiksi: "Rekomendasi bacaan cerita, misteri, dan komik yang seru.",
  wawasan: "Rekomendasi untuk memperluas wawasan sejarah, pelajaran, dan motivasi diri."
};

tombolRekomendasi.forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    modeRekomendasi = tombol.dataset.rek;
    tombolRekomendasi.forEach(function (t) {
      t.classList.remove("aktif");
    });
    tombol.classList.add("aktif");

    const pesan = deskripsiRekomendasi[modeRekomendasi] || "";
    if (teksRekomendasi) {
      teksRekomendasi.textContent = pesan;
      teksRekomendasi.classList.toggle("sembunyi", pesan === "");
    }
    tampilkanBuku();
  });
});
