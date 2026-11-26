import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { fmtRp, fmtDate, StatusBadge } from '../utils';
import { CalendarClock, Wallet, Star, Ticket, ArrowRight, ShieldCheck } from 'lucide-react';

export function DashboardMhs() {
  const { user, bookings, equipment } = useApp();
  const nav = useNavigate();
  const active = bookings.filter(b => b.status !== 'COMPLETED' && b.status !== 'DISPUTED');
  const featured = active[0];
  const eq = featured ? equipment.find(e => e.id === featured.equipmentId) : null;

  return <DashboardLayout nav="dash">
    <div className="between wrap" style={{ marginBottom: 20 }}>
      <div><div className="page-title">Halo, {user.name.split(' ')[0]} </div><div className="page-sub">Pantau pinjaman aktif & kuota gratismu di sini.</div></div>
      <button className="btn btn-primary" onClick={() => nav('/katalog')}>Cari Perlengkapan</button>
    </div>

    {/* KPI */}
    <div className="grid g4" style={{ marginBottom: 20 }}>
      {[
        { icon: Ticket, label: 'Sisa Kuota Gratis', val: `${user.quota} / 3`, sub: 'transaksi tanpa biaya' },
        { icon: Star, label: 'Reputasi NIM', val: ` ${user.reputation}`, sub: 'skor kepercayaan' },
        { icon: Wallet, label: 'Total Hemat', val: fmtRp(active.filter(b => b.platformFee === 0).reduce((a, b) => a + b.rentalCost, 0)), sub: 'dari pinjam gratis' },
        { icon: CalendarClock, label: 'Pinjaman Aktif', val: String(active.length), sub: 'sedang berjalan' },
      ].map(k => <div key={k.label} className="card">
        <div className="row between"><k.icon size={18} color="var(--brand)" /><span className="caption">{k.label}</span></div>
        <div className="price" style={{ marginTop: 8 }}>{k.val}</div>
        <div className="caption">{k.sub}</div>
      </div>)}
    </div>

    {/* Featured pinjaman aktif */}
    {featured && eq && <div className="featured-card" style={{ marginBottom: 20 }}>
      <div className="between wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 400, opacity: .85, marginBottom: 4 }}>PINJAMAN AKTIF TERDEKAT</div>
          <div style={{ fontSize: 20, fontWeight: 400, letterSpacing: '-.02em' }}>{eq.name}</div>
          <div style={{ fontSize: 13, opacity: .9, marginTop: 4 }}>{fmtDate(featured.startDate)} s/d {fmtDate(featured.endDate)} · {featured.days} hari · {fmtRp(featured.total)}</div>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <StatusBadge s={featured.status} />
          <button className="btn btn-sm" style={{ background: '#fff', color: 'var(--brand)' }} onClick={() => nav(`/checkout/${featured.id}`)}>Lihat Status <ArrowRight size={13} /></button>
        </div>
      </div>
    </div>}

    {/* Daftar pinjaman */}
    <div className="h4" style={{ marginBottom: 12 }}>Semua Pinjaman</div>
    <div className="stack">
      {bookings.map(b => { const e = equipment.find(x => x.id === b.equipmentId); return (
        <div key={b.id} className="card-sm row" style={{ gap: 14, cursor: 'pointer' }} onClick={() => nav(`/checkout/${b.id}`)}>
          <img className="sq" src={e?.img} alt="" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 400, fontSize: 14 }}>{e?.name}</div>
            <div className="caption mono">{b.code} · {fmtDate(b.startDate)} s/d {fmtDate(b.endDate)} · {b.days} hari</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="price" style={{ fontSize: 15 }}>{fmtRp(b.total)}</div>
            <StatusBadge s={b.status} />
          </div>
        </div>); })}
      {!bookings.length && <div className="empty">Belum ada pinjaman. Mulai cari perlengkapan di katalog.</div>}
    </div>

    <div className="card" style={{ marginTop: 20, background: 'var(--surface-tint)', borderColor: 'var(--azure-100)' }}>
      <div className="row" style={{ gap: 12 }}><ShieldCheck size={22} color="var(--brand)" />
        <div><div className="h4" style={{ fontSize: 14 }}>Reputasi NIM menjaga kepercayaan</div><div className="caption">Selesaikan pinjaman tepat waktu & beri rating agar skor tetap tinggi.</div></div>
      </div>
    </div>
  </DashboardLayout>;
}