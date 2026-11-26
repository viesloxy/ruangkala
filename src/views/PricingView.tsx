import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, GraduationCap, Building2, Package, ArrowRight } from 'lucide-react';

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: .5 } } };

const plans = [
  { icon: GraduationCap, name: 'Mahasiswa', price: 'Rp1.000', unit: '/transaksi', desc: '3 transaksi pertama gratis. Sewa barang dibayar langsung ke pemilik.', feats: ['3 kuota gratis awal', 'Lalu Rp1.000/transaksi via QRIS', 'Verifikasi NIM + KTM', 'Upload barang pribadi gratis'], cta: 'Daftar Mahasiswa' },
  { icon: Building2, name: 'Ormawa', price: 'Rp99.000', unit: '/semester', desc: '1 acara trial gratis. Biaya platform gratis selama langganan aktif.', feats: ['1 acara trial gratis', 'Rp99.000/semester (flat)', 'Atau Rp25.000 per proker', 'SPS 2 termin + approval + LPJ'], cta: 'Daftar Ormawa' },
  { icon: Package, name: 'Pemilik Barang', price: 'Gratis', unit: '100%', desc: 'Listing & kelola barang pribadi tanpa biaya. Terima penuh sewa.', feats: ['Upload tanpa biaya', 'Atur tarif & kalender', 'Terima 100% biaya sewa', 'Tidak dipotong platform'], cta: 'Mulai Sewakan' },
];

export function PricingView() {
  const nav = useNavigate();
  return <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
    <motion.header initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 40px' }} className="between">
        <button className="brand" onClick={() => nav('/')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><img src="/logo.png" alt="RuangKala" /> RuangKala</button>
        <button className="btn btn-ghost" onClick={() => nav('/')}>← Kembali</button>
      </div>
    </motion.header>

    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 40px 40px', textAlign: 'center' }}>
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: .1 } } }}>
        <motion.h1 variants={fade} style={{ fontSize: 44, fontWeight: 400, letterSpacing: '-.03em', margin: '0 0 12px' }}>Harga Sederhana, Transparan</motion.h1>
        <motion.p variants={fade} style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 560, margin: '0 auto' }}>Tidak ada biaya tersembunyi. Pilih sesuai peran, semua menguntungkan kedua pihak.</motion.p>
      </motion.div>
    </section>

    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 80px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {plans.map(p => <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--surface-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><p.icon size={22} color="var(--brand)" /></div>
          <div className="h4" style={{ marginBottom: 4 }}>{p.name}</div>
          <div style={{ marginBottom: 10 }}><span className="price" style={{ fontSize: 26 }}>{p.price}</span> <span className="price-muted">{p.unit}</span></div>
          <div className="caption" style={{ marginBottom: 16, minHeight: 40 }}>{p.desc}</div>
          <div className="stack" style={{ gap: 8, marginBottom: 20, flex: 1 }}>
            {p.feats.map(f => <div key={f} className="row" style={{ gap: 8 }}><Check size={14} color="var(--ok)" /><span style={{ fontSize: 13 }}>{f}</span></div>)}
          </div>
          <button className="btn btn-primary" onClick={() => nav('/masuk')}>{p.cta} <ArrowRight size={14} /></button>
        </motion.div>)}
      </div>
      <div className="caption" style={{ textAlign: 'center', marginTop: 24 }}>Harga belum termasuk biaya sewa barang yang dibayar langsung ke pemilik. MDR QRIS 0% untuk nominal ≤ Rp100.000.</div>
    </section>
  </div>;
}