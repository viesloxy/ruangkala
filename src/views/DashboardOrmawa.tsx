import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { fmtRp, fmtDate, StatusBadge } from '../utils';
import { Wallet, CalendarClock, BadgeCheck, Boxes, ArrowRight, TrendingUp } from 'lucide-react';

export function DashboardOrmawa() {
  const { sps, bookings, equipment } = useApp();
  const nav = useNavigate();
  const fulfilled = sps.filter(s => s.fulfilled).length;
  const catalogSpend = sps.filter(s => s.source === 'CATALOG_RENT').reduce((a, b) => a + b.cost, 0);
  const plafon = 500000;
  const totalProker = 3000000;
  const pendingApproval = bookings.filter(b => b.approvals.some(a => a.status === 'PENDING')).length;

  return <DashboardLayout nav="dash">
    <div className="between wrap" style={{ marginBottom: 20 }}>
      <div><div className="page-title">Dekan Cup & IT Expo Vokasi 2026</div><div className="page-sub">1416 Nov 2026 · 3 hari · Hima D4 Teknik Informatika</div></div>
      <button className="btn btn-primary" onClick={() => nav('/sps')}>Kelola SPS <ArrowRight size={14} /></button>
    </div>

    {/* KPI */}
    <div className="grid g4" style={{ marginBottom: 20 }}>
      {[
        { icon: Wallet, label: 'Terpakai / Plafon Sewa', val: `${fmtRp(catalogSpend)} / ${fmtRp(plafon)}`, sub: `dari total proker ${fmtRp(totalProker)}` },
        { icon: CalendarClock, label: 'Kesiapan Alat', val: `${fulfilled}/${sps.length}`, sub: 'item SPS terpenuhi' },
        { icon: BadgeCheck, label: 'Menunggu Approval', val: String(pendingApproval), sub: 'rantai persetujuan' },
        { icon: Boxes, label: 'Inventaris Ormawa', val: '2 unit', sub: 'HT & Kabel Roll' },
      ].map(k => <div key={k.label} className="card">
        <div className="row between"><k.icon size={18} color="var(--brand)" /><span className="caption">{k.label}</span></div>
        <div style={{ fontSize: 17, fontWeight: 400, letterSpacing: '-.02em', marginTop: 8 }}>{k.val}</div>
        <div className="caption">{k.sub}</div>
      </div>)}
    </div>

    {/* Progress plafon */}
    <div className="featured-card" style={{ marginBottom: 20 }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="between" style={{ marginBottom: 8 }}>
          <div><div style={{ fontSize: 12, fontWeight: 400, opacity: .85 }}>SERAPAN PLAFON SEWA</div>
            <div style={{ fontSize: 20, fontWeight: 400 }}>{fmtRp(catalogSpend)} <span style={{ opacity: .8, fontSize: 14 }}>dari {fmtRp(plafon)}</span></div></div>
          <span style={{ background: 'rgba(255,255,255,.2)', padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 400, display: 'inline-flex', alignItems: 'center', gap: 4 }}><TrendingUp size={12} /> {Math.round(catalogSpend / plafon * 100)}%</span>
        </div>
        <div style={{ height: 10, background: 'rgba(255,255,255,.25)', borderRadius: 99 }}><div style={{ width: `${Math.min(100, catalogSpend / plafon * 100)}%`, height: '100%', background: '#fff', borderRadius: 99 }} /></div>
        {catalogSpend > plafon * 0.9 && <div style={{ fontSize: 12, marginTop: 8, opacity: .95 }}>Hampir mencapai plafon, pertimbangkan opsi pinjam gratis.</div>}
      </div>
    </div>

    {/* SPS + Approval ringkas */}
    <div className="grid g2">
      <div className="card">
        <div className="between" style={{ marginBottom: 12 }}><div className="h4">Progres SPS Termin 2</div><button className="btn btn-ghost btn-sm" onClick={() => nav('/sps')}>Buka</button></div>
        <div className="stack">
          {sps.filter(s => s.term === 2).map(s => <div key={s.id} className="between">
            <div><div style={{ fontWeight: 400, fontSize: 13 }}>{s.item}</div><div className="caption">{s.division} · {fmtRp(s.cost)}</div></div>
            {s.fulfilled ? <span className="badge-ok"> Terpenuhi</span> : <span className="badge-warn">Belum</span>}
          </div>)}
        </div>
      </div>
      <div className="card">
        <div className="between" style={{ marginBottom: 12 }}><div className="h4">Approval Berlapis</div><button className="btn btn-ghost btn-sm" onClick={() => nav('/approval')}>Buka</button></div>
        <div className="stack">
          {bookings.slice(0, 3).map(b => { const e = equipment.find(x => x.id === b.equipmentId); const done = b.approvals.filter(a => a.status === 'APPROVED').length; return (
            <div key={b.id} className="between">
              <div><div style={{ fontWeight: 400, fontSize: 13 }} className="mono">{b.code}</div><div className="caption">{e?.name?.slice(0, 24)}</div></div>
              <div style={{ textAlign: 'right' }}><StatusBadge s={b.status} /><div className="caption">{done}/4 disetujui</div></div>
            </div>); })}
        </div>
      </div>
    </div>
  </DashboardLayout>;
}