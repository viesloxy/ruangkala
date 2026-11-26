import { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { fmtRp, sourceLabel } from '../utils';
import { Plus, Check, TrendingDown, TrendingUp } from 'lucide-react';

const divisions = ['Acara', 'Dekorasi', 'Humas', 'Medinfo', 'Keamanan', 'Dokumentasi'];

export function SpsView() {
  const { sps, toggleSps, addSps } = useApp();
  const [term, setTerm] = useState<1 | 2>(2);
  const [showAdd, setShowAdd] = useState(false);
  const [item, setItem] = useState('');
  const [div, setDiv] = useState(divisions[0]);
  const [source, setSource] = useState('CATALOG_RENT');
  const [cost, setCost] = useState(50000);

  const termItems = sps.filter(s => s.term === term);
  const catalogSpend = sps.filter(s => s.source === 'CATALOG_RENT').reduce((a, b) => a + b.cost, 0);
  const submit = () => {
    if (!item.trim()) return;
    addSps({ division: div, item, qty: 1, term, source: source as any, cost: source === 'ORMAWA_FREE' || source === 'PERSONAL_PANITIA' ? 0 : cost, fulfilled: false });
    setItem(''); setShowAdd(false);
  };

  return <DashboardLayout nav="sps">
    <div className="between wrap" style={{ marginBottom: 20 }}>
      <div><div className="page-title">SPS 2 Termin</div><div className="page-sub">Kumpulkan kebutuhan perlengkapan lintas divisi untuk Surat Pengajuan Sarana.</div></div>
      <button className="btn btn-primary" onClick={() => setShowAdd(s => !s)}><Plus size={14} /> Tambah Item</button>
    </div>

    <div className="row" style={{ gap: 8, marginBottom: 16 }}>
      <button className={`pill ${term === 1 ? 'active' : ''}`} onClick={() => setTerm(1)}>Termin 1 · Selesai</button>
      <button className={`pill ${term === 2 ? 'active' : ''}`} onClick={() => setTerm(2)}>Termin 2 · Aktif</button>
      <span style={{ flex: 1 }} />
      <span className="chip-light">Realisasi: {fmtRp(catalogSpend)} / {fmtRp(500000)}</span>
    </div>

    {showAdd && <div className="card" style={{ marginBottom: 16 }}>
      <div className="h4" style={{ marginBottom: 12 }}>Item Baru · Termin {term}</div>
      <div className="row wrap" style={{ gap: 10 }}>
        <div className="field" style={{ flex: 2, minWidth: 200 }}><label>Nama Barang</label><input className="input" value={item} onChange={e => setItem(e.target.value)} placeholder="Pompa Balon Elektrik 600W" /></div>
        <div className="field" style={{ flex: 1, minWidth: 140 }}><label>Divisi</label><select className="select" value={div} onChange={e => setDiv(e.target.value)}>{divisions.map(d => <option key={d}>{d}</option>)}</select></div>
        <div className="field" style={{ flex: 1, minWidth: 160 }}><label>Sumber Pemenuhan</label><select className="select" value={source} onChange={e => setSource(e.target.value)}>{Object.entries(sourceLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
        <div className="field" style={{ flex: 1, minWidth: 130 }}><label>Estimasi Biaya</label><input className="input" type="number" value={cost} onChange={e => setCost(+e.target.value)} disabled={source === 'ORMAWA_FREE' || source === 'PERSONAL_PANITIA'} /></div>
        <div className="row" style={{ gap: 6, alignSelf: 'flex-end' }}>
          <button className="btn btn-primary btn-sm" onClick={submit}>Simpan</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(false)}>Batal</button>
        </div>
      </div>
    </div>}

    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
        <thead><tr style={{ borderBottom: '1px solid var(--divider)' }}>
          {['Divisi', 'Barang', 'Qty', 'Sumber', 'Estimasi', 'Status'].map(h => <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 400, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.04em' }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {termItems.map(s => <tr key={s.id} style={{ borderBottom: '1px solid var(--divider)' }}>
            <td style={{ padding: '12px 16px' }}><span className="chip-light">{s.division}</span></td>
            <td style={{ padding: '12px 16px', fontWeight: 400 }}>{s.item}</td>
            <td style={{ padding: '12px 16px' }}>{s.qty}</td>
            <td style={{ padding: '12px 16px' }}><span className="caption">{sourceLabel[s.source]}</span></td>
            <td style={{ padding: '12px 16px' }}>{s.cost === 0 ? <span className="badge-ok">Rp0</span> : fmtRp(s.cost)}</td>
            <td style={{ padding: '12px 16px' }}>
              <button className={`btn ${s.fulfilled ? 'btn-ghost' : 'btn-primary'} btn-sm`} onClick={() => toggleSps(s.id)}>
                {s.fulfilled ? <><Check size={11} /> Terpenuhi</> : 'Tandai'}
              </button>
            </td>
          </tr>)}
          {!termItems.length && <tr><td colSpan={6} style={{ padding: 32, textAlign: 'center' }} className="muted">Belum ada item untuk termin ini.</td></tr>}
        </tbody>
      </table>
    </div>

    {/* Kalkulator Sewa vs Beli */}
    <div className="card" style={{ marginTop: 16, background: 'var(--surface-tint)', borderColor: 'var(--azure-100)' }}>
      <div className="h4" style={{ fontSize: 14, marginBottom: 8 }}>Kalkulator Sewa vs Beli Baru</div>
      <div className="row wrap" style={{ gap: 16 }}>
        <div><div className="caption">Contoh: Pompa Balon</div><div style={{ fontSize: 13.5, fontWeight: 400 }}>Sewa 3 hari = {fmtRp(75000)} < TrendingDown size={12} style={{ display: 'inline', color: 'var(--ok)' }} /></div></div>
        <div><div className="caption">Beli baru</div><div style={{ fontSize: 13.5, fontWeight: 400 }}>{fmtRp(320000)}, tapi terpakai 4 acara</div></div>
        <div><div className="caption">Proyeksi sewa 4x</div><div style={{ fontSize: 13.5, fontWeight: 400 }}>{fmtRp(300000)} < TrendingUp size={12} style={{ display: 'inline', color: 'var(--warn)' }} /></div></div>
        <span className="badge-ok" style={{ marginLeft: 'auto' }}>Sewa masih lebih hemat</span>
      </div>
    </div>
  </DashboardLayout>;
}