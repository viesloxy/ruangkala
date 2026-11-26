import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { Role } from '../types';
import { UNIVERSITIES, CITIES } from '../data/universities';
import { GraduationCap, Building2, ShieldCheck, ArrowRight, MapPin } from 'lucide-react';

const uLabel = (u: typeof UNIVERSITIES[number]) => `${u.full} · ${u.city}`;
const resolve = (label: string) => UNIVERSITIES.find(u => uLabel(u) === label);

export function LoginView() {
  const { loginAs, setKampus, campuses } = useApp();
  const nav = useNavigate();
  const [mode, setMode] = useState<'masuk' | 'daftar'>('masuk');
  const [accType, setAccType] = useState<'mahasiswa' | 'ormawa'>('mahasiswa');

  const [campus, setCampus] = useState(uLabel(UNIVERSITIES[0]));
  const [domisili, setDomisili] = useState(UNIVERSITIES[0].city);
  const [ormawaCampus, setOrmawaCampus] = useState(uLabel(UNIVERSITIES[0]));
  const [ormawaDomisili, setOrmawaDomisili] = useState(UNIVERSITIES[0].city);

  const go = (r: Role) => { loginAs(r); nav(r === 'ORMAWA' ? '/ormawa' : r === 'ADMIN' ? '/admin' : '/dashboard'); };

  const pickCampus = (label: string, setLabel: (s: string) => void, setCity: (s: string) => void) => {
    setLabel(label);
    const u = resolve(label);
    if (u) setCity(u.city);
  };
  // Sinkronkan kampus aktif (topbar) bila kampus terpilih ada di daftar kampus aktif
  const syncKampus = (label: string) => {
    const u = resolve(label);
    if (u && campuses.some(c => c.name === u.name)) setKampus(u.name);
  };

  return <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="login-split">
    {/* Kiri: brand */}
    <div style={{ background: 'var(--wash)', padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Link to="/" className="brand"><img src="/logo.png" alt="" /> RuangKala</Link>
      <div>
        <h1 style={{ fontSize: 52, fontWeight: 400, letterSpacing: '-.025em', lineHeight: 1.15, margin: '0 0 12px' }}>Perlengkapan acara<br />tanpa panik hari-H.</h1>
        <p style={{ color: 'var(--ink-2)', maxWidth: 420 }}>Kunci tanggal, pinjam & sewa alat kepanitiaan dari mahasiswa kampusmu dan klaster terdekat, tanpa japri berantai.</p>
        <div className="row wrap" style={{ gap: 8, marginTop: 20 }}>
          <span className="badge-ok"><ShieldCheck size={12} /> Terverifikasi NIM</span>
          <span className="chip-light">QRIS Rp1.000</span>
          <span className="chip-light">3x Gratis</span>
        </div>
      </div>
      <div className="caption">© 2026 RuangKala · Kelompok 10 D4 TI Vokasi UNAIR</div>
    </div>

    {/* Kanan: form */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div className="row" style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--r-pill)', padding: 4, marginBottom: 20 }}>
          <button className={`pill ${mode === 'masuk' ? 'active' : ''}`} style={{ flex: 1, justifyContent: 'center' }} onClick={() => setMode('masuk')}>Masuk</button>
          <button className={`pill ${mode === 'daftar' ? 'active' : ''}`} style={{ flex: 1, justifyContent: 'center' }} onClick={() => setMode('daftar')}>Daftar Baru</button>
        </div>

        {mode === 'daftar' && <div className="row" style={{ gap: 8, marginBottom: 16 }}>
          <button className={`pill ${accType === 'mahasiswa' ? 'active' : ''}`} onClick={() => setAccType('mahasiswa')}><GraduationCap size={14} /> Mahasiswa</button>
          <button className={`pill ${accType === 'ormawa' ? 'active' : ''}`} onClick={() => setAccType('ormawa')}><Building2 size={14} /> Ormawa</button>
        </div>}

        {/* Datalist sumber data */}
        <datalist id="univ-list">{UNIVERSITIES.map(u => <option key={u.id} value={uLabel(u)} />)}</datalist>
        <datalist id="city-list">{CITIES.map(c => <option key={c} value={c} />)}</datalist>

        <div className="card">
          {mode === 'masuk' ? <>
            <div className="h4" style={{ marginBottom: 4 }}>Selamat Datang Kembali</div>
            <div className="caption" style={{ marginBottom: 16 }}>Masuk untuk mengunci tanggal & mengelola barang.</div>
            <div className="stack">
              <div className="field"><label>NIM / Email</label><input className="input" placeholder="434241084" /></div>
              <div className="field"><label>Kata Sandi</label><input className="input" type="password" placeholder="••••••••" /></div>
              <button className="btn btn-primary btn-lg" onClick={() => go('MAHASISWA')}>Masuk <ArrowRight size={15} /></button>
            </div>
          </> : accType === 'mahasiswa' ? <>
            <div className="h4" style={{ marginBottom: 4 }}>Daftar Mahasiswa</div>
            <div className="caption" style={{ marginBottom: 16 }}>Dapatkan 3 kuota transaksi gratis.</div>
            <div className="stack">
              <div className="field"><label>Nama Lengkap</label><input className="input" placeholder="Nama sesuai KTM" /></div>
              <div className="row" style={{ gap: 8 }}>
                <div className="field" style={{ flex: 1 }}><label>NIM</label><input className="input" placeholder="434241xxx" /></div>
                <div className="field" style={{ flex: 1 }}><label>Program Studi</label><select className="select"><option>D4 Teknik Informatika</option><option>D4 Manajemen Pemasaran</option><option>D4 Akuntansi</option><option>S1 Kedokteran</option><option>S1 Hukum</option><option>S1 Teknik Sipil</option></select></div>
              </div>
              <div className="field"><label><MapPin size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> Kampus</label>
                <input className="input" list="univ-list" value={campus} onChange={e => pickCampus(e.target.value, setCampus, setDomisili)} placeholder="Ketik nama kampus, mis. Universitas Airlangga" />
              </div>
              <div className="row" style={{ gap: 8 }}>
                <div className="field" style={{ flex: 1 }}><label>Kota Domisili</label><input className="input" list="city-list" value={domisili} onChange={e => setDomisili(e.target.value)} placeholder="Surabaya" /></div>
                <div className="field" style={{ flex: 1 }}><label>Email Kampus</label><input className="input" placeholder="nama@kampus.ac.id" /></div>
              </div>
              <button className="btn btn-primary btn-lg" onClick={() => { syncKampus(campus); go('MAHASISWA'); }}>Daftar & Lanjut Verifikasi KTM <ArrowRight size={15} /></button>
            </div>
          </> : <>
            <div className="h4" style={{ marginBottom: 4 }}>Daftar Ormawa / Kepanitiaan</div>
            <div className="caption" style={{ marginBottom: 16 }}>Dapatkan 1 acara trial gratis.</div>
            <div className="stack">
              <div className="field"><label>Nama Organisasi</label><input className="input" placeholder="Hima D4 Teknik Informatika" /></div>
              <div className="field"><label>Jenis</label><select className="select"><option>Himpunan Mahasiswa</option><option>BEM</option><option>UKM</option><option>Kepanitiaan Proker</option></select></div>
              <div className="field"><label><MapPin size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> Kampus Asal Ormawa</label>
                <input className="input" list="univ-list" value={ormawaCampus} onChange={e => pickCampus(e.target.value, setOrmawaCampus, setOrmawaDomisili)} placeholder="Ketik nama kampus asal" />
              </div>
              <div className="row" style={{ gap: 8 }}>
                <div className="field" style={{ flex: 1 }}><label>Kota Domisili</label><input className="input" list="city-list" value={ormawaDomisili} onChange={e => setOrmawaDomisili(e.target.value)} /></div>
                <div className="field" style={{ flex: 1 }}><label>NIM Penanggung Jawab</label><input className="input" placeholder="434241xxx" /></div>
              </div>
              <button className="btn btn-primary btn-lg" onClick={() => { syncKampus(ormawaCampus); go('ORMAWA'); }}>Daftar & Lanjut Verifikasi SK <ArrowRight size={15} /></button>
            </div>
          </>}
        </div>

        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button className="caption" style={{ color: 'var(--muted)', marginRight: 12 }} onClick={() => nav('/paket')}>Lihat Harga</button>
          <button className="caption" style={{ color: 'var(--muted)', marginRight: 12 }} onClick={() => nav('/panduan')}>Panduan Demo</button>
          <button className="caption" style={{ color: 'var(--muted)' }} onClick={() => go('ADMIN')}>Login Admin</button>
        </div>
      </div>
    </div>
  </div>;
}