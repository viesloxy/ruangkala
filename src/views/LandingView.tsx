import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowRight, Check, Lock, CalendarClock, ShieldCheck, Network, Wallet, Camera, ChevronDown, Menu, X, MessageSquare, AlertTriangle, FileText, Building2 } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { CLUSTERS, UNIVERSITIES } from '../data/universities';
import { fmtRp, scopeChipLabel } from '../utils';

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: .5 } } };

const faqs = [
  { q: 'Apa itu RuangKala?', a: 'RuangKala adalah platform pinjam-sewa perlengkapan antar-mahasiswa. Kamu bisa mencari, mengunci tanggal, dan meminjam atau menyewa alat kepanitiaan dari mahasiswa lain di kampusmu, tanpa japri berantai.' },
  { q: 'Siapa saja yang bisa memakai?', a: 'Mahasiswa aktif dengan NIM terverifikasi (3 kuota transaksi gratis pertama) dan organisasi/kepanitiaan (1 acara trial gratis, lalu paket Rp25.000/acara atau Rp99.000/semester).' },
  { q: 'Bagaimana kalau barang yang dicari tidak ada di kampus saya?', a: 'Setelah masuk, aktifkan filter Klaster Kampus Terdekat. Pencarian otomatis diperluas ke kampus tetangga dalam klaster wilayahmu.' },
  { q: 'Apakah barang saya aman dipinjam orang?', a: 'Setiap peminjam terverifikasi NIM, ada foto kondisi sebelum/sesudah, dan riwayat reputasi. Jika rusak atau hilang, sistem mencatat insiden dan estimasi ganti rugi.' },
  { q: 'Bagaimana cara bayarnya?', a: 'Mahasiswa: 3 kuota gratis, selanjutnya Rp1.000/transaksi via QRIS. Ormawa: langganan Rp99.000/semester (biaya platform gratis) atau Rp25.000 per acara. Sewa barang dibayar langsung ke pemilik (COD kampus).' },
  { q: 'Apakah saya bisa menyewakan barang pribadi?', a: 'Bisa, 100% gratis. Upload barang, atur tarif (gratis atau sewa hemat), tentukan lingkup akses, dan kelola kalender ketersediaan langsung dari dashboard.' },
];

const steps = [
  { icon: Search, t: 'Cari & pilih tanggal', d: 'Cari perlengkapan, tentukan rentang tanggal acara 1–3 hari.' },
  { icon: CalendarClock, t: 'Ajukan & kunci', d: 'Ajukan pinjam, pemilik menyetujui, tanggal langsung terkunci.' },
  { icon: Wallet, t: 'Bayar ringan', d: 'Pakai kuota gratis atau QRIS Rp1.000, selesai.' },
  { icon: Camera, t: 'Serah-terima', d: 'Foto kondisi sebelum/sesudah, serah-terima di kampus.' },
];

const painPoints = [
  { icon: MessageSquare, t: 'Japri berantai', d: 'Nyari peminjam lewat grup WA, chat tenggelam, info harga tersebar.' },
  { icon: AlertTriangle, t: 'Tanggal bentrok', d: 'Dua divisi pesan barang sama di tanggal sama. Acara kacau.' },
  { icon: FileText, t: 'LPJ berantakan', d: 'Bukti sewa, foto kondisi, dan nota berserakan; laporan telat.' },
];

const stats = [
  { k: `${UNIVERSITIES.length}`, l: 'Kampus PTN' },
  { k: `${CLUSTERS.length}`, l: 'Klaster Wilayah' },
  { k: '3x', l: 'Gratis untuk Mahasiswa' },
  { k: 'Rp1.000', l: 'per Transaksi' },
];

const marqueeLogos: Record<string, string> = {
  UNAIR: 'https://www.google.com/s2/favicons?domain=unair.ac.id&sz=128',
  ITS: 'https://www.google.com/s2/favicons?domain=its.ac.id&sz=128',
  PENS: 'https://www.google.com/s2/favicons?domain=pens.ac.id&sz=128',
  PPNS: 'https://ppns.ac.id/favicon.ico',
  'UPN Veteran Jatim': 'https://www.google.com/s2/favicons?domain=upnjatim.ac.id&sz=128',
  UB: 'https://www.google.com/s2/favicons?domain=ub.ac.id&sz=128',
  UGM: 'https://www.google.com/s2/favicons?domain=ugm.ac.id&sz=128',
  UI: 'https://www.google.com/s2/favicons?domain=ui.ac.id&sz=128',
  ITB: 'https://www.google.com/s2/favicons?domain=itb.ac.id&sz=128',
  UNDIP: 'https://www.google.com/s2/favicons?domain=undip.ac.id&sz=128',
};
const marqueeItems = ['UNAIR', 'ITS', 'PENS', 'PPNS', 'UPN Veteran Jatim', 'UB', 'UGM', 'UI', 'ITB', 'UNDIP'];

export function LandingView() {
  const { equipment, kampus, campuses, role } = useApp();
  const nav = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  useSmoothScroll();
  const catalogDest = role === 'GUEST' ? '/masuk' : '/katalog';
  const scrollTo = (h: string) => { setMobileMenu(false); document.querySelector(h)?.scrollIntoView({ behavior: 'smooth' }); };
  const navLinks: [string, string][] = [['Manfaat', '#manfaat'], ['Cara Kerja', '#cara-kerja'], ['Harga', '#harga'], ['FAQ', '#faq'], ['Panduan', '/panduan']];

  return (
    <div style={{ background: 'var(--bg-page)' }}>
      <motion.header initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .5 }}
        style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border)' }}>
        <div className="land-header-inner" style={{ maxWidth: 1240, margin: '0 auto', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="brand"><img src="/logo.png" alt="RuangKala" /> RuangKala</div>
          <nav id="desk-nav" style={{ display: 'flex', gap: 26 }}>
            {navLinks.map(([t, h]) => (
              <a key={t} href={h} style={{ fontSize: 14, color: 'var(--ink-2)', cursor: 'pointer' }} onClick={e => { if (h.startsWith('#')) { e.preventDefault(); scrollTo(h); } }}>{t}</a>
            ))}
          </nav>
          <div className="row" style={{ gap: 10 }}>
            <button className="btn btn-ghost land-hide-sm" onClick={() => nav('/masuk')}>Masuk</button>
            <button className="btn btn-primary" onClick={() => nav('/masuk')}>Daftar Gratis</button>
            <button className="btn btn-ghost" id="mobile-toggle" style={{ display: 'none', padding: '0 12px' }} onClick={() => setMobileMenu(m => !m)}>{mobileMenu ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
        <style>{`@media(max-width:900px){#desk-nav{display:none!important}#mobile-toggle{display:inline-flex!important}}`}</style>
        {mobileMenu && <div style={{ padding: '12px 40px 16px', borderTop: '1px solid var(--border)', background: '#fff' }}>
          {navLinks.map(([t, h]) => (
            <a key={t} href={h} style={{ display: 'block', padding: '10px 0', fontSize: 15, color: 'var(--ink-2)' }} onClick={e => { if (h.startsWith('#')) { e.preventDefault(); scrollTo(h); } }}>{t}</a>
          ))}
        </div>}
      </motion.header>

      <div style={{ maxWidth: 1240, margin: '24px auto', borderRadius: 28, overflow: 'hidden', boxShadow: '0 2px 32px rgba(15,23,42,.05)', background: 'var(--bg-page)' }}>

      {/* ===== HERO ===== */}
      <section style={{ background: 'var(--wash)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 40px 96px', textAlign: 'center' }}>
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: .12 } } }}>
            <motion.div variants={fade} className="row" style={{ justifyContent: 'center', marginBottom: 10 }}>
              {[12, 47, 33, 44, 11].map((n, i) => (
                <img key={n} src={`https://i.pravatar.cc/64?img=${n}`} alt="" style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid #fff', marginLeft: i ? -12 : 0, objectFit: 'cover' }} />
              ))}
              <span style={{ background: 'var(--surface-tint)', color: 'var(--brand)', fontSize: 13, padding: '6px 16px', borderRadius: 99, marginLeft: 10 }}>+20 Ormawa terdaftar</span>
            </motion.div>
            <motion.h1 variants={fade} style={{ fontSize: 'clamp(36px, 6.5vw, 72px)', fontWeight: 400, letterSpacing: '-.04em', lineHeight: 1.05, margin: '20px 0 16px' }}>
              Perlengkapan Acara<br />Tanpa Panik Hari-H
            </motion.h1>
            <motion.p variants={fade} style={{ fontSize: 19, color: 'var(--muted)', maxWidth: 600, margin: '0 auto 28px' }}>
              Pinjam & sewa alat kepanitiaan dari mahasiswa di kampusmu. Kunci tanggalnya, tanpa japri berantai.
            </motion.p>
            <motion.div variants={fade} className="row wrap" style={{ justifyContent: 'center', gap: 10, marginBottom: 22 }}>
              <button className="btn btn-primary btn-lg" onClick={() => nav('/masuk')}>Daftar Gratis <ArrowRight size={16} /></button>
              <button className="btn btn-ghost btn-lg" onClick={() => scrollTo('#cara-kerja')}>Lihat Cara Kerja</button>
            </motion.div>
            <motion.div variants={fade} style={{ display: 'flex', gap: 10, justifyContent: 'center', maxWidth: 520, margin: '0 auto' }}>
              <div className="search-pill" style={{ flex: 1 }}>
                <Search size={17} color="#6B7485" />
                <input placeholder="Cari pompa balon, HT, proyektor..." onFocus={() => nav(catalogDest)} readOnly />
                <button className="filter-btn" onClick={() => nav(catalogDest)}><SlidersHorizontal size={15} /></button>
              </div>
            </motion.div>
            <motion.div variants={fade} className="row wrap" style={{ justifyContent: 'center', gap: 8, marginTop: 22 }}>
              <span className="badge-ok"><Check size={12} /> 3x transaksi gratis</span>
              <span className="chip-light">Rp1.000/transaksi via QRIS</span>
              <span className="chip-light">Proker Rp25.000</span>
              <span className="chip-light">Ormawa Rp99.000/sem</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ===== MARQUEE KAMPUS ===== */}
      <div style={{ padding: '18px 0' }}>
        <div style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--muted)', marginBottom: 10 }}>Dipercaya mahasiswa & ormawa dari kampus:</div>
        <div style={{ overflow: 'hidden' }}>
          <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: 56, whiteSpace: 'nowrap', width: 'max-content', alignItems: 'center' }}>
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((m, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 56 }}>
                <img src={marqueeLogos[m]} alt={m} className="uni-logo" style={{ height: 60 }}
                  onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none'; const s = t.nextElementSibling as HTMLElement; if (s) s.style.display = 'inline'; }} />
                <span className="uni-fallback" style={{ display: 'none' }}>{m}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ===== ANGKA ===== */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '44px 40px 8px' }}>
        <div className="grid g4" style={{ gap: 16 }}>
          {stats.map(s => <div key={s.l} style={{ textAlign: 'center' }}>
            <div className="price" style={{ fontSize: 30, letterSpacing: '-.03em' }}>{s.k}</div>
            <div className="caption">{s.l}</div>
          </div>)}
        </div>
      </section>

      {/* ===== MASALAH ===== */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 40px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div className="h2" style={{ marginBottom: 6 }}>Berhenti Panik di Grup Japri</div>
          <div className="caption" style={{ marginBottom: 24 }}>Tiga masalah klasik kepanitiaan yang RuangKala selesaikan</div>
        </div>
        <div className="grid g3" style={{ gap: 20 }}>
          {painPoints.map(p => <div key={p.t} className="card">
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#FDECEC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <p.icon size={20} color="var(--danger)" />
            </div>
            <div className="h4" style={{ marginBottom: 4 }}>{p.t}</div>
            <div className="caption" style={{ fontSize: 13.5 }}>{p.d}</div>
          </div>)}
        </div>
      </section>

      {/* ===== MANFAAT ===== */}
      <section id="manfaat" style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 40px 0' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: .1 } } }}>
          <motion.div variants={fade} style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="h2" style={{ marginBottom: 6 }}>Kenapa RuangKala?</div>
            <div className="caption" style={{ marginBottom: 24 }}>Solusi lengkap, bukan sekadar daftar barang</div>
          </motion.div>
          <div className="grid g3" style={{ gap: 24 }}>
            {[
              { icon: CalendarClock, t: 'Kunci Tanggal Anti-Batal', d: 'Begitu pemilik menyetujui, slot tanggal langsung terkunci di seluruh katalog. Tidak ada lagi pembatalan mendadak.' },
              { icon: ShieldCheck, t: 'NIM + Foto Kondisi', d: 'Identitas terverifikasi NIM aktif dan foto kondisi sebelum/sesudah menjaga kepercayaan kedua pihak.' },
              { icon: Network, t: 'Hub Kampus & Klaster', d: 'Cukup 1 ketuk untuk memperluas pencarian ke kampus tetangga dalam klaster wilayah terdekat.' },
            ].map(x => (
              <motion.div key={x.t} variants={fade} className="card">
                <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--surface-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <x.icon size={22} color="var(--brand)" />
                </div>
                <div className="h4" style={{ marginBottom: 6 }}>{x.t}</div>
                <div className="caption" style={{ fontSize: 13.5 }}>{x.d}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== CARA KERJA ===== */}
      <section id="cara-kerja">
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 40px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="h2" style={{ marginBottom: 6 }}>Cara Kerjanya</div>
            <div className="caption" style={{ marginBottom: 24 }}>Dari cari sampai kembali, 4 langkah jelas</div>
          </div>
          <div className="grid g4" style={{ gap: 20 }}>
            {steps.map((s, i) => (
              <motion.div key={s.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}
                className="card" style={{ textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--surface-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <s.icon size={22} color="var(--brand)" />
                </div>
                <div className="h4" style={{ marginBottom: 4 }}>{i + 1}. {s.t}</div>
                <div className="caption">{s.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ===== KATALOG PRATINJAU ===== */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 40px 0' }}>
        <div className="between wrap" style={{ marginBottom: 20 }}>
          <div><div className="h2" style={{ marginBottom: 6 }}>Barang Siap Kunci</div><div className="caption">Contoh perlengkapan di sekitar {kampus} yang bisa kamu pinjam</div></div>
          <button className="btn btn-ghost" onClick={() => nav(catalogDest)}>Lihat Semua <ArrowRight size={14} /></button>
        </div>
        <div className="grid g3" style={{ gap: 20 }}>
          {equipment.slice(0, 3).map(e => (
            <div key={e.id} className="eq-card card-hover" onClick={() => nav(role === 'GUEST' ? '/masuk' : `/katalog/${e.id}`)} style={{ cursor: 'pointer' }}>
              <img className="eq-img" src={e.img} alt={e.name} />
              <div className="eq-body">
                <div className="eq-title">{e.name}</div>
                <div className="caption">{e.ownerName} · {e.ownerOrg}</div>
                <div className="row wrap" style={{ gap: 4 }}>
                  <span className="chip-light">{e.category}</span>
                  <span className="chip-light">{scopeChipLabel(e.scope)}</span>
                  {e.scope === 'SCOPE_INTERNAL' && <span className="lock-badge"><Lock size={10} /> Internal</span>}
                </div>
                <div className="between">
                  <div><span className="price" style={{ fontSize: 16 }}>{e.dailyRate === 0 ? 'Gratis' : fmtRp(e.dailyRate)}</span> <span className="price-muted">/hari</span></div>
                  <span className="btn btn-primary btn-sm">Lihat & Kunci</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== JANGKAUAN KLASTER (informasi, bukan pemilihan) ===== */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 40px 0' }}>
        <div className="card" style={{ padding: 28, background: 'var(--surface-tint)', borderColor: 'var(--azure-200)' }}>
          <div className="between wrap" style={{ gap: 16, marginBottom: 16 }}>
            <div className="row" style={{ gap: 12 }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Building2 size={22} color="var(--brand)" /></div>
              <div>
                <div className="h4" style={{ marginBottom: 2 }}>Hadir di {campuses.length} Kampus PTN, {CLUSTERS.length} Klaster Wilayah</div>
                <div className="caption">Dari Surabaya sampai Papua. Pilih kampusmu (dan kampus tetangga) setelah masuk.</div>
              </div>
            </div>
          </div>
          <div className="row wrap" style={{ gap: 8 }}>
            {CLUSTERS.map(cl => {
              const n = campuses.filter(c => c.cluster === cl).length;
              return <span key={cl} className="chip-light" style={{ cursor: 'default' }}>{cl} · {n} kampus</span>;
            })}
          </div>
          <div className="caption" style={{ marginTop: 14 }}>Ingin lihat barang di klaster lain? Setelah masuk, ganti kampus & klaster kapan saja lewat menu di dashboard.</div>
        </div>
      </section>

      {/* ===== HARGA ===== */}
      <section id="harga" style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 40px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="h2" style={{ marginBottom: 6 }}>Harga Sederhana, Transparan</div>
          <div className="caption" style={{ marginBottom: 24 }}>Pilih sesuai peran, semua menguntungkan kedua pihak</div>
        </div>
        <div className="grid g3" style={{ gap: 20 }}>
          {[
            { t: 'Mahasiswa', p: 'Rp1.000', u: '/transaksi', d: '3 transaksi pertama gratis. Sewa dibayar langsung ke pemilik.', f: ['3 kuota gratis awal', 'Lalu Rp1.000 via QRIS', 'Verifikasi NIM + KTM'] },
            { t: 'Ormawa', p: 'Rp99.000', u: '/semester', d: '1 acara trial gratis. Biaya platform gratis selama langganan.', f: ['1 acara trial gratis', 'Atau Rp25.000/proker', 'SPS + approval + LPJ'] },
            { t: 'Pemilik Barang', p: 'Gratis', u: '100%', d: 'Listing tanpa biaya. Terima penuh biaya sewa.', f: ['Upload tanpa biaya', 'Atur tarif & kalender', 'Tidak dipotong platform'] },
          ].map(x => (
            <motion.div key={x.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="h4" style={{ marginBottom: 4 }}>{x.t}</div>
              <div style={{ marginBottom: 8 }}><span className="price" style={{ fontSize: 24 }}>{x.p}</span> <span className="price-muted">{x.u}</span></div>
              <div className="caption" style={{ marginBottom: 14, minHeight: 40 }}>{x.d}</div>
              <div className="stack" style={{ gap: 6, marginBottom: 16, flex: 1 }}>
                {x.f.map(ft => <div key={ft} className="row" style={{ gap: 8 }}><Check size={13} color="var(--ok)" /><span style={{ fontSize: 12.5 }}>{ft}</span></div>)}
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => nav('/paket')}>Lihat Detail <ArrowRight size={13} /></button>
            </motion.div>
          ))}
        </div>
        <div className="caption" style={{ textAlign: 'center', marginTop: 20 }}>Harga belum termasuk biaya sewa barang yang dibayar langsung ke pemilik.</div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" style={{ maxWidth: 760, margin: '0 auto', padding: '64px 40px 72px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="h2" style={{ marginBottom: 6 }}>Pertanyaan yang Sering Ditanyakan</div>
          <div className="caption" style={{ marginBottom: 24 }}>Hal yang paling sering ditanyakan calon pengguna</div>
        </div>
        <div className="stack">
          {faqs.map((f, i) => (
            <div key={i} className="card-sm" style={{ cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="between">
                <span style={{ fontSize: 14.5 }}>{f.q}</span>
                <ChevronDown size={16} color="var(--muted)" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
              </div>
              {openFaq === i && <div className="caption" style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.6 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA AKHIR ===== */}
      <section style={{ background: 'var(--wash)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 40px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="h2" style={{ fontSize: 44, marginBottom: 10 }}>Siap mengunci tanggal pertamamu?</div>
            <div className="caption" style={{ marginBottom: 24 }}>Daftar gratis, dapatkan 3 kuota transaksi pertama.</div>
            <div className="row wrap" style={{ justifyContent: 'center', gap: 10 }}>
              <button className="btn btn-primary btn-lg" onClick={() => nav('/masuk')}>Daftar Gratis Sekarang <ArrowRight size={16} /></button>
              <button className="btn btn-ghost btn-lg" onClick={() => nav('/panduan')}>Lihat Panduan Demo</button>
            </div>
          </motion.div>
        </div>
      </section>

      </div>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: 'var(--ink)', color: '#fff', padding: '56px 40px 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="footer-grid" style={{ gap: 32, paddingBottom: 40 }}>
            <div>
              <div className="brand" style={{ color: '#fff', marginBottom: 10 }}><img src="/logo.png" alt="RuangKala" /> RuangKala</div>
              <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 14, maxWidth: 280, lineHeight: 1.6 }}>Pinjam & sewa perlengkapan acara antar-mahasiswa. Kunci tanggal, tanpa japri berantai.</div>
            </div>
            {[
              { h: 'Produk', ls: ['Manfaat', 'Cara Kerja', 'Harga', 'FAQ'] },
              { h: 'Peran', ls: ['Mahasiswa', 'Ormawa', 'Admin Platform'] },
              { h: 'Lainnya', ls: ['Panduan Demo', 'Harga', 'Masuk'] },
            ].map(col => (
              <div key={col.h}>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', marginBottom: 12 }}>{col.h}</div>
                {col.ls.map(l => <div key={l} style={{ fontSize: 14, color: 'rgba(255,255,255,.8)', marginBottom: 8, cursor: 'pointer' }}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 'clamp(40px, 9vw, 120px)', lineHeight: .95, letterSpacing: '-.04em', color: 'rgba(255,255,255,.12)', paddingBottom: 24, textAlign: 'center' }}>
            RuangKala
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', padding: '18px 0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, color: 'rgba(255,255,255,.5)', fontSize: 13 }}>
            <span>© 2026 RuangKala · Kelompok 10 D4 TI Vokasi UNAIR</span>
            <span>Dibuat untuk tugas Kewirausahaan Bidang TI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
