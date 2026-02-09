# 👷 Hardhat Simple Storage: Panduan Lengkap

Proyek ini merupakan repositori pembelajaran untuk menguasai Hardhat, framework pengembangan Ethereum yang paling populer. Di sini kita mempelajari cara mengompilasi, men-deploy, menguji, dan melakukan debugging Smart Contract secara profesional.

## 📂 1. Struktur Proyek (Project Structure)

Berikut adalah visualisasi struktur folder proyek ini:

```bash
.
├── artifacts/           # Hasil kompilasi (ABI & Bytecode)
├── cache/               # Data cache untuk mempercepat kompilasi ulang
├── contracts/           # Source code Smart Contract (Solidity)
│   └── SimpleStorage.sol
├── ignition/            # Sistem Deployment baru (Hardhat Ignition)
│   ├── deployments/     # Histori alamat kontrak per jaringan
│   └── modules/         # Logika deployment (SimpleStorage.ts)
├── scripts/             # Script otomatisasi (Interaksi kontrak)
├── task/                # Custom CLI Tasks (block-number.ts)
├── test/                # Unit Testing (Mocha & Chai)
├── hardhat.config.ts    # Konfigurasi utama Hardhat
├── package.json         # Dependensi proyek & Scripts
└── tsconfig.json        # Konfigurasi TypeScript
```

Penjelasan Kegunaan Folder:

- **contracts/**: Tempat Anda menyimpan logika blockchain. Setiap file .sol di sini akan dikompilasi oleh Hardhat.

- **ignition/**: Menggantikan script deploy tradisional. Ia melacak status deployment sehingga jika gagal, Anda bisa melanjutkan tanpa mengulang dari awal.

- **test/**: Folder paling krusial. Berisi pengujian logika kontrak untuk memastikan tidak ada celah keamanan.

- **task/**: Tempat Anda memperluas kemampuan Hardhat CLI dengan perintah buatan sendiri.

- **artifacts/**: Jangan mengedit folder ini. Di dalamnya terdapat file .json yang berisi ABI yang dibutuhkan oleh frontend (ethers.js) untuk berkomunikasi dengan kontrak.

## 🚀 2. Deploying SimpleStorage dari Hardhat

Deployment dilakukan menggunakan Hardhat Ignition. Kelebihannya adalah ia otomatis memverifikasi status deployment.

Perintah Deploy ke Local Network:

```bash
npx hardhat ignition deploy ignition/modules/SimpleStorage.ts
```

## 🌐 3. Networks in Hardhat

Hardhat mendukung berbagai jaringan. Secara default, ia menggunakan jaringan internal (Hardhat Network) yang akan hilang saat proses selesai.

Untuk men-deploy ke jaringan persisten (seperti Sepolia), Anda perlu mengaturnya di hardhat.config.ts.

Deploy ke Sepolia Testnet:

```bash
npx hardhat ignition deploy ignition/modules/SimpleStorage.ts --network sepolia
```

## 🔗 4. Interacting with Contracts in Hardhat

Setelah kontrak ter-deploy, kita bisa berinteraksi dengannya menggunakan script yang memanfaatkan library ethers.

Contoh menjalankan script interaksi:

```bash
npx hardhat run scripts/simpleStorage.ts --network localhost
```

Skrip ini biasanya mengambil instance kontrak menggunakan ethers.getContractAt dan memanggil fungsi seperti store() atau retrieve().

## 🛠️ 5. Custom Hardhat Tasks

Task adalah perintah yang bisa Anda panggil langsung dari terminal menggunakan npx hardhat <nama-task>. Proyek ini memiliki task untuk mengecek nomor blok.

Menjalankan Task Custom:

```bash
npx hardhat block-number --network sepolia
```

Task didefinisikan di folder task/ dan di-import ke dalam konfigurasi utama.

## 💻 6. Hardhat Localhost Node

Anda bisa menjalankan blockchain lokal yang persisten di komputer Anda (seperti Ganache, tapi lebih ringan).

Menjalankan Node Lokal:

```bash
npx hardhat node
```

Node ini akan memberikan 20 akun dummy dengan masing-masing 10,000 ETH untuk keperluan testing. Jangan tutup terminal ini saat melakukan deployment lokal.

## 🧪 7. Hardhat Tests

Pengujian adalah bagian terpenting dalam Web3 karena kontrak yang sudah di-deploy tidak bisa diubah (immutable).

Menjalankan Test:

```bash
npx hardhat test
```

Menjalankan Test Spesifik:

```bash
npx hardhat test test/Counter.ts
```

## 🖥️ 8. The Hardhat Console

Hardhat Console adalah lingkungan JavaScript interaktif yang memungkinkan Anda "mengobrol" langsung dengan blockchain tanpa harus membuat file skrip.

Masuk ke Console:

```bash
npx hardhat console --network localhost
```

Contoh Perintah di Console:

```bash
const storage = await ethers.getContractFactory("SimpleStorage");
const deployed = await storage.deploy();
await deployed.retrieve();
```

## 📊 9. Hardhat Gas Reporter

Plugin ini sangat berguna untuk mengoptimalkan efisiensi kode Anda. Ia akan mencetak tabel yang menunjukkan berapa banyak biaya Gas (dalam Gwei dan USD) yang dihabiskan oleh setiap fungsi kontrak Anda.

Cara Melihat Laporan Gas:
Cukup jalankan **--gas-stats**, dan laporan akan muncul di akhir proses:

```bash
npx hardhat test --gas-stats
npx hardhat test solidity --gas-stats
npx hardhat test nodejs --gas-stats
```

Laporan ini membantu Anda menentukan apakah kontrak Anda terlalu "mahal" untuk dijalankan oleh pengguna di Mainnet.

### DOCS RESMI

```bash

```
