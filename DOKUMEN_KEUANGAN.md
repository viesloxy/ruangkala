# Dokumen Keuangan & Alur Bisnis — RuangKala
## Platform Pinjam-Sewa Perlengkapan Antar-Mahasiswa · Kelompok 10 D4 TI Vokasi UNAIR

> Dokumen ini menjelaskan alur pengguna, alur keuangan, sumber pendapatan, struktur biaya, dan proyeksi laba/rugi untuk keperluan presentasi Kewirausahaan Bidang TI.

---

## 1. Ringkasan Model Bisnis

RuangKala adalah **marketplace dua sisi (two-sided marketplace)** yang menghubungkan **peminjam** (divisi perlengkapan kepanitiaan & mahasiswa) dengan **pemilik barang** (mahasiswa pribadi & inventaris ormawa). Platform tidak membeli barang — ia hanya **memfasilitasi transaksi** dan mengambil **biaya layanan mikro**.

| Elemen | Keterangan |
|---|---|
| Pelanggan | Divisi perlengkapan kepanitiaan & mahasiswa (pengguna) + pemilik barang (penyedia) |
| Nilai yang dijual | Kepastian ketersediaan barang per tanggal + identitas terverifikasi + bukti LPJ |
| Sumber pendapatan | 3 aliran: biaya transaksi Rp1.000, langganan Ormawa Rp99.000/semester, paket proker Rp25.000/acara |
| Struktur biaya | Hosting + domain + notifikasi + MDR QRIS (0%) + biaya tetap operasional |
| Target BEP | 12 organisasi langganan OR 60 transaksi/bulan (dari total ~20 ormawa Vokasi) |

---

## 2. Alur Pengguna (User Flow) — 3 Role

### 2.1 Mahasiswa (Peminjam & Pemilik)
Landing -> Daftar/Masuk -> Verifikasi NIM+KTM -> Dashboard
  - Mode Peminjam: Cari barang -> Pilih tanggal -> Ajukan -> Bayar (kuota/QRIS) -> Serah-terima
  - Mode Pemilik: Upload barang -> Terima permintaan -> Setujui/Tolak -> Serah-terima

### 2.2 Ormawa / Kepanitiaan
Landing -> Daftar Ormawa -> Verifikasi SK -> Dashboard Ormawa
  - Buat Proker -> SPS Termin 1 & 2 -> Katalog -> Ajukan Sewa
  - Approval Berlapis (Ketua -> Bendahara -> BPI/SC) -> LPJ
  - Inventaris Ormawa (atur lingkup R-03)

### 2.3 Admin Platform
Landing -> Login Admin -> Dashboard
  - Verifikasi akun (NIM/KTM/SK)
  - Kelola kampus & klaster
  - Sengketa & blacklist NIM
  - Ringkasan transaksi

---

## 3. Alur Keuangan (Money Flow) — Dari Mana Uangnya?

### 3.1 Diagram Aliran Dana

```
                    +|------------------+
                    |  MAHASISWA       |
                    |  (Peminjam)      |
                    +--------+---------+
                             | Bayar sewa + biaya layanan
                             v
+------------+     +-----------------+     +------------+
|  PEMILIK   |---->|   RUANGKALA     |<----|  ORMAWA    |
|  Barang    |     |   (Platform)    |     | (Langganan)|
+------------+     +--------+--------+     +------------+
                            |         |
                   Sewa diteruskan  Biaya tetap
                   ke pemilik       (hosting dll)
                            |         |
                            v         v
                     +-----------+ +-----------+
                     |  PEMILIK  | |  SERVER   |
                     |  (Dana)   | |  & OPS    |
                     +-----------+ +-----------+
```

### 3.2 Tiga Sumber Pendapatan (Revenue Streams)

| # | Sumber | Tarif | Siapa Bayar | Kapan |
|---|---|---|---|---|
| 1 | Biaya layanan per transaksi | Rp1.000/transaksi | Mahasiswa (setelah 3 kuota gratis habis) | Saat checkout |
| 2 | Langganan Ormawa | Rp99.000/semester | Ormawa (Hima/BEM/UKM) | Per semester |
| 3 | Paket Proker | Rp25.000/acara | Kepanitiaan | Per acara |

### 3.3 Alur Biaya per Transaksi (Mahasiswa)

```
Peminjam:                                  Pemilik:
  Biaya sewa (ke pemilik)  Rp50.000          Terima Rp50.000
  Biaya platform           Rp1.000           (tidak dipotong)
  --------------------- -----
  Total dibayar            Rp51.000

Jika Ormawa berlangganan (Rp99rb/sem):
  Biaya platform = Rp0 (gratis)
  Peminjam hanya bayar sewa ke pemilik
```

### 3.4 Alur Biaya per Transaksi (Ormawa)

```
Kepanitiaan:
  Sewa barang (ke pemilik)     Rp240.000
  Biaya platform               Rp0 (langganan aktif)
  --------------------- -------
  Total                        Rp240.000

Platform menerima Rp99.000/semester dari Ormawa
  (bukan per transaksi - flat, lebih mudah diprediksi)
```

---

## 4. Struktur Biaya (Cost Structure)

| Biaya | Per Bulan | Keterangan |
|---|---|---|
| Hosting (Vercel/Netlify) | Rp0-50.000 | Free tier cukup untuk prototype |
| Domain (.com) | Rp15.000 | Setahun ~Rp180.000 |
| Database (Supabase free) | Rp0 | Free tier 500MB |
| Notifikasi WA (Fonnte) | Rp50.000 | 1.000 pesan/bulan |
| QRIS MDR | 0% | Transaksi <= Rp100.000 bebas biaya (BI) |
| Total tetap/bulan | ~Rp65.000-100.000 | Skala prototype |
| Total tetap/semester | ~Rp400.000-600.000 | Untuk BEP |

---

## 5. Proyeksi Laba/Rugi (BEP)

### 5.1 Skenario Dasar (1 Fakultas - 20 Ormawa Vokasi)

| Model | Target | Pendapatan | Biaya | Laba |
|---|---|---|---|---|
| Langganan saja | 12/20 ormawa x Rp99rb | Rp1.188.000/sem | Rp500.000 | Rp688.000/sem |
| Transaksi saja | 60 trx/bln x Rp1.000 x 6bln | Rp360.000/sem | Rp500.000 | -Rp140.000 (Rugi) |
| Hybrid | 12 langganan + 30 trx/bln | Rp1.368.000/sem | Rp500.000 | Rp868.000/sem |

### 5.2 Skenario Ekspansi (3-5 Kampus Klaster Surabaya Timur)

| Model | Target | Pendapatan | Biaya | Laba |
|---|---|---|---|---|
| Hybrid 3 kampus | 15 langganan + 6 proker + 210 trx/bln | Rp3.645.000/sem | Rp1.200.000 | Rp2.445.000/sem |

### 5.3 Kesimpulan BEP
- Model langganan lebih stabil — 12 dari 20 ormawa cukup untuk BEP
- Model transaksi sulit — butuh 60 trx/bulan (terlalu banyak untuk 1 fakultas)
- Rekomendasi: Fokus langganan Ormawa, transaksi sebagai pelengkap

---

## 6. Alur Bisnis End-to-End (Ringkas)

Mahasiswa:
1. Daftar -> verifikasi NIM -> dapat 3 kuota gratis
2. Cari barang di katalog -> pilih tanggal -> ajukan
3. Pemilik setujui -> tanggal terkunci
4. Bayar: kuota gratis (Rp0) atau QRIS Rp1.000
5. Serah-terima fisik -> foto kondisi -> rating
6. Selesai -> barang kembali -> reputasi NIM terupdate

Ormawa:
1. Daftar ormawa -> verifikasi SK -> 1 acara trial gratis
2. Buat proker -> SPS 2 termin -> cari barang
3. Ajukan sewa -> approval 4 tahap -> LPJ
4. Bayar langganan Rp99rb/semester (atau Rp25rb/acara)
5. Selesai -> LPJ terbit -> laporan pertanggungjawaban