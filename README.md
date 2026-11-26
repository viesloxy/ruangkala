# RuangKala

**Platform Pinjam-Sewa Perlengkapan Antar-Mahasiswa** — kunci tanggal, sewa alat kepanitiaan dari mahasiswa di kampusmu (dan klaster terdekat), tanpa japri berantai.

Prototipe web fungsional (dapat di-deploy) untuk tugas **Kewirausahaan Bidang TI — Kelompok 10, D4 Teknik Informatika, Fakultas Vokasi UNAIR**.

> Status: prototipe demo. Seluruh data disimpan di `localStorage` browser (tanpa backend), sehingga cocok untuk presentasi dan uji coba alur.

---

## ✨ Fitur Utama

### 3 Peran (sesuai spesifikasi)
| Peran | Ringkasan |
|------|-----------|
| **Mahasiswa** | Cari & sewa perlengkapan, 3 transaksi pertama gratis lalu Rp1.000/transaksi via QRIS, mode pemilik untuk menyewakan barang pribadi |
| **Ormawa / Kepanitiaan** | SPS 2 Termin, approval berlapis (Ketua → Bendahara → BPI → SC), LPJ, inventaris internal (R-03), paket Rp25.000/proker atau Rp99.000/semester |
| **Admin Platform** | Verifikasi akun (NIM/KTM & SK), kelola kampus & klaster, sengketa & blacklist, laporan keuangan |

### Alur inti
- **Kunci tanggal anti-batal** — begitu disetujui, slot tanggal terkunci di katalog.
- **Serah-terima terdokumentasi** — foto kondisi awal & akhir, checklist kelengkapan, rating reputasi NIM.
- **Pembayaran platform** — kuota gratis / QRIS Rp1.000 (simulasi), sewa dibayar langsung ke pemilik (COD kampus).
- **Klaster kampus** — perluas pencarian ke kampus tetangga dengan satu ketuk.
- **Mode Pemilik** — unggah/edit barang pribadi, atur tarif & lingkup akses, kelola permintaan masuk.

### Halaman
Landing (pricing, cara kerja, FAQ) · Login/Register split-screen · Katalog & filter · Detail & kunci tanggal · Checkout & status pembayaran · Dashboard Mahasiswa · Pinjaman Saya · Barang Saya · Profil & verifikasi · Serah-Terima · Dashboard Ormawa · Paket & Langganan · SPS 2 Termin · Approval & LPJ · Inventaris Ormawa · Admin Platform · Keuangan Platform.

---

## 🧱 Tech Stack

- **Vite 8** + **React 19** + **TypeScript**
- **React Router 7** (HashRouter — SPA aman di hosting statis tanpa rewrite)
- **Framer Motion** (animasi) + **Lenis** (smooth scroll)
- **Lucide React** (ikon)
- CSS murni dengan CSS variables (design system, tanpa framework UI)
- **Oxlint** untuk linting

**Font:** `JetBrains Mono` (angka/NIM/kode) via Google Fonts; teks memakai `SF Pro Rounded` dengan fallback `Segoe UI`/system UI.

---

## 🎨 Design System — "Airy Azure & Obsidian"

- **Latar:** `#F5F7FA` + sapuan langit biru di atas (`linear-gradient(#7DC2FF → #C6E3FF → #F5F7FA)`).
- **Kartu:** putih `#FFFFFF`, border `1px #ECEFF4`, radius `20–24px`, bayangan sangat lembut.
- **Aksi utama:** gradien azure `#2898FF → #0D67E8`, bentuk pill (`9999px`).
- **Chip/tag:** putih dengan border tipis (`.chip-light`), bentuk pill — dibuat menyatu, tanpa warna gelap yang “nabrak”.
- **Tipografi:** hierarki berbasis ukuran, warna `#0F1115` (ink) & `#6B7485` (muted).
- **Ikon container:** konsisten bulat (`border-radius: 50%`), ukuran tombol konsisten (34 / 42 / 48 px).

---

## 🚀 Menjalankan Secara Lokal

Prasyarat: **Node.js 20+** dan npm.

```bash
npm install
npm run dev        # http://localhost:5173
```

Perintah lain:

```bash
npm run build      # build produksi ke folder dist/
npm run preview    # pratinjau hasil build
npm run lint       # oxlint
```

---

## 📁 Struktur Proyek

```
frontend-app/
├─ public/                 # aset statis (logo, favicon multi-ukuran)
├─ src/
│  ├─ context/             # AppContext (state global + localStorage)
│  ├─ data/                # mock data & daftar kampus
│  ├─ hooks/               # useSmoothScroll, dll
│  ├─ layouts/             # DashboardLayout (sidebar + topbar)
│  ├─ views/               # 15+ halaman (Landing, Login, Katalog, dll)
│  ├─ App.tsx              # routing + role guard
│  ├─ index.css            # design system & komponen CSS
│  ├─ types.ts             # tipe domain
│  └─ utils.tsx            # helper format & badge
├─ gen_favicon.py          # generator favicon dari logo
├─ index.html
└─ vite.config.ts
```

---

## 🗺️ Rute Aplikasi

| Route | Halaman | Role |
|---|---|---|
| `/` | Landing (pricing, cara kerja, FAQ) | Guest |
| `/paket` | Halaman Harga publik | Guest |
| `/panduan` | Panduan demo + login cepat per role | Guest |
| `/masuk` | Login / Register | Guest |
| `/katalog` | Katalog & filter | Semua |
| `/katalog/:id` | Detail & kunci tanggal | Mhs / Ormawa |
| `/checkout/:id` | Status & pembayaran (QRIS) | Mhs / Ormawa |
| `/dashboard` | Dashboard Mahasiswa | Mahasiswa |
| `/pinjaman-saya` | Riwayat pinjaman | Mhs / Ormawa |
| `/barang-saya` | Mode pemilik (unggah/kelola barang) | Mhs / Ormawa |
| `/serah-terima/:id` | Serah-terima fisik | Mhs / Ormawa |
| `/ormawa` | Dashboard Ormawa | Ormawa |
| `/sps` | SPS 2 Termin | Ormawa |
| `/approval` | Approval & LPJ | Ormawa |
| `/inventaris` | Inventaris Ormawa (R-03) | Ormawa |
| `/admin` | Admin Platform | Admin |
| `/admin/keuangan` | Keuangan Platform | Admin |

> Catatan: `CatalogView` dkk. memakai `DashboardLayout`; login demo cukup dari `/masuk` atau `/panduan`.

---

## 🧪 Panduan Demo Singkat

1. Buka `/` lalu **Masuk** (atau `/panduan` untuk tombol login cepat per role).
2. **Mahasiswa:** pilih barang di katalog → kunci tanggal → checkout. Kuota gratis (2/3) → Rp0; habis → QRIS Rp1.000 + tombol “Simulasi Bayar”.
3. **Ormawa:** kelola SPS, approval berlapis, dan inventaris internal di `/sps`, `/approval`, `/inventaris`.
4. **Admin:** verifikasi akun, kelola kampus, selesaikan sengketa, dan lihat laporan di `/admin` & `/admin/keuangan`.
5. Data tersimpan di `localStorage`; gunakan tombol **“Reset Data Demo”** untuk kembali ke kondisi awal.

---

## ☁️ Deploy

Aplikasi adalah SPA statis (output `dist/`) dan memakai **HashRouter**, jadi **tidak butuh konfigurasi rewrite** di hosting statis mana pun.

### Vercel
1. Import repo ini di [vercel.com](https://vercel.com).
2. Framework preset: **Vite**. Build Command: `npm run build`. Output Directory: `dist`.
3. Deploy. Selesai.

### Netlify
- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages
1. Set `base` di `vite.config.ts` sesuai nama repo, mis. `base: '/ruangkala/'`.
2. Build lalu publish folder `dist` (mis. via `gh-pages`). Karena HashRouter, routing tetap aman tanpa `404.html` khusus.

### Cloudflare Pages / static lainnya
- Build: `npm run build` · Output: `dist`.

---

## 🔧 Catatan Teknis

- **Tanpa backend:** state global di `AppContext` + persistensi `localStorage`.
- **Aset kampus:** daftar 78 PTN beserta kota/provinsi/klaster di `src/data/universities.ts`.
- **Favicon:** dibuat otomatis dari `public/logo.png` (crop ruang kosong) lewat `gen_favicon.py` → menghasilkan `favicon-32/48/64/192/512.png` + `apple-touch-icon.png`.
- **Bundle:** peringatan chunk > 500 kB dari Vite dapat diabaikan untuk prototipe; bisa dioptimalkan dengan code-splitting (`React.lazy`) bila perlu.

---

## 👥 Tim

**Kelompok 10 — D4 Teknik Informatika, Fakultas Vokasi, Universitas Airlangga**

Dibuat untuk tugas mata kuliah **Kewirausahaan Bidang TI**.

---

## 📄 Lisensi

Proyek akademik. Silakan gunakan untuk pembelajaran dengan mencantumkan sumber.
