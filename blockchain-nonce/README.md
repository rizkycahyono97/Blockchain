# 🧱 Simple Blockchain with Proof of Work (Python + Flask)

Project ini merupakan **implementasi blockchain sederhana** menggunakan **Python** dan **Flask** yang bertujuan untuk **pembelajaran konsep inti blockchain**, bukan untuk produksi.

Blockchain ini mengimplementasikan:

- Genesis Block
- Transaction Mempool
- Proof of Work (PoW)
- Hash Block & Hash of Previous Block
- Mining Reward
- Multi-node (basic networking)
- Longest Chain Consensus (simplified)

---

## 📌 Tujuan Project

- Memahami **alur data blockchain**
- Memahami **Proof of Work (PoW)**
- Memahami **hubungan antar block melalui hash**
- Mensimulasikan **mining dan konsensus sederhana**
- Membangun blockchain **tanpa database**

---

## ⚙️ Teknologi yang Digunakan

- Python 3.x
- Flask
- hashlib (SHA-256)
- requests
- uuid
- JSON

---

## 🧠 Konsep Dasar Blockchain yang Digunakan

### 1️⃣ Block Structure

Setiap block memiliki struktur:

```json
{
  "index": 2,
  "timestamp": 1768134856.26,
  "transactions": [],
  "nonce": 55417,
  "hash_of_previous_block": "abc123...",
  "hash": "def456..."
}
```

| Field                  | Fungsi                       |
| ---------------------- | ---------------------------- |
| index                  | Urutan block                 |
| timestamp              | Waktu pembuatan block        |
| transactions           | Daftar transaksi dalam block |
| nonce                  | Angka hasil PoW              |
| hash_of_previous_block | Hash block sebelumnya        |
| hash                   | Hash block itu sendiri       |

---

### 2️⃣ Genesis Block

Genesis block adalah block pertama dalam blockchain.

Karakteristik:

- `hash_of_previous_block = "0"`
- `nonce = 0`
- Tidak melalui mining

Genesis block dibuat saat **object Blockchain diinisialisasi**.

---

### 3️⃣ Transaction & Mempool

Transaksi **tidak langsung masuk ke block**.

Alurnya:

1. Transaksi dikirim ke endpoint `/transaction/new`
2. Transaksi disimpan di **mempool (`current_transactions`)**
3. Saat mining, seluruh mempool dimasukkan ke block baru

> Ini meniru konsep blockchain asli seperti Bitcoin.

---

### 4️⃣ Proof of Work (PoW)

Mining dilakukan dengan mencari nilai `nonce` sehingga:

```text
SHA256(index + previous_hash + transactions + nonce)
```

menghasilkan hash yang **diawali dengan sejumlah nol tertentu**:

```python
difficulty_target = "0000"
```

Semakin banyak nol → semakin sulit mining.

---

### 5️⃣ Mining

Saat endpoint `/mine` dipanggil:

1. Node menambahkan **reward transaction**
2. Node melakukan PoW
3. Jika nonce ditemukan:

   - block baru dibuat
   - transaksi dipindahkan dari mempool ke block
   - block ditambahkan ke chain

---

### 6️⃣ Hash Block & Integrity

Setiap block menyimpan hash-nya sendiri.

Jika satu block diubah:

- hash berubah
- block setelahnya menjadi tidak valid

Inilah yang menjaga **immutability blockchain**.

---

### 7️⃣ Konsensus (Longest Chain Rule)

Jika terdapat banyak node:

- Node akan memilih blockchain dengan **panjang terpanjang**
- Chain juga harus **valid secara struktur dan PoW**

```python
if length > max_length and self.is_chain_valid(chain):
```

Ini adalah versi sederhana dari konsensus PoW.

---

## 🌐 API Endpoint

### 🔹 GET `/blockchain`

Menampilkan seluruh blockchain.

**Response:**

```json
{
  "chain": [...],
  "length": 2
}
```

---

### 🔹 POST `/transaction/new`

Menambahkan transaksi ke mempool.

**Body:**

```json
{
  "sender": "address1",
  "recipient": "address2",
  "amount": 10
}
```

---

### 🔹 GET `/mine`

Menambang block baru dan mendapatkan reward.

---

### 🔹 POST `/nodes/add_nodes`

Menambahkan node lain ke jaringan.

**Body:**

```json
{
  "nodes": ["http://127.0.0.1:5001", "http://127.0.0.1:5002"]
}
```

---

### 🔹 GET `/nodes/sync`

Sinkronisasi blockchain dengan node lain.

---

## ▶️ Cara Menjalankan Project

### Clone Repository

```bash
git clone https://github.com/rizkycahyono97/Blockchain
cd blockchain
```

### Venv

```bash
python3 venv venv
. ./venv/bin/activate
```

### Install Dependency

```bash
pip install -r requirements.txt
```

### Jalankan Node

```bash
python blockchain.py 5000
```

Jalankan node lain di port berbeda:

```bash
python blockchain.py 5001
python blockchain.py 5002
```

---

## 🧪 Contoh Alur Testing

1. Kirim transaksi ke salah satu node
2. Mining block
3. Sinkronisasi node lain
4. Lihat chain di semua node

---

## ⚠️ Catatan Penting

Project ini **tidak untuk produksi**.

Belum memiliki:

- Digital signature
- Validasi saldo
- UTXO / account model
- Dynamic difficulty
- Block broadcast real-time
- Protection dari double spending

---

## 🎯 Tujuan Akhir

Project ini ditujukan untuk:

- Memahami **cara kerja blockchain**
- Memahami **Proof of Work**
- Menjadi dasar sebelum mempelajari:

  - Bitcoin
  - Ethereum
  - Distributed systems
  - Consensus algorithms
