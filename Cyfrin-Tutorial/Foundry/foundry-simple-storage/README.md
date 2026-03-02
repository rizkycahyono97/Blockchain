# FundMe with Foundry Project

Project ini adalah implementasi Smart Contract menggunakan **Foundry**. Terdiri dari sistem pendanaan (`FundMe`) yang diintegrasikan dengan sistem pemilihan pemenang secara acak (`Lottery`).

## 📂 Struktur Folder

```text
.
├── src/                # Smartcontract (logic utama)
├── script/             # Script Deployment dan interaksi
├── test/               # Unit testing & Integration testing
├── lib/                # Library eksternal (Forge-std, Chainlink, dll)
├── out/                # Hasil kompilasi (Artifacts)
└── broadcast/          # Log transaksi deployment

```

---

## 🚀 Memulai (Getting Started)

### Prasyarat

- [Foundry](https://getfoundry.sh/) sudah terinstal.
- Paham dasar-dasar CLI.

### Instalasi

```bash
git clone <repository-url>
cd foundry-simple-storage
forge install
forge build

```

---

## 🔐 Manajemen Private Key (Keamanan)

**Jangan pernah menyimpan Private Key dalam bentuk teks biasa di file .env untuk mainnet!**

### 1. Cara Paling Aman (Encrypted Keystore)

Gunakan fitur dompet bawaan Foundry:

```bash
# Impor key ke dalam storage terenkripsi
cast wallet import yourAccountName --interactive

# Gunakan saat deploy
forge script script/SimpleStorage.s.sol --rpc-url $RPC_URL --account yourAccountName --broadcast

```

### 2. Cara Cepat (File .env) - _Hanya untuk Testing/Local_

cp `.env.example` `.env`:

```env
PRIVATE_KEY=
LOCAL_RPC_URL=127.0.0.1:8545
SEPOLIA_RPC_URL=

```

Lalu jalankan `source .env`.

---

## 🛠 Deployment

### 1. Deploy ke Local (Anvil)

Jalankan Anvil di terminal terpisah:

```bash
anvil

```

Deploy kontrak:

```bash
forge script script/SimpleStorage.s.sol --rpc-url http://127.0.0.1:8545 --private-key $PRIVATE_KEY --broadcast

```

### 2. Deploy ke Testnet (Sepolia)

```bash
forge script script/SimpleStorage.s.sol --rpc-url $SEPOLIA_RPC_URL --account $PRIVATE_KEY --broadcast --verify

```

---

## 🧪 Pengujian (Testing)

Menjalankan semua test:

```bash
forge test

```

Melihat cakupan kode (gas usage):

```bash
forge test --gas-report

```

---

## 📜 Fitur Kontrak

- **FundMe**: Mengumpulkan dana dari user dengan batasan minimum USD (menggunakan Chainlink Price Feeds).
- **Lottery**: Memilih pemenang secara acak dari daftar donatur (menggunakan Chainlink VRF untuk keadilan _on-chain_).
- **Withdraw**: Hanya pemilik (_Owner_) yang dapat menarik dana.

---

## 💡 Perintah Berguna Lainnya

- **Format Kode**: `forge fmt`
- **Update Library**: `forge update`
- **Snapshot Gas**: `forge snapshot`
