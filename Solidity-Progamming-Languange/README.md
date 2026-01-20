# 📚 Belajar Solidity Dasar

Repositori ini berisi kumpulan materi latihan Smart Contract menggunakan bahasa pemrograman Solidity. Urutan di bawah ini dirancang agar Anda dapat memahami konsep blockchain secara bertahap.

## 🚀 Daftar Materi (Urutan Belajar)

### 1. Dasar-Dasar & Sintaksis

Memahami struktur dasar kontrak, tipe variabel, dan bagaimana data disimpan.

- **VariableTypes.sol**: Mengenal tipe data seperti `uint`, `int`, `bool`, `address`, dan `string`.
- **BasicSyntaxContract.sol**: Struktur dasar kontrak dengan fungsi `get` dan `set` sederhana.

### 2. Fungsi & Aliran Data

Mempelajari cara membuat fungsi, visibilitasnya, serta lokasi penyimpanan data.

- **FunctionContract.sol**: Penggunaan parameter fungsi dan nilai kembalian (_return values_).
- **Location.sol**: Perbedaan antara `storage`, `memory`, dan `calldata` dalam menangani variabel.

### 3. Struktur Data Lanjutan

Mengorganisir data yang lebih kompleks menggunakan list dan objek.

- **ArrayContract.sol**: Cara membuat dan memanipulasi daftar data (array statis dan dinamis).
- **Struct.sol**: Membuat tipe data kustom sendiri menggunakan `struct`.
- **MappingContract.sol**: Implementasi _key-value pair_ (seperti kamus/dictionary) untuk efisiensi pencarian data.

### 4. Interaksi dengan Ether

Bagian krusial yang membedakan Solidity dengan bahasa pemrograman lain: pengelolaan uang (Ether).

- **Payable.sol**: Fungsi dan alamat yang dapat menerima Ether.
- **AddressContract.sol**: Interaksi dengan alamat wallet, mengirim saldo, dan mengecek saldo kontrak.

### 5. OOP & Pewarisan (Inheritance)

Menggunakan kembali kode (_reusability_) dan mengatur hierarki antar kontrak.

- **SingleInheritance.sol**: Mewariskan sifat dari satu kontrak ke kontrak lainnya.
- **MultipleInheritance.sol** & **MultipleInheritance1.sol**: Mewarisi dari banyak kontrak sekaligus.
- **HierarchyInheritace.sol**: Skema pewarisan yang lebih kompleks dan bercabang.
- **Abstract.sol**: Membuat kontrak "cetak biru" yang wajib diimplementasikan oleh kontrak turunannya.

---

## 📝 Contoh Kode Singkat

Berikut adalah cuplikan logika yang sering digunakan dalam file-file di atas:

### Pemakaian Struct & Mapping (Struct.sol / MappingContract.sol)

```solidity
struct Kandidat {
    address addr;
    uint jumlahSuara;
}

mapping(address => bool) public sudahMemilih;
Kandidat[] public daftarKandidat;

function tambahKandidat(address _kandidat) public {
    daftarKandidat.push(Kandidat(_kandidat, 0));
}

```

### Fungsi Payable & Withdraw (Payable.sol)

```solidity
address payable public owner;

constructor() {
    owner = payable(msg.sender); // Orang yang deploy menjadi owner
}

function deposit() public payable {
    // Otomatis menambah saldo kontrak
}

function withdraw() public {
    require(msg.sender == owner, "Hanya owner yang bisa menarik");
    uint saldo = address(this).balance;
    owner.transfer(saldo);
}

```

---

## 🛠 Cara Menjalankan

1. git clone **https://github.com/rizkycahyono97/Blockchain**
2. buka folder **Solidity-Progamming-Language**.
3. Compile salah satu file _.sol_ yang ada di **contracts/**
4. Tekan tombol **Deploy** dan mulai berinteraksi dengan fungsi-fungsinya.

---
