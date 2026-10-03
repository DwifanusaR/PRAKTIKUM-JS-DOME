console.log("Bismillah Praktikum Dimulai");

// aktivitas 1 DOM SELECTION / Seleksi elemen
// Kenapa kita harus seleksi karna "menangkap" atau mengambil id/class
// Mengambil elemen html tersebut lalu disimpan di variabel javascript

// 1. mengambil elemen judul utama & sub judul
// document.getElementById("...") mengambil berdasarkan atribut id.

const judulUtama = document.getElementById("judul-utama"); //menangkap: <h1 id="judul-utama">

// document.querySelector("#...")
// tanda # artinnya ID

const subjudul = document.querySelector("#sub-judul"); // menangkap: <p id="sub-judul">

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
const cardDinamis = document.getElementById("card-dinamis");

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
let totalSelesai = 0;

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

    // memperbarui angka statistik
    document.getElementById("total-tugas").innerText = totalCatatan;
    document.getElementById("tugas-selesai").innerText = totalSelesai;
    document.getElementById("tugas-belum").innerText =
        totalCatatan - totalSelesai;
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
    liBaru.className = "note-item";

    // 3.4 membuat tombol selesai, teks tugas dan tombol hapus
    const btnSelesai = document.createElement("button");
    btnSelesai.className = "check-btn";
    btnSelesai.innerText = "○";

    const teksTugas = document.createElement("span");
    teksTugas.className = "teks-tugas";
    teksTugas.innerText = isiTeks;

    const btnHapus = document.createElement("button");
    btnHapus.className = "btn-hapus";
    btnHapus.innerText = "🗑";

    // mengatur tampilan tombol checklist
    btnSelesai.style.border = "2px solid #94a3b8";
    btnSelesai.style.backgroundColor = "white";
    btnSelesai.style.color = "#94a3b8";
    btnSelesai.style.borderRadius = "50%";
    btnSelesai.style.width = "30px";
    btnSelesai.style.height = "30px";
    btnSelesai.style.fontSize = "20px";
    btnSelesai.style.cursor = "pointer";
    btnSelesai.style.flexShrink = "0";

    // membuat isi tugas menjadi satu baris yang rapi
    teksTugas.style.flex = "1";
    teksTugas.style.marginLeft = "12px";

    // memasukkan elemen ke dalam li
    liBaru.appendChild(btnSelesai);
    liBaru.appendChild(teksTugas);
    liBaru.appendChild(btnHapus);

    // 3.5 event ketika tugas ditandai selesai
    btnSelesai.addEventListener("click", function () {

        // .classList.toggle = menambahkan / menghapus class selesai
        teksTugas.classList.toggle("selesai");

        if (teksTugas.classList.contains("selesai")) {

            btnSelesai.innerText = "✓";
            btnSelesai.style.backgroundColor = "#3b82f6";
            btnSelesai.style.borderColor = "#3b82f6";
            btnSelesai.style.color = "white";

            totalSelesai++;

        } else {

            btnSelesai.innerText = "○";
            btnSelesai.style.backgroundColor = "white";
            btnSelesai.style.borderColor = "#94a3b8";
            btnSelesai.style.color = "#94a3b8";

            totalSelesai--;
        }

        perbaruiJumlah();
    });

    // 3.6 klik pada teks tugas juga bisa menandai selesai
    teksTugas.addEventListener("click", function () {
        btnSelesai.click();
    });

    // 3.7 tambahkan event listener pada tombol hapus
    btnHapus.addEventListener("click", function () {

        // jika tugas sudah selesai, kurangi jumlah selesai
        if (teksTugas.classList.contains("selesai")) {
            totalSelesai--;
        }

        liBaru.remove();

        totalCatatan--;

        perbaruiJumlah();

        console.log('dom catatan "' + isiTeks + '" dihapus');
    });

    // 3.8 appendChild = memasukkan element li kedalam wadah <ul id ="daftar-catatan">
    daftarCatatan.appendChild(liBaru);

    // 3.9 mengosongkan kembali isi kolom input
    inputCatatan.value = "";

    //3.10 totalCatatan++ artinya tambah nilai total catatan sebanyak 1
    totalCatatan++;

    perbaruiJumlah();

    console.log('dom catatan baru di tambahkan: ' + isiTeks);
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
        tambahCatatan();
    }
});


// Aktivitas 6 : membuat statistik tugas

// mengambil judul daftar tugas
const judulDaftar = cardDinamis.querySelector(".list-container h3");

// mengubah tulisan lama menjadi Daftar Tugas
judulDaftar.innerHTML = "Daftar Tugas";

// membuat tombol statistik
const tombolStatistik = document.createElement("button");

tombolStatistik.innerText = "📊 Statistik";
tombolStatistik.className = "btn btn-outline";

// memasukkan tombol statistik ke judul daftar tugas
judulDaftar.appendChild(tombolStatistik);


// membuat box statistik
const boxStatistik = document.createElement("div");

boxStatistik.className = "box-statistik";

boxStatistik.innerHTML =
    '<div><strong id="total-tugas">0</strong><br>Total Tugas</div>' +
    '<div><strong id="tugas-selesai">0</strong><br>Selesai</div>' +
    '<div><strong id="tugas-belum">0</strong><br>Belum Selesai</div>';

boxStatistik.style.display = "none";
boxStatistik.style.gridTemplateColumns = "repeat(3, 1fr)";
boxStatistik.style.alignItems = "center";
boxStatistik.style.textAlign = "center";


// memasukkan box statistik sebelum daftar tugas
const listContainer = cardDinamis.querySelector(".list-container");

listContainer.insertBefore(boxStatistik, daftarCatatan);


// tombol statistik untuk menampilkan / menyembunyikan statistik
tombolStatistik.addEventListener("click", function () {

    if (boxStatistik.style.display === "none") {
        boxStatistik.style.display = "grid";
    } else {
        boxStatistik.style.display = "none";
    }
});


// Aktivitas 7 : mengubah tampilan halaman menjadi To-Do List

// menyembunyikan kartu praktikum pertama
cardManipulasi.style.display = "none";

// menyembunyikan judul kartu lama
cardDinamis.querySelector("h2").style.display = "none";

// mengubah judul utama
judulUtama.innerText = "My Daily To-Do List";

// menghilangkan sub judul lama
subjudul.innerText = "";

// mengubah placeholder input
inputCatatan.placeholder = "Masukkan to-do list kamu hari ini...";

// mengubah tulisan tombol
btnTambah.innerText = "+ Tambah";

// mengubah pesan ketika belum ada tugas
pesanKosong.innerText = "Belum ada tugas.";


// Aktivitas 8 : efek sparkle pada judul

judulUtama.style.position = "relative";

judulUtama.style.textShadow =
    "0 0 8px rgba(255,255,255,0.9), 0 0 18px rgba(255,255,255,0.5)";


// sparkle kiri
const sparkleKiri = document.createElement("span");
sparkleKiri.innerText = "✦";
sparkleKiri.style.position = "absolute";
sparkleKiri.style.left = "-38px";
sparkleKiri.style.top = "5px";
sparkleKiri.style.color = "white";
sparkleKiri.style.fontSize = "22px";
sparkleKiri.style.textShadow = "0 0 10px white";


// sparkle kanan
const sparkleKanan = document.createElement("span");
sparkleKanan.innerText = "✦";
sparkleKanan.style.position = "absolute";
sparkleKanan.style.right = "-38px";
sparkleKanan.style.top = "5px";
sparkleKanan.style.color = "white";
sparkleKanan.style.fontSize = "22px";
sparkleKanan.style.textShadow = "0 0 10px white";


// sparkle atas
const sparkleAtas = document.createElement("span");
sparkleAtas.innerText = "✦";
sparkleAtas.style.position = "absolute";
sparkleAtas.style.top = "-8px";
sparkleAtas.style.left = "25%";
sparkleAtas.style.color = "white";
sparkleAtas.style.fontSize = "15px";
sparkleAtas.style.textShadow = "0 0 10px white";


// sparkle atas kanan
const sparkleAtasKanan = document.createElement("span");
sparkleAtasKanan.innerText = "✦";
sparkleAtasKanan.style.position = "absolute";
sparkleAtasKanan.style.top = "-5px";
sparkleAtasKanan.style.right = "25%";
sparkleAtasKanan.style.color = "white";
sparkleAtasKanan.style.fontSize = "14px";
sparkleAtasKanan.style.textShadow = "0 0 10px white";


judulUtama.appendChild(sparkleKiri);
judulUtama.appendChild(sparkleKanan);
judulUtama.appendChild(sparkleAtas);
judulUtama.appendChild(sparkleAtasKanan);


// memperbarui jumlah awal
perbaruiJumlah();