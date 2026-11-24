# AI_LOGBOOK - N&D Bookstore

Tim: NOVA WAHYUNI (dikerjakan dan diverifikasi mandiri) dan DIVA YULIANA
Alat AI: Claude & Gemini

## Tahap 1: Eksplorasi Ide

| Prompt | Jawaban AI (ringkas) | Validasi & Modifikasi Mandiri |
|---|---|---|
| Minta ide website toko buku online untuk pemula | Memberi nama proyek, struktur folder, dan daftar fitur | Memilih nama N&D Book / N&D Bookstore, membatalkan ide install HP/offline, dan memilih fitur pesan saat hasil tidak ditemukan, rekomendasi buku, serta halaman `keranjang.html` (dikerjakan mandiri). |
| Menyesuaikan ide dengan tema AI kehidupan sehari-hari & referensi video toko online | Menyarankan rekomendasi buku berbasis pilihan kebutuhan/minat sederhana serta alur katalog & pemesanan seperti referensi video | Menyesuaikan ide agar mudah dipahami siswa kelas XI dan sesuai katalog buku yang disiapkan (dikerjakan mandiri). |

## Tahap 2: Kerangka Kode

| Prompt | Jawaban AI (ringkas) | Validasi & Modifikasi Mandiri |
|---|---|---|
| Menyusun kerangka awal HTML, CSS, dan JS katalog toko buku | Memberi struktur halaman katalog (`index.html`), gaya kartu & tombol (`css/style.css`), serta logika kategori, pencarian, dan `localStorage` (`js/app.js`) | Mengecek struktur file di repository GitHub (`index.html`, `css/style.css`, `js/app.js`, folder `img/`) dan merapikan bagian yang dipakai secara mandiri. |
| Menambahkan pesan saat pencarian/filter tidak cocok | Menyarankan elemen pesan di `index.html`, menghitung jumlah item yang tampil di `tampilkanBuku()` pada `js/app.js`, dan mengatur lebar penuh di grid `css/style.css` | Menambahkan `<p id="pesan-kosong">` di `index.html`, menempatkan `pesanKosong` di Bagian 1, dan memperbarui `tampilkanBuku()` di Bagian 2 pada `js/app.js` secara mandiri. |
| Merancang fitur rekomendasi buku & halaman `keranjang.html` | Menyarankan pembagian peran `index.html`, `keranjang.html`, `css/style.css`, dan `js/app.js` serta filter/deskripsi berdasarkan minat | Memasang bagian rekomendasi (`Semua`, `Coding & AI`, `Fiksi & Misteri`, `Wawasan & Sejarah`), membuat `keranjang.html`, menambahkan gaya daftar keranjang di `css/style.css`, dan menguji alur di browser. |
| Mengubah warna latar `<header>` dan warna tombol menjadi hijau di `css/style.css` | Memberikan pilihan warna kontras untuk `<header>` serta aturan CSS hijau pada `button`, `article button:hover`, `nav button.aktif`, dan `.btn-rek.aktif` | Mengubah warna tombol menjadi hijau di `css/style.css` dan memverifikasi hasilnya langsung di browser secara mandiri; [catat juga warna `<header>` jika ikut diubah]. |

## Tahap 3: Debugging

| Masalah | Saran AI | Validasi & Modifikasi Mandiri |
|---|---|---|
| Sampul muncul dobel (kotak warna otomatis dari JS + gambar di HTML) dan 2 buku sampulnya tidak muncul/tertukar di GitHub Pages[span_1](start_span)[span_1](end_span) | Menghapus pembuatan elemen `.sampul` otomatis di JS dan menyamakan `src` gambar di `index.html` dengan nama file di folder `img/` | Memeriksa langsung repository `img/` di GitHub serta hasil tampilan di GitHub Pages dan Inspect secara mandiri, lalu menyamakan `src` gambar (`img/kecerdasan-artifisial.png.jpeg` dan `img/detektif-smkn2.png.jpeg`) dan menguji ulang[span_2](start_span)[span_2](end_span). |
| Gambar sampul terpotong saat memakai `object-fit: cover` dan muncul typo `backround-color` di `css/style.css`[span_3](start_span)[span_3](end_span) | Mengubah `.sampul-gambar` menjadi `object-fit: contain`, mengatur tinggi yang sesuai, dan memperbaiki `background-color` | Mengedit langsung `css/style.css` di GitHub (`object-fit: contain`, tinggi sampul yang disesuaikan, `background-color: white`), lalu mengecek tampilannya di browser sendiri. |
| Sampul *Rahasia Perpustakaan Tua* belum muncul dan memunculkan error `404` saat diakses langsung, serta ukuran sampul ingin dibuat lebih besar dan menyatu (`white`) | Mengecek nama/keberadaan file di folder `img/` saat muncul `404`, menyesuaikan `.sampul-gambar`, dan melakukan hard refresh/cek cache | Mengecek langsung folder `img/` secara mandiri dan menemukan nama filenya tertulis `Perpurtakaan`, menyamakan nama/path file, lalu menguji ulang hingga sampul *Rahasia Perpustakaan Tua* muncul di browser[span_4](start_span)[span_4](end_span). |
| Tombol kategori (`Semua`, `Novel`, `Pelajaran`, `Komik`, `Teknologi`, `Sejarah`, `Motivasi`) tidak merespons saat diklik dan jumlah keranjang awal perlu disinkronkan | Memeriksa `js/app.js` untuk memastikan *event listener* `tombolKategori` dan `kolomCari` terpasang, memanggil `updateJumlah()` saat awal, serta mengganti isi `js/app.js` dengan versi yang lengkap | Mengganti isi `js/app.js` di GitHub dengan kode yang sudah diperbaiki, memisahkan file sesuai struktur proyek, lalu menguji klik kategori dan hard refresh (`Ctrl + Shift + R`) di browser. |

## Tahap 4: Refleksi

| Bagian Kode | Penjelasan dengan Kata Sendiri | Validasi & Modifikasi Mandiri |
|---|---|---|
| Struktur HTML katalog & gambar sampul (`index.html`) | [Jelaskan dengan kata-katamu sendiri fungsi `<header>`, pencarian, tombol kategori, area rekomendasi, `<p id="pesan-kosong">`, dan `<article>` berisi `<img class="sampul-gambar">`] | Memastikan setiap `<article>` memakai path gambar yang sesuai dengan file di folder `img/` (dikerjakan sendiri). |
| Styling kartu, sampul, header, tombol & keranjang (`css/style.css`) | [Jelaskan dengan kata-katamu sendiri maksud `object-fit: contain`, warna latar `white` dan ukuran `.sampul-gambar`, warna `<header>`, warna tombol hijau, serta tata letak `#pesan-kosong`, area rekomendasi, dan daftar keranjang] | Menguji perubahan langsung di editor GitHub dan memverifikasi hasil tampilannya di browser sendiri. |
| Logika JS, pesan kosong, rekomendasi & keranjang (`js/app.js` & `keranjang.html`) | [Jelaskan dengan kata-katamu sendiri cara filter kategori, pencarian, `modeRekomendasi`, penampilan pesan kosong, serta baca/hapus/total item di `localStorage` pada `keranjang.html` bekerja] | [Catat bagian mana di `js/app.js` dan `keranjang.html` yang kamu perbaiki/tambahkan sendiri serta hasil uji coba di browser] |
