console.log("Cape banget wok")

// Aktivitas 1 DOM SELECTION / Seleksi elemen
// Kenapa kita harus seleksi karena "menangkap" atau mengambil id/class
// Mengambil elemen HTML tersebut lalu disimpan di variable javascript

// 1. Mengambil elemen judul utama dan sub judul
// document.getElementById("...") mengambil berdarasarkan atribut id

const judulUtama = document.getElementById("judul-utama"); // menangkap <h1 id="judul-utama">

// document.querySelector("...")
// tanda # artinya id

const subJudul = document.querySelector("#sub-judul"); // menangkap <p id="sub-judul">

// 2. mengambil elemen oada kartu 1 (kartu manipulasi teks dan style)

const tekspreview = document.getElementById("teks-preview");
const boxpreview = document.getElementById("box-preview");
const cardmanipulasi = document.getElementById("card-manipulasi");

// 3. mengambil elemen tombol - tombol aksi pada kartu 1
const btnubahteks = document.getElementById("btn-ubah-teks");
const btntogglewarna = document.getElementById("btn-toggle-warna");
const btnreset = document.getElementById("btn-reset");

// 4. Mengambil elemen pada kartu 2 (fitur catatan dinamis / to do llist sederhana)
const inputcatatan = document.getElementById("input-catatan");
const btntambah = document.getElementById("btn-tambah");
const daftarcatatan = document.getElementById("daftar-catatan");
const jumlahcatatan = document.getElementById("jumlah-catatan");
const pesankosong = document.getElementById("pesan-kosong");

// Aktivitas 2 Manipulasi Reks & Style(cardd 1)
// addEventListener("click", function () {...} artinya adalah tolong dengarkan dulu/ tunggu
// sampai di klik user, jika di klik jalankan perintah di ddalam function

// A. Mengubah teks & warna secara langsung

btnubahteks.addEventListener("click", function () {
    //.innertext = mengganti atau mengisi secara langusng teks yang ada di dalam elemen HTML
    tekspreview.innerText = "WOI TEKS UDAH KE UBAH NIHHH";

    //. Style.color = mengubah warna teks secara langsung (inline style)
    tekspreview.style.color = "#190ee3";

    // console.log = mencetak pesan di console browser
    console.log("[DOM] Teks priview terlah diperbaharui");
})

// B. manipulasi class css menggunakan classlist.toggle()
btntogglewarna.addEventListener("click", function () {
    //.classlist.toggle("mama-class") = fitur saklar otomatis
    boxpreview.classList.toggle("active-mode");
    cardmanipulasi.classList.toggle("highlight");

    console.log("DOM Berhasil di switch!");

})

// C. Mengembalikan (Reset) Teks ke kondisi semula
btnreset.addEventListener("click", function () {
    //1. Kembalikan teks semula teks asli
    tekspreview.innerText = "WOI UBAH TEKS INI MAKE JS";

    //2. Kosongkan warna agar kembali ke warna CSS bawaan
    tekspreview.style.color = "";

    //3. Hapus class khusus untuk menggunakan .classlist.remove("...")
    boxpreview.classList.remove("active-mode");
    cardmanipulasi.classList.remove("highlight");

    console.log("DOM Berhasil di reset!");
});

// Aktivitas 3 & 4 : Elemen Dinamis & Event Handling (TO-DO List sederhana)
// Di aaktivitas ini kita belajar elemen HTML baru (<li>) secara ototmatis dalam javascript
// mengisi teksnya, memberi tombol hapus, lalu menemempelkan ke layar (<ul>)

//Langkah 1 : membuat variiable penampung angka jumlah catatan 
// "let" digunakan untuk nilai variabel yang akan berubah ubah bisa bertambah bisa berkurang (counting)
let totalcatatan = 0;

//langkah 2 : fungsi updaye angka counter & pesan status
function perbaruiJumlah() {
    // Masukan angka total catatan terbaru ke dalam taag <span id="jumlah-catatan">
    jumlahcatatan.innerText = totalcatatan;

    //conditional statment berubah apakah catatannya itu kosong/ 0?
    if (totalcatatan === 0) {
        //Jika 0 : Hapus claass "hidddden supaya teks "Belum ada catatan" mncul ke layar
        pesankosong.classList.remove("hidden");
    } else {
        //Jika lebih dari 0 : tambahkan calss "hidden" agar teks "belum ada catatan" tersembunyi
        pesankosong.classList.add("hidden");
    }
}

// Langkah 3 : Fungsi utama logika tambah catatan baru
function tambahCatatan() {
    //3.1 Inoutcatatan.value fungsinya untuk mengambil teks yang diketik oleh user
    // .trim() = menghapus spasi diawal dan di akhir
    const isiteks = inputcatatan.value.trim();
    
    //3.2 Validasi input : Jika isi teks kosong maka tampilak alert
    if (isiteks === "") {   
        alert("Catataan tidak boleh kosong");
        return;
    }

    //3.3 document create.documentemelement("li") -> memebuat memori baru di javascript secara dinamis
    const liBaru = document.createElement("li");
    liBaru.className = "note-item"; // menambahkan pada tag li

    //3.4 .innerHTML = mengisi struktur di dalam <li> dengan teks catatan dan tombol hapus
    // Tanda backtick (`)
    liBaru.innerHTML = `<span>${isiteks}</span> <button class="btn-hapus">Hapus</button>`;

    //3.5 Menambahkan telinga / event listener untuk tombol haous pada catatan dinamis
    // liBaru.querySelector(".btn-hapus") = mengambil tombol ber class "btn-hapus" khusus yang ada di li
    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function () {
        // Hapus elemen <li> yang sesuai
        liBaru.remove();
        // Perbarui tampilan jumlah catatan untuk update angka di layar
        perbaruiJumlah();
        console.log(`DOM Catatan "${isiteks}" berhasil dihapus`);
    });

    //3.6 appeendChild= untuk memasukan elemen  li ke dalam wadah <ul id="daftar-catatan">
    daftarcatatan.appendChild(liBaru);

    //3.7 Mengosongkan kembali isi kolom input (inputcatatan.value ="") supaya bisa diketik lagi
    inputcatatan.value = "";

    //3.8 totalcatatan++ artinya tanmbah nilai total catatan sebanyak 1, lalu update angka ke layar
    totalcatatan++;
    perbaruiJumlah();

    console.log(`Dom Catatan baru ditambahkan: $(isiteks)`);

}

// Langkah 4: Event Listener klik TOmbol + "tambah"
// Ketika tombol  "+ Tambah" di klik oleh user, maka jalankan fungsi tambah catatan()
btntambah.addEventListener("click", function() {
    tambahCatatan();
})

//Langkah 5: Event Listener Keyboard "Enter" pada kolom input
//Ketika user mengetik di kolom input dan melepas tombol keyboard (`event keyup`);
inputcatatan.addEventListener("keyup", function(event){
    //Periksa apakah tombol keyboard yang ditekan user adalah enter?
    if (event.key === "Enter")
        tambahCatatan(); //Jika ya, jakankan fungsi tambah catatan()
})
