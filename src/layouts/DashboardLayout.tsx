import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Search, CalendarClock, Package, BadgeCheck, Boxes, ShieldCheck, LogOut, Bell, MapPin, Plus, Wallet, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CLUSTERS } from '../data/universities';

export function DashboardLayout({ nav, children }: { nav: string; children: React.ReactNode }) {
  const { user, role, logout, kampus, setKampus, campuses, toast, notify, resetDemo } = useApp();
  const navigate = useNavigate();

  const links = role === 'ORMAWA' ? [
    { to: '/ormawa', label: 'Dashboard', icon: LayoutDashboard, key: 'dash' },
    { to: '/katalog', label: 'Cari Perlengkapan', icon: Search, key: 'katalog' },
    { to: '/langganan', label: 'Paket & Langganan', icon: CreditCard, key: 'langganan' },
    { to: '/sps', label: 'SPS 2 Termin', icon: CalendarClock, key: 'sps' },
    { to: '/approval', label: 'Approval & LPJ', icon: BadgeCheck, key: 'approval' },
    { to: '/inventaris', label: 'Inventaris Ormawa', icon: Boxes, key: 'inventaris' },
  ] : role === 'ADMIN' ? [
    { to: '/admin', label: 'Dashboard Admin', icon: ShieldCheck, key: 'dash' },
    { to: '/admin/keuangan', label: 'Keuangan Platform', icon: Wallet, key: 'keuangan' },
    { to: '/katalog', label: 'Semua Katalog', icon: Search, key: 'katalog' },
  ] : [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, key: 'dash' },
    { to: '/katalog', label: 'Cari Perlengkapan', icon: Search, key: 'katalog' },
    { to: '/pinjaman-saya', label: 'Pinjaman Saya', icon: Package, key: 'pinjaman' },
    { to: '/barang-saya', label: 'Barang Saya', icon: Boxes, key: 'barang' },
  ];

  return <div className="shell">
    <aside className="sidebar">
      <Link to="/" className="brand"><img src="/logo.png" alt="" /> RuangKala</Link>
      <nav className="side-nav">
        {links.map(l => <button key={l.key} className={`side-link ${nav === l.key ? 'active' : ''}`} onClick={() => navigate(l.to)}><l.icon /> {l.label}</button>)}
      </nav>
      <div className="side-user" onClick={() => navigate('/profil')} style={{ cursor: 'pointer' }} title="Buka Profil & Verifikasi">
        <img className="avatar" src={user.avatar} alt="" />
        <div className="side-user-info">
          <div className="side-user-name">{user.name}</div>
          <div className="side-user-nim">{user.nim}</div>
          <div className="side-user-role">{user.roleLabel}</div>
        </div>
        <button className="logout-btn" onClick={e => { e.stopPropagation(); logout(); navigate('/'); }} title="Keluar"><LogOut size={14} /></button>
      </div>
      <button className="side-reset" onClick={() => { if (confirm('Reset semua data demo ke kondisi awal?')) resetDemo(); }}>Reset Data Demo</button>
    </aside>
    <div className="main-area">
      <div className="main-topbar">
        <div className="campus-sw" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <MapPin size={14} />
          <select value={kampus} onChange={e => setKampus(e.target.value)} style={{ border: 'none', background: 'none', fontSize: 13, color: 'var(--ink)', cursor: 'pointer', outline: 'none', maxWidth: 200 }}
            title="Pilih kampus aktif">
            {CLUSTERS.map(cl => <optgroup key={cl} label={cl}>
              {campuses.filter(c => c.cluster === cl).map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </optgroup>)}
          </select>
          <span className="muted">· {campuses.find(c => c.name === kampus)?.cluster}</span>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => notify('Tidak ada notifikasi baru')}><Bell size={14} /></button>
          {role === 'MAHASISWA' && <button className="btn btn-primary btn-sm" onClick={() => navigate('/barang-saya')}><Plus size={13} /> Upload</button>}
          <span className="badge-ok" style={{ fontSize: 11 }}>{user.roleLabel}</span>
        </div>
      </div>
      <div className="main-content">{children}</div>
    </div>
    {toast && <div className="toast">{toast}</div>}
  </div>;
}