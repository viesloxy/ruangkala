import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { GraduationCap, Building2, ShieldCheck, ArrowRight, Check, RotateCcw, Wallet, QrCode } from 'lucide-react';

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .45 } } };

const mhsSteps = [
  'Buka Landing → klik "Masuk" (atau tombol cepat di atas).',
  'Di Dashboard Mahasiswa, lihat kuota gratis (2/3) & pinjaman aktif.',
  'Buka "Cari Perlengkapan" → pilih barang → atur tanggal 1–3 hari.',
  'Klik "Ajukan Kunci Tanggal" → masuk halaman Status Pengajuan.',
  'Klik "Simulasi: Pemilik Setujui" → tanggal terkunci.',
  'Klik "Konfirmasi & Lanjut" (gratis, kuota) atau bayar QRIS Rp1.000 bila kuota habis.',
  'Status jadi "Siap Diambil" → buka Serah-Terima → unggah foto awal → "Barang Diserahkan" (status: Sedang Dipinjam).',
  'Unggah foto akhir + centang kelengkapan → "Barang Dikembalikan" (status: Selesai).',
];
const ormawaSteps = [
  'Daftar Ormawa: isi Kampus Asal + Kota Domisili (data kampus lengkap).',
  'Buka "Paket & Langganan" → pilih Trial / Proker Rp25rb / Semester Rp99rb.',
  'Buka katalog → ajukan sewa barang → halaman Status Pengajuan.',
  'Cek biaya platform: Trial/Langganan aktif = Rp0; sewa dibayar COD ke pemilik.',
  'Lanjutkan Status Pengajuan → Serah-Terima seperti alur mahasiswa.',
  'Cek SPS 2 Termin, Approval & LPJ, serta Inventaris (R-03) di sidebar.',
];
const adminSteps = [
  'Login Admin (tombol cepat) → Dashboard Admin 4 tab.',
  'Tab "Verifikasi Akun": setujui/tolak antrean KTM/SK (antrean berkurang).',
  'Tab "Kampus & Klaster": lihat & tambah kampus.',
  'Tab "Sengketa & Blacklist": lihat foto Before/After, selesaikan / blacklist.',
  'Buka "Keuangan Platform": pendapatan, biaya, laba, BEP, ledger + unduh CSV.',
];

export function PanduanView() {
  const nav = useNavigate();
  const { loginAs, resetDemo } = useApp();
  const quick = (r: 'MAHASISWA' | 'ORMAWA' | 'ADMIN') => { loginAs(r); nav(r === 'ORMAWA' ? '/ormawa' : r === 'ADMIN' ? '/admin' : '/dashboard'); };
  const roles = [
    { k: 'MAHASISWA' as const, icon: GraduationCap, t: 'Mahasiswa', d: 'Kuota 2/3 · dual-mode peminjam & pemilik', steps: mhsSteps },
    { k: 'ORMAWA' as const, icon: Building2, t: 'Ormawa', d: 'Trial/25rb/99rb · SPS · approval · LPJ', steps: ormawaSteps },
    { k: 'ADMIN' as const, icon: ShieldCheck, t: 'Admin', d: 'Verifikasi · kampus · sengketa · keuangan', steps: adminSteps },
  ];

  return <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 40px' }} className="between">
        <button className="brand" onClick={() => nav('/')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><img src="/logo.png" alt="RuangKala" /> RuangKala</button>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => nav('/paket')}>Harga</button>
          <button className="btn btn-ghost btn-sm" onClick={() => nav('/')}>← Beranda</button>
        </div>
      </div>
    </header>

    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 40px 32px', textAlign: 'center' }}>
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: .08 } } }}>
        <motion.h1 variants={fade} style={{ fontSize: 42, fontWeight: 400, letterSpacing: '-.03em', margin: '0 0 10px' }}>Panduan Demo RuangKala</motion.h1>
        <motion.p variants={fade} style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 620, margin: '0 auto' }}>Ikuti alur di bawah agar presentasi runtut, dari landing, pembayaran per role, sampai serah-terima. Gunakan tombol cepat untuk langsung masuk sebagai role.</motion.p>
      </motion.div>
    </section>

    {/* Quick login */}
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {roles.map(r => <div key={r.k} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--surface-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}><r.icon size={20} color="var(--brand)" /></div>
          <div className="h4" style={{ marginBottom: 4 }}>Masuk sebagai {r.t}</div>
          <div className="caption" style={{ marginBottom: 14, flex: 1 }}>{r.d}</div>
          <button className="btn btn-primary" onClick={() => quick(r.k)}>Masuk {r.t} <ArrowRight size={14} /></button>
        </div>)}
      </div>
    </section>

    {/* Status booking flow */}
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 24px' }}>
      <div className="card">
        <div className="h4" style={{ marginBottom: 4 }}>Alur Status Booking (5 Tahap)</div>
        <div className="caption" style={{ marginBottom: 14 }}>Ditampilkan sebagai progres visual di halaman Status Pengajuan.</div>
        <div className="row wrap" style={{ gap: 8 }}>
          {[
            { t: 'Diajukan', s: 'Menunggu persetujuan pemilik' },
            { t: 'Disetujui', s: 'Tanggal terkunci' },
            { t: 'Dibayar', s: 'Bayar di awal (kuota/QRIS/paket)' },
            { t: 'Diserahkan', s: 'Barang dipinjam (Sedang Dipinjam)' },
            { t: 'Selesai', s: 'Barang dikembalikan' },
          ].map((x, i) => <div key={x.t} style={{ flex: 1, minWidth: 150 }}>
            <div className="row" style={{ gap: 8, marginBottom: 4 }}><span className="step-dot active" style={{ width: 26, height: 26, fontSize: 12 }}>{i + 1}</span><span style={{ fontSize: 13.5 }}>{x.t}</span></div>
            <div className="caption" style={{ paddingLeft: 34 }}>{x.s}</div>
          </div>)}
        </div>
      </div>
    </section>
    {/* PLACEHOLDER_STEPS */}
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 24px' }}>
      <div className="stack" style={{ gap: 16 }}>
        {roles.map(r => <motion.div key={r.k} initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: .05 } } }} className="card">
          <div className="row" style={{ gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--surface-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><r.icon size={18} color="var(--brand)" /></div>
            <div className="h4">Skenario Demo: {r.t}</div>
          </div>
          <div className="stack" style={{ gap: 8 }}>
            {r.steps.map((s, i) => <motion.div key={i} variants={fade} className="row" style={{ gap: 10, alignItems: 'flex-start' }}>
              <span className="step-dot active" style={{ width: 24, height: 24, fontSize: 11, flexShrink: 0 }}>{i + 1}</span>
              <span style={{ fontSize: 13.5, lineHeight: 1.5 }}>{s}</span>
            </motion.div>)}
          </div>
        </motion.div>)}
      </div>
    </section>

    {/* Model biaya */}
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 24px' }}>
      <div className="card">
        <div className="h4" style={{ marginBottom: 4 }}>Model Biaya (sesuai dokumen keuangan)</div>
        <div className="caption" style={{ marginBottom: 14 }}>Yang tampil di halaman Checkout menyesuaikan role & status kuota.</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { icon: QrCode, t: 'Mahasiswa', v: 'Rp1.000 / trx', d: '3 transaksi pertama gratis, lalu Rp1.000 via QRIS. Sewa dibayar COD ke pemilik.' },
            { icon: Wallet, t: 'Ormawa', v: 'Rp99.000 / sem', d: '1 acara trial gratis, lalu Rp25.000/proker atau Rp99.000/semester.' },
            { icon: Check, t: 'Pemilik Barang', v: 'Gratis 100%', d: 'Listing tanpa biaya, terima penuh biaya sewa.' },
          ].map(x => <div key={x.t} style={{ background: 'var(--surface-subtle)', borderRadius: 14, padding: 14 }}>
            <x.icon size={18} color="var(--brand)" style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 13.5 }}>{x.t}</div>
            <div className="price" style={{ fontSize: 17, margin: '2px 0 6px' }}>{x.v}</div>
            <div className="caption">{x.d}</div>
          </div>)}
        </div>
      </div>
    </section>

    {/* Reset + tips */}
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 64px' }}>
      <div className="card" style={{ background: 'var(--surface-tint)', borderColor: 'var(--azure-200)' }}>
        <div className="between wrap" style={{ gap: 14 }}>
          <div>
            <div className="h4" style={{ marginBottom: 4 }}>Mengulang Demo</div>
            <div className="caption">Data disimpan di browser (localStorage). Jika tanggal sudah terkunci karena demo berulang, klik reset untuk kembali ke kondisi awal.</div>
          </div>
          <button className="btn btn-ghost" onClick={() => { if (confirm('Reset semua data demo ke kondisi awal?')) resetDemo(); }}><RotateCcw size={14} /> Reset Data Demo</button>
        </div>
      </div>
      <div className="caption" style={{ textAlign: 'center', marginTop: 18 }}>Tip: gunakan tombol "Masuk [role]" di atas untuk berpindah role dengan cepat saat presentasi.</div>
    </section>
  </div>;
}