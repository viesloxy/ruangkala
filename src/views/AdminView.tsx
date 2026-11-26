import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { fmtRp } from '../utils';
import { Check, X, AlertTriangle, ShieldCheck, Ban, Wallet, Building2, Plus } from 'lucide-react';

const tabs = ['Verifikasi Akun', 'Kampus & Klaster', 'Sengketa & Blacklist', 'Ringkasan Transaksi'] as const;

export function AdminView() {
  const { bookings, equipment, ledger, verifyQueue, verifyAccount, campuses, addCampus, resolveDispute, notify } = useApp();
  const nav = useNavigate();
  const [tab, setTab] = useState<(typeof tabs)[number]>('Verifikasi Akun');
  const [newCampus, setNewCampus] = useState('');
  const [newCluster, setNewCluster] = useState('Surabaya Timur');
  const disputed = bookings.filter(b => b.status === 'DISPUTED');
  const paid = ledger.filter(l => l.status === 'PAID');
  const income = paid.reduce((s, l) => s + l.amount, 0);
  const txCount = paid.filter(l => l.source === 'TRANSACTION_FEE').length;
  const subCount = paid.filter(l => l.source === 'ORMAWA_SUBSCRIPTION').length;
  const prokerCount = paid.filter(l => l.source === 'PROKER_PACKAGE').length;
  const clusters = Array.from(new Set(campuses.map(c => c.cluster)));
  const submitCampus = () => {
    if (!newCampus.trim()) { notify('Isi nama kampus dulu.'); return; }
    addCampus(newCampus.trim(), newCluster);
    setNewCampus('');
  };

  return <DashboardLayout nav="dash">
    <div className="page-title">Dashboard Admin</div>
    <div className="page-sub">Moderasi platform: verifikasi akun, kelola kampus, selesaikan sengketa.</div>

    <div className="pill-row" style={{ marginBottom: 16 }}>
      {tabs.map(t => <button key={t} className={`pill ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
        {t}{t === 'Sengketa & Blacklist' && disputed.length > 0 ? ` (${disputed.length})` : ''}{t === 'Verifikasi Akun' && verifyQueue.length > 0 ? ` (${verifyQueue.length})` : ''}
      </button>)}
    </div>
    {tab === 'Verifikasi Akun' && <div className="stack">
      {verifyQueue.map(q => <div key={q.nim} className="card">
        <div className="row" style={{ gap: 14 }}>
          <img src={q.img} alt="" style={{ width: 64, height: 48, borderRadius: 10, objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 400, fontSize: 14 }}>{q.name}</div>
            <div className="caption mono">{q.nim} · {q.type}</div>
          </div>
          <div className="row" style={{ gap: 6 }}>
            <button className="btn btn-primary btn-sm" onClick={() => verifyAccount(q.nim, true)}><Check size={12} /> Setujui</button>
            <button className="btn btn-danger btn-sm" onClick={() => verifyAccount(q.nim, false)}><X size={12} /> Tolak</button>
          </div>
        </div>
      </div>)}
      {!verifyQueue.length && <div className="card" style={{ textAlign: 'center' }}>
        <ShieldCheck size={32} color="var(--ok)" style={{ margin: '8px auto' }} />
        <div className="h4" style={{ fontSize: 14 }}>Tidak ada antrean, semua bersih</div>
        <div className="caption">Semua akun sudah diverifikasi.</div>
      </div>}
    </div>}

    {tab === 'Kampus & Klaster' && <div className="stack">
      {clusters.map(cl => <div key={cl} className="card">
        <div className="h4" style={{ marginBottom: 12 }}>Klaster {cl}</div>
        <div className="row wrap" style={{ gap: 8 }}>
          {campuses.filter(c => c.cluster === cl).map(c => <span key={c.id} className="chip-light"><Building2 size={11} /> {c.name}</span>)}
        </div>
      </div>)}
      <div className="card">
        <div className="h4" style={{ marginBottom: 12 }}>Tambah Kampus</div>
        <div className="row wrap" style={{ gap: 8 }}>
          <input className="input" style={{ maxWidth: 220 }} placeholder="Nama kampus (mis. Telkom)" value={newCampus} onChange={e => setNewCampus(e.target.value)} />
          <select className="select" style={{ maxWidth: 200 }} value={newCluster} onChange={e => setNewCluster(e.target.value)}>
            {[...clusters, 'Malang', 'Yogyakarta', 'Bandung', 'Jakarta'].filter((v, i, a) => a.indexOf(v) === i).map(c => <option key={c}>{c}</option>)}
          </select>
          <button className="btn btn-primary btn-sm" onClick={submitCampus}><Plus size={12} /> Tambah</button>
        </div>
      </div>
    </div>}
    {tab === 'Sengketa & Blacklist' && <div className="stack">
      {disputed.length ? disputed.map(b => { const eq = equipment.find(e => e.id === b.equipmentId); return (
        <div key={b.id} className="card">
          <div className="between" style={{ marginBottom: 12 }}>
            <div><div style={{ fontWeight: 400, fontSize: 14 }}>{eq?.name}</div><div className="caption mono">{b.code} · Dilaporkan pemilik</div></div>
            <span className="badge-danger"><AlertTriangle size={11} /> DISPUTED</span>
          </div>
          <div className="grid g2" style={{ marginBottom: 12 }}>
            <div style={{ textAlign: 'center' }}><div className="caption" style={{ marginBottom: 6 }}>Foto Kondisi Awal</div><img src="https://picsum.photos/seed/rk-dispute/600/400" alt="" style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 12 }} /></div>
            <div style={{ textAlign: 'center' }}><div className="caption" style={{ marginBottom: 6 }}>Foto Kondisi Akhir</div><img src="https://picsum.photos/seed/rk-dispute/600/400" alt="" style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 12 }} /></div>
          </div>
          <div className="row wrap" style={{ gap: 8 }}>
            <button className="btn btn-primary btn-sm" onClick={() => resolveDispute(b.id, false)}><Check size={12} /> Selesaikan (Ganti Rugi)</button>
            <button className="btn btn-ghost btn-sm" onClick={() => resolveDispute(b.id, true)}><Ban size={12} /> Blacklist NIM</button>
          </div>
        </div>
      ); }) : <div className="card" style={{ textAlign: 'center' }}>
        <ShieldCheck size={32} color="var(--ok)" style={{ margin: '8px auto' }} />
        <div className="h4" style={{ fontSize: 14 }}>Tidak ada sengketa aktif</div>
        <div className="caption">Semua transaksi berjalan lancar.</div>
      </div>}
    </div>}

    {tab === 'Ringkasan Transaksi' && <div className="grid g3">
      <div className="card"><div className="row between"><Wallet size={18} color="var(--brand)" /><span className="caption">Total Pendapatan</span></div>
        <div className="price" style={{ marginTop: 8 }}>{fmtRp(income)}</div><div className="caption">{txCount} trx · {subCount} langganan · {prokerCount} proker</div></div>
      <div className="card"><div className="row between"><Wallet size={18} color="var(--brand)" /><span className="caption">Kuota Gratis Terpakai</span></div>
        <div className="price" style={{ marginTop: 8 }}>{txCount}</div><div className="caption">transaksi 3x gratis mahasiswa</div></div>
      <div className="card"><div className="row between"><Wallet size={18} color="var(--brand)" /><span className="caption">Paket Aktif Ormawa</span></div>
        <div className="price" style={{ marginTop: 8 }}>{subCount} + {prokerCount}</div><div className="caption">langganan Rp99rb/sem · proker Rp25rb</div></div>
    </div>}

    {tab === 'Ringkasan Transaksi' && <div className="card">
      <div className="between" style={{ marginBottom: 12 }}>
        <div className="h4">Rincian Pendapatan per Sumber</div>
        <button className="btn btn-ghost btn-sm" onClick={() => nav('/admin/keuangan')}>Buka Keuangan <Wallet size={13} /></button>
      </div>
      {[
        { k: 'TRANSACTION_FEE', n: `${txCount} transaksi × Rp1.000`, c: txCount * 1000 },
        { k: 'ORMAWA_SUBSCRIPTION', n: `${subCount} Ormawa × Rp99.000/sem`, c: subCount * 99000 },
        { k: 'PROKER_PACKAGE', n: `${prokerCount} proker × Rp25.000`, c: prokerCount * 25000 },
      ].map(r => (
        <div key={r.k} className="between" style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
          <div><div style={{ fontSize: 13.5 }}>{{ TRANSACTION_FEE: 'Biaya Transaksi (QRIS Rp1.000)', ORMAWA_SUBSCRIPTION: 'Langganan Ormawa (Rp99rb/sem)', PROKER_PACKAGE: 'Paket Proker (Rp25rb/acara)' }[r.k]}</div><div className="caption">{r.n}</div></div>
          <div className="price" style={{ fontSize: 15 }}>{fmtRp(r.c)}</div>
        </div>
      ))}
      <div className="between" style={{ padding: '12px 0 0' }}><strong>Total Pendapatan</strong><strong className="price">{fmtRp(income)}</strong></div>
    </div>}
  </DashboardLayout>;
}