import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { fmtRp, scopeChipLabel, fmtDate } from '../utils';
import { Search, SlidersHorizontal, Lock, MapPin, ShieldCheck } from 'lucide-react';

export function CatalogView() {
  const { equipment, clusterOn, toggleCluster, kampus, cluster } = useApp();
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('Semua');
  const [start, setStart] = useState('2026-11-14');
  const [end, setEnd] = useState('2026-11-16');
  const cats = useMemo(() => ['Semua', ...new Set(equipment.map(e => e.category))], [equipment]);
  const filtered = equipment.filter(e => {
    const okQ = (e.name + e.category + e.ownerName).toLowerCase().includes(q.toLowerCase());
    const okC = cat === 'Semua' || e.category === cat;
    return okQ && okC;
  });

  return <DashboardLayout nav="katalog">
    <div className="page-title">Katalog Perlengkapan</div>
    <div className="page-sub">Cari & kunci tanggal barang di {kampus}{clusterOn ? ` + klaster ${cluster}` : ''} untuk acara 1–3 hari.</div>

    <div className="card-sm" style={{ marginBottom: 16 }}>
      <div className="row wrap" style={{ gap: 10, marginBottom: 12 }}>
        <div className="search-pill"><Search size={16} color="#6B7485" /><input placeholder="Cari pompa balon, HT, proyektor..." value={q} onChange={e => setQ(e.target.value)} /><button className="filter-btn"><SlidersHorizontal size={15} /></button></div>
        <div className="row" style={{ gap: 6 }}>
          <input className="input" type="date" value={start} onChange={e => setStart(e.target.value)} style={{ width: 150 }} />
          <span className="muted"></span>
          <input className="input" type="date" value={end} onChange={e => setEnd(e.target.value)} style={{ width: 150 }} />
        </div>
        <button className={`btn ${clusterOn ? 'btn-primary' : 'btn-ghost'} btn-sm`} onClick={toggleCluster}>{clusterOn ? 'Klaster Aktif' : 'Hanya Kampus Saya'}</button>
      </div>
      <div className="pill-row">{cats.map(c => <button key={c} className={`pill ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>)}</div>
    </div>

    <div className="grid g3">
      {filtered.map(e => {
        const locked = e.scope === 'SCOPE_INTERNAL';
        return <div key={e.id} className="eq-card card-hover" onClick={() => nav(`/katalog/${e.id}`)} style={{ cursor: 'pointer' }}>
          <div style={{ position: 'relative' }}>
            <img className="eq-img" src={e.img} alt={e.name} />
            <span style={{ position: 'absolute', top: 10, left: 10 }}>{e.dailyRate === 0 ? <span className="badge-ok">Gratis</span> : <span className="chip-light">{fmtRp(e.dailyRate)}/hari</span>}</span>
            {locked && <span className="lock-badge" style={{ position: 'absolute', top: 10, right: 10 }}><Lock size={11} /> Internal</span>}
          </div>
          <div className="eq-body">
            <div className="eq-title">{e.name}</div>
            <div className="caption"><ShieldCheck size={11} style={{ display: 'inline', verticalAlign: '-1px' }} /> {e.ownerName} · {e.ownerOrg}</div>
            <div className="row wrap" style={{ gap: 4 }}>
              <span className="chip-light">{e.category}</span>
              <span className="chip-light">{scopeChipLabel(e.scope)}</span>
              <span className="chip-light">Kondisi {e.condition}%</span>
            </div>
            <div className="divider" style={{ margin: '2px 0' }} />
            <div className="between">
              <span className="caption"><MapPin size={11} style={{ display: 'inline', verticalAlign: '-1px' }} /> {e.location}</span>
              {locked
                ? <button className="btn btn-ghost btn-sm" disabled style={{ opacity: .5 }}>Tidak Tersedia</button>
                : <span className="btn btn-primary btn-sm">Kunci Tanggal</span>}
            </div>
          </div>
        </div>;
      })}
    </div>
    {!filtered.length && <div className="empty">
      Belum ada barang yang cocok di kampus ini.<br /><br />
      <button className="btn btn-primary" onClick={toggleCluster}>Perluas ke Klaster Kampus Terdekat</button>
    </div>}
  </DashboardLayout>;
}