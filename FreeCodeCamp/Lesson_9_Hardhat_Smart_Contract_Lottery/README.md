# 🎟️ Decentralized Raffle (Lottery) DApp

Proyek ini adalah implementasi sistem undian terdesentralisasi menggunakan **Chainlink VRF v2.5** untuk keacakan yang terbukti (provable randomness) dan **Chainlink Automation** untuk eksekusi pemilihan pemenang secara otomatis berdasarkan interval waktu.

## 📝 Penjelasan Kontrak

Kontrak `Raffle.sol` memiliki alur kerja sebagai berikut:

1. **Enter Raffle**: User masuk dengan membayar sejumlah `entranceFee`.
2. **Check Upkeep**: Chainlink Automation mengecek apakah waktu sudah habis, ada pemain, dan kontrak memiliki saldo.
3. **Perform Upkeep**: Jika kondisi terpenuhi, kontrak meminta angka acak ke Chainlink VRF.
4. **Fulfill Random Words**: Chainlink VRF mengirimkan angka acak, kontrak menentukan pemenang, mengirimkan saldo kontrak ke pemenang, dan mereset sistem untuk ronde berikutnya.

---

## 📁 Struktur Folder (Hardhat)

```text
.
├── contracts/
│   ├── Raffle.sol
│   └── test
|        |--VRFCoordinatorV2_5Mock.sol
│
├── ignition/
│   ├── modules/
│   │   ├── RaffleLocal.ts
│   │   └── RaffleSepolia.ts
│   │   └── MockV3Coordinator.ts
│   └── deployments/
│
├── scripts/
│
├── test/
│   ├── unit/
│   └── staging/
│
├── hardhat.config.ts
├── package.json
└── README.md
```

---

## 🚀 Setup Project

1. **Clone & Install Dependencies:**

```bash
git clone https://github.com/rizkycahyono97/Blockchain
cd Blockchain/FreeCodeCamp/Lesson_9_Hardhat_Smart_Contract_Lottery
pnpm install

```

2. **Konfigurasi Environment:**
   saya menggunakan keystore dari hardhat 3:

```env
pnpm hardhat keystore set SEPOLIA_RPC_URL
pnpm hardhat keystore set SEPOLIA_PRIVATE_KEY

```

---

## 🛠️ Deployment

### 1. Local Network (Hardhat Node)

Sangat berguna untuk pengujian cepat tanpa biaya gas asli.

```bash
# Menjalankan node lokal
pnpm hardhat node

# Deploy ke node lokal menggunakan ignition
pnpm hardhat ignition deploy ./ignition/modules/RaffleLocal.ts

```

### 2. Sepolia Testnet

Pastikan kamu memiliki saldo **Sepolia ETH** dan sudah membuat **VRF Subscription** di [vrf.chain.link](https://vrf.chain.link) dan **Chainlink Automation** di [automation.chain.link](https://automation.chain.link).

```bash
pnpm hardhat ignition deploy ./ignition/modules/RaffleLocal.ts --network sepolia --parameters ./ignition/parameters.json

```

---

## 🧪 Testing

Menjalankan unit test untuk memastikan logika `enterRaffle`, `checkUpkeep`, dan `fulfillRandomWords` berjalan benar:

```bash
pnpm hardhat test

```

---

# 👨‍💻 Author

Rizky Cahyono Putra
GitHub: [https://github.com/rizkycahyono97](https://github.com/rizkycahyono97)

---
