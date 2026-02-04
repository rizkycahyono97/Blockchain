# 🗳️  E-Voting Smart Contract Documentation

Smart contract ini dirancang untuk mengelola proses pemungutan suara (voting) secara digital, transparan, dan terdesentralisasi di jaringan Ethereum.

---

## user
```bash
1. owner = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
2. kandidat 1 = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
3. kandidat 2 = 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
```

## 🛠️ Penjelasan Fungsi (Function Deep-Dive)

Berikut adalah rincian logika dari setiap fungsi yang ada di dalam kontrak:

### 1. `constructor()`

* **Kegunaan**: Inisialisasi awal saat kontrak pertama kali dideploy ke blockchain.
* **Logika**: Menetapkan alamat wallet yang melakukan deploy sebagai `owner`. Secara otomatis mengatur status `isSudahBisaVoting` dan `isVotingSelesai` menjadi `false`.

### 2. `daftarkanKandidat(address _addr)`

* **Akses**: Hanya untuk `owner`.
* **Kegunaan**: Menambahkan kandidat baru ke dalam sistem.
* **Validasi**:
* Memastikan pengirim adalah owner.
* Mencegah owner mendaftarkan dirinya sendiri agar tidak terjadi konflik kepentingan.
* Mencegah alamat yang sama terdaftar dua kali melalui mapping `isKandidatTerdaftar`.



### 3. `mulaiVoting(bool _voting)`

* **Akses**: Hanya untuk `owner`.
* **Kegunaan**: Mengubah status gerbang voting. Jika parameter diisi `true`, maka fungsi `voting()` baru bisa digunakan oleh publik.

### 4. `voting(uint _urutanKandidat)`

* **Akses**: Publik (User/Pemilih).
* **Kegunaan**: Memberikan satu suara kepada kandidat tertentu berdasarkan indeks urutan mereka di dalam array.
* **Logika**:
* Mengecek apakah masa voting sudah dibuka.
* Validasi `isUserSudahMemilih` memastikan satu alamat wallet hanya bisa memilih satu kali (anti-curang).
* Menambah nilai `jumlahSuara` pada struct kandidat yang dipilih secara *real-time*.



### 5. `votingSelesai()`

* **Akses**: Hanya untuk `owner`.
* **Kegunaan**: Menutup gerbang voting secara permanen dan menandai bahwa pemenang sudah bisa dihitung.

### 6. `pemenang()`

* **Akses**: Publik (View).
* **Kegunaan**: Mencari kandidat dengan suara terbanyak melalui algoritma pencarian.
* **Logika**:
* Melakukan *looping* di seluruh array `kandidat`.
* Membandingkan `jumlahSuara` untuk menemukan nilai tertinggi.
* Mengembalikan alamat (`address`) dan total suara pemenang.



---

## 📊 Struktur Data Utama

* **`struct Kandidat`**: Menyimpan data identitas (`_addr`) dan akumulasi suara (`jumlahSuara`) dalam satu paket data.
* **`mapping(address => bool) isUserSudahMemilih`**: "Buku tamu" digital untuk mencatat siapa saja yang sudah masuk ke bilik suara agar tidak bisa memilih dua kali.

