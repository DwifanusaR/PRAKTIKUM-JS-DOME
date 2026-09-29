console.log("Bismillah Praktikum Dimulai");

// aktivitas 1 DOM SELECTION / Seleksi elemen
// Kenapa kita harus seleksi karna "menangkap" atau mengambil id/class
// Mengambil elemen html tersebut lalu disimpan di variabel javascript

// 1. mengambil elemen judul utama & sub judul 
// document.getElementById("...") mengambil berdasarkan atribut id.

const judulUtama = document.getElementById("judul-utama"); //menangkap: <h1 id="judul-utama">

// document.querySelector("#...")
// tanda # artinnya ID

const subjudul = document.querySelector("#sub-judul") // menangkap: <p id="sub-judul">

// 2. Mengambil elemen pada kartu 1 (Kartu Manipulasi Teks & Style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");

// 3. menambil elemen tombol - tombol aksi pada kartu 1
const BtnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

// 4. Mengambil elemen pada kartu 2 (Fitur catatan dinamis / To Do List sederhana)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");

// Aktivitas ke 2 manipulasi teks & style (card 1)
// addEventListener("click", function() {...}) artinya adalah tolong dengarkan dulu / tunggu
// sampai di klik user. jika di klik jalankan perintah dalam function

// A. mengubah teks & warna secara langsung

BtnUbahTeks.addEventListener("click", function () {
    // . innertext = mengganti atau mengisi secara  langsung teks yang ada didalam html
    teksPreview.innerText = "Hebat! Teks ini berhasil diubah pake DOM!";

    // style.color = mengubah warna teks secara langsung (Inline style)
    teksPreview.style.color = "#4138ee";

    // console.log = mencetak pesan di console style
    console.log("[DOM] Teks preview telah diperbaharui!");
});

//B. Manipulasi Class css menggunakan
btnToggleWarna.addEventListener("click", function () {
    //.classlist.toggle("nama-class")= fitur saklar otomatis (on/off)
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("DOM Berhasil di Switch");
});

//C. Mengembalikan (reset) Teks ke kondisi
btnReset.addEventListener("click", function () {
    //1. kembalikan teks semula teks asli
    teksPreview.innerText = "Halo! Teks ini siap diubah oleh Javascript";

    //2. kosongkan warna agar kembali ke warna css bawaan
    teksPreview.style.color = "";

    //3. Hapus class khusus untuk mengembalikan .classlight
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("highlight");

    console.log("DOM Tampilan di reset");
});

// Aktivitas 3 & 4 : elemen dinamin dan event handling (TO-DO-LIST sederhana)
// di aktivitas ini kita belajar elemen html, lalu menempelkan ke layar (ul)

// langkah 1. membuat variabel penampung angka jumlah catatan
// "let" digunakan unutk nilai variabel yang akan berubah bisa bertambah bisa berkurang (counting)

let totalCatatan = 0;

// langkah 2. fungsi update angka counter &pesan status
function perbaruiJumlah() {
    // masukkan jumlah angka total catatan terbaru ke dalam tag <span id="jumlah-catatan">
    jumlahCatatan.innerText = totalCatatan;

    // conditional statement berupa apakah catatannya itu kosong / 0?
    if (totalCatatan === 0) {
        // jika 0: hapus class "hidden" supaya teks "belum ada catatan" muncul ke layar
        pesanKosong.classList.remove("hidden");
    } else {
        // jika > 0: tambahkan class "hidden" untuk menyembunyikan pesan agar teks "belum ada catatam " tersembungi
        pesanKosong.classList.add("hidden");
    }
}

// langkah 3. dungsi utama logika tambah catatan baru
function tambahCatatan() {
    // 3.1 inputCatatan.value fungsi untuk mengambil teks yang diketik oleh user
    const isiTeks = inputCatatan.value.trim();

    // 3.2 validasi input jika isi teks kosonh maka tampilan alert
    if (isiTeks === "") {
        alert("catatan kamu tidak boleh kosong!");
        return;
    }

    // 3.3 document.createElement("li") membuat memori di javascript secara dinamis
    const liBaru = document.createElement("li");
    liBaru.className = "note-item"; //menampilkan pada tag li

    // 3.4 inner HtML = mengisii struktur di dalam tag li
    liBaru.innerHTML = '<span>' + isiTeks + '</span> <button class="delete-btn">Hapus</button>';

    // 3.5 tambahkan elemen li baru ke dalam daftar catatan
    const btnHapus = liBaru.querySelector(".delete-btn");
    btnHapus.addEventListener("click", function () {
        liBaru.remove();
        totalCatatan--;
        perbaruiJumlah(); ''
        console.log('dom catatan "${isiTeks}" dihapus');
    })
    // 3.6 appendChild = memasukkan element li kedalam wadah <ul id ="daftar-catatan">
    daftarCatatan.appendChild(liBaru);

    // 3.7 mengosongkan kembali isi kolom input (inputCatatan.value = "") supaya bisa diketik lagi
    inputCatatan.value = "";

    //3.8 totalCatatan++ artinya tambah nilai total catatan sebanyak 1, lalu update ke angka ke layar
    totalCatatan++;
    perbaruiJumlah();

    console.log('dom catatan baru di tambahkab: ${isiTeks}');

}

// langkah 4: event listener klik tombol + "tambah"
// ketika tombol "+ tambah" diklik oleh user, maka jalankan fungsi tambah catatan()
btnTambah.addEventListener("click", function () {
    tambahCatatan();
});

// langkah 5: event listener keyboard "enter" pada kolom input
// ketika user mengetik di kolom input dan melepas tombol keyboard ('event keyup')
inputCatatan.addEventListener("keyup", function (event) {
    // periksa apakah tombol keyboard yang di tekan user adalah enter?
    if (event.key === "Enter") {
        tambahCatatan(); // jika ya, jalankan fungsi tambahCatatan();
    }
});