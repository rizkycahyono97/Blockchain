# 📌 FundMe – Hardhat + Ignition + Chainlink

Smart contract sederhana untuk menerima donasi ETH dengan validasi minimum USD menggunakan Chainlink Price Feed.

Project ini dibuat menggunakan:

- Solidity `0.8.28`
- Hardhat 3
- Hardhat Ignition (deployment system)
- Ethers v6
- Mocha + Chai (testing)
- Chainlink Price Feed (Sepolia)

---

# 📂 Struktur Project

```
.
├── contracts/
│   ├── FundMe.sol
│   └── PriceConverter.sol
│
├── ignition/
│   ├── modules/
│   │   ├── FundMeLocal.ts
│   │   └── FundMeSepolia.ts
│   └── deployments/
│
├── scripts/
│   ├── fund.ts
│   └── withdraw.ts
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

# 🧠 Penjelasan Singkat Contract

## 🔹 FundMe.sol

Fitur utama:

- Minimum funding dalam USD (`MINIMUM_USD`)
- Integrasi Chainlink ETH/USD Price Feed
- Tracking funders
- Withdraw hanya oleh owner
- Custom error
- receive() & fallback() support

### Fungsi Utama

```solidity
fund()               // Mengirim ETH ke contract
withdraw()           // Withdraw semua balance (owner only)
cheaperWithdraw()    // Withdraw versi lebih gas efficient
```

---

# ⚙️ Setup Project

## 1️⃣ Install Dependency

```bash
pnpm install
```

---

## 2️⃣ Buat File .env

bisa membuat .env atau nanti disuruh mengisikan env secara manual dari hardhat ketika deploy

```bash
cp .env.example .env
```

---

# 🏗 Compile Contract

```bash
pnpm compile
```

---

# 🚀 Deployment

## 🔹 Local Deployment

Jalankan local node:

```bash
pnpm node
```

Deploy ke localhost:

```bash
pnpm deploy:local
```

---

## 🔹 Deploy ke Sepolia

```bash
pnpm deploy:sepolia
```

Price Feed Sepolia yang digunakan:

```
0x694AA1769357215DE4FAC081bf1f309aDC325306
```

---

# 💰 Interaction Script

## Fund Contract

Local:

```bash
pnpm fund:local
```

Sepolia:

```bash
pnpm fund:sepolia
```

---

## Withdraw Contract

Local:

```bash
pnpm withdraw:local
```

Sepolia:

```bash
pnpm withdraw:sepolia
```

---

# 🧪 Testing

## Unit Test (Mocked)

```bash
pnpm test
```

Menggunakan Hardhat Network dan mock price feed.

---

## Staging Test (Sepolia)

```bash
pnpm test:sepolia
```

Menggunakan:

- Real Chainlink
- Real Sepolia network
- Real ETH transfer

---

# 🏗 Package.json Scripts

Contoh scripts:

```json
{
  "scripts": {
    "node": "hardhat node",
    "compile": "hardhat compile",
    "deploy:local": "...",
    "deploy:sepolia": "...",
    "fund:local": "...",
    "fund:sepolia": "...",
    "withdraw:local": "...",
    "withdraw:sepolia": "...",
    "test": "hardhat test",
    "test:sepolia": "hardhat test --network sepolia"
  }
}
```

---

# 🔐 Security Notes

- Owner-only withdraw menggunakan custom error
- Menggunakan `.call()` untuk transfer ETH
- Storage di-encapsulate menggunakan private state variable
- Getter dibuat manual untuk kontrol API

---

# 📈 Development Flow

1. Compile
2. Unit test
3. Deploy local
4. Interaction testing
5. Deploy testnet
6. Staging test

---

# 🎯 Tujuan Project

Project ini bertujuan untuk:

- Memahami storage vs memory
- Integrasi Chainlink Price Feed
- Unit vs Staging Testing
- Deployment menggunakan Hardhat Ignition
- Automation script untuk interaction

---

# 👨‍💻 Author

Rizky Cahyono Putra
GitHub: [https://github.com/rizkycahyono97](https://github.com/rizkycahyono97)

---
