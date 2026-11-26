import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { fmtRp, fmtDate, StatusBadge } from '../utils';

export function PinjamanSayaView() {
  const { user, bookings, equipment } = useApp();
  const nav = useNavigate();
  const [filter, setFilter] = useState('Semua');
  const mine = bookings.filter(b => b.borrowerId === user.id);
  const filtered = filter === 'Semua' ? mine : filter === 'Aktif' ? mine.filter(b => b.status !== 'COMPLETED' && b.status !== 'DISPUTED') : filter === 'Selesai' ? mine.filter(b => b.status === 'COMPLETED') : mine.filter(b => b.status === 'DISPUTED');

  return <DashboardLayout nav="pinjaman">
    <div className="page-title">Pinjaman Saya</div>
    <div className="page-sub">Semua riwayat pinjam-sewa yang pernah kamu ajukan.</div>

    <div className="pill-row" style={{ marginBottom: 16 }}>
      {['Semua', 'Aktif', 'Selesai', 'Sengketa'].map(f => <button key={f} className={`pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>)}
    </div>

    <div className="stack">
      {filtered.map(b => { const e = equipment.find(x => x.id === b.equipmentId); return (
        <div key={b.id} className="card-sm row" style={{ gap: 14, cursor: 'pointer' }} onClick={() => nav(`/checkout/${b.id}`)}>
          <img className="sq" src={e?.img} alt="" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 400, fontSize: 14 }}>{e?.name}</div>
            <div className="caption mono">{b.code} · {fmtDate(b.startDate)} s/d {fmtDate(b.endDate)} · {b.days} hari</div>
            <div className="caption">{b.approvals.filter(a => a.status === 'APPROVED').length}/4 persetujuan</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="price" style={{ fontSize: 15 }}>{fmtRp(b.total)}</div>
            <StatusBadge s={b.status} />
          </div>
        </div>); })}
      {!filtered.length && <div className="empty">Tidak ada pinjaman pada kategori ini.</div>}
    </div>
  </DashboardLayout>;
}