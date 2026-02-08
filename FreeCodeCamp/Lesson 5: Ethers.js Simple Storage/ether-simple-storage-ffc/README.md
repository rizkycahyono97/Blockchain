# 🚀 Ethereum Smart Contract: Tutorial Deploy & Interaksi

Proyek ini berisi kumpulan script JavaScript menggunakan library **Ethers.js** untuk mengelola siklus hidup Smart Contract, mulai dari kompilasi otomatis, deployment ke jaringan lokal (Ganache) atau Testnet (Sepolia), hingga berinteraksi dengan fungsi kontrak.

## 📋 Daftar Isi

1. [Prasyarat](https://www.google.com/search?q=%23-prasyarat)
2. [Konfigurasi Lingkungan](https://www.google.com/search?q=%23-konfigurasi-lingkungan)
3. [Tahap 1: Kompilasi (compiler.js)](https://www.google.com/search?q=%23tahap-1-kompilasi-compilerjs)
4. [Tahap 2: Deployment (1.deploy.js)](https://www.google.com/search?q=%23tahap-2-deployment-1deployjs)
5. [Tahap 3: Transaksi Manual (2.send.js)](https://www.google.com/search?q=%23tahap-3-transaksi-manual-2sendjs)
6. [Tahap 4: Interaksi Kontrak (3.interacting.js)](https://www.google.com/search?q=%23tahap-4-interaksi-kontrak-3interactingjs)
7. [Tips Optimasi & Troubleshooting](https://www.google.com/search?q=%23-tips-optimasi--troubleshooting)

---

## 🛠️ Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js** (Versi terbaru disarankan v20+)
- **NPM** (Terinstal bersama Node.js)
- **Wallet MetaMask** (Dengan saldo faucet Sepolia ETH)
- **Akun Alchemy** (Untuk mendapatkan URL RPC Sepolia)

### Instalasi Library

Jalankan perintah berikut di terminal Anda:

```bash
npm install

```

---

## 🔐 Konfigurasi Lingkungan

Buat file bernama `.env` di folder root proyek Anda untuk menyimpan kredensial sensitif, pilih salah satu bisa **local ganache** bisa juga **testnet sepolia alchemy**. **Jangan pernah membagikan file ini!**

```env
# Untuk Lokal (Ganache)
# RPC_URL=http://127.0.0.1:7545
# PRIVATE_KEY=pk_ganache_anda

# Untuk Testnet Sepolia (Alchemy)
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/KODE_API_ALCHEMY_ANDA
PRIVATE_KEY=PRIVATE_KEY_METAMASK_ANDA

```

> **Cara mengambil Private Key MetaMask:** Buka MetaMask > Account Details > Export Private Key.

---

## Tahap 1: Kompilasi (`compiler.js`)

Script ini menggunakan compiler `solc` secara langsung di dalam Node.js. Kelebihannya adalah kita bisa mengatur target **EVM Version** secara spesifik (seperti `paris`) untuk menghindari error _invalid opcode_ pada environment tertentu.

- **Fungsi**: Mengubah kode Solidity menjadi **ABI** dan **Bytecode**.
- **Output**: Menghasilkan file `C.json` (Artifact).

```bash
node compiler.js

##atau

./node_modules/.bin/solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol
```

---

## Tahap 2: Deployment (`1.deploy.js`)

Setelah memiliki `C.json`, kita bisa men-deploy kontrak ke blockchain. Script ini menggunakan **ContractFactory** untuk mengirim kontrak ke jaringan yang ditentukan di `.env`.

- **Konsep Utama**:
- **Provider**: Koneksi read-only ke Sepolia via Alchemy.
- **Signer**: Wallet Anda yang akan menandatangani transaksi dan membayar Gas.
- **waitForDeployment**: Menunggu hingga kontrak resmi tercatat di blok.

```bash
node 1.deploy.js

```

---

## Tahap 3: Transaksi Manual (`2.send.js`)

Script ini menunjukkan cara mengirim transaksi "level rendah" (_low-level_) tanpa menggunakan abstraksi fungsi kontrak. Ini berguna untuk memahami bagaimana data mentah dikirim ke blockchain.

- **Nonce**: Jumlah transaksi yang dikirim oleh alamat tersebut untuk mencegah serangan _replay_.
- **Data**: Berisi _Function Selector_ hasil hash fungsi yang ingin dipanggil.

```bash
node 2.send.js

```

---

## Tahap 4: Interaksi Kontrak (`3.interacting.js`)

Ini adalah tahap akhir di mana kita memanggil fungsi yang ada di dalam Smart Contract (misalnya `store` dan `retrieve`).

- **Metode Read (`retrieve`)**: Tidak membutuhkan gas karena hanya membaca data dari Provider.
- **Metode Write (`store`)**: Membutuhkan gas dan tanda tangan Signer karena mengubah status data di blockchain.

```bash
node 3.interacting.js

```

---

## 🧠 Penjelasan Terminologi Ethers.js

Berdasarkan dokumentasi yang kita gunakan:

| Istilah      | Deskripsi                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Provider** | Kelas yang menyediakan abstraksi koneksi ke jaringan Ethereum (Read-only).                                           |
| **Signer**   | Kelas yang memiliki akses ke **Private Key** untuk menandatangani pesan dan transaksi.                               |
| **Contract** | Abstraksi yang merepresentasikan koneksi ke kontrak spesifik sehingga bisa digunakan seperti objek JavaScript biasa. |

---

## 💡 Tips Optimasi & Troubleshooting

1. **EVM Version**: Jika menggunakan Ganache atau jaringan lama, pastikan `settings.evmVersion` di `compiler.js` diatur ke `paris` untuk menghindari error `invalid opcode` akibat instruksi `PUSH0`.
2. **Gas Limit**: Saat melakukan deploy ke Sepolia, terkadang estimasi gas otomatis gagal. Anda bisa menambahkan `{ gasLimit: 1000000 }` secara manual pada fungsi `.deploy()`.
3. **Konfirmasi Blok**: Gunakan `.wait(1)` untuk memastikan transaksi Anda sudah benar-benar masuk ke dalam setidaknya satu blok sebelum melanjutkan instruksi berikutnya.

---
