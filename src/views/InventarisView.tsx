import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { fmtRp, scopeLabel } from '../utils';
import { Lock, Unlock, Package, TrendingUp, Inbox } from 'lucide-react';

export function InventarisView() {
  const { equipment, toggleScope } = useApp();
  const internal = equipment.filter(e => e.scope === 'SCOPE_INTERNAL').length;
  const open = equipment.length - internal;
  const income = equipment.reduce((a, e) => a + (e.scope !== 'SCOPE_INTERNAL' ? e.dailyRate : 0), 0);

  return <DashboardLayout nav="inventaris">
    <div className="page-title">Inventaris Ormawa</div>
    <div className="page-sub">Kelola aset organisasi & atur lingkup akses peminjaman (Aturan R-03).</div>

    <div className="grid g3" style={{ marginBottom: 20 }}>
      <div className="card"><div className="row between"><Package size={18} color="var(--brand)" /><span className="caption">Total Aset</span></div>
        <div className="price" style={{ marginTop: 8 }}>{equipment.length}</div><div className="caption">{internal} internal · {open} terbuka</div></div>
      <div className="card"><div className="row between"><TrendingUp size={18} color="var(--brand)" /><span className="caption">Potensi Kas / Hari</span></div>
        <div className="price" style={{ marginTop: 8 }}>{fmtRp(income)}</div><div className="caption">dari sewa aset menganggur</div></div>
      <div className="card"><div className="row between"><Inbox size={18} color="var(--brand)" /><span className="caption">Permintaan Masuk</span></div>
        <div className="price" style={{ marginTop: 8 }}>2</div><div className="caption">menunggu persetujuan</div></div>
    </div>

    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
        <thead><tr style={{ borderBottom: '1px solid var(--divider)' }}>
          {['Aset', 'Pemilik', 'Tarif', 'Lingkup Akses (R-03)', 'Tanggal Terkunci'].map(h => <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 400, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.04em' }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {equipment.map(e => <tr key={e.id} style={{ borderBottom: '1px solid var(--divider)' }}>
            <td style={{ padding: '12px 16px' }}><div className="row" style={{ gap: 10 }}><img className="sq" src={e.img} alt="" style={{ width: 36, height: 36 }} /><div><div style={{ fontWeight: 400 }}>{e.name}</div><div className="caption">{e.category} · Kondisi {e.condition}%</div></div></div></td>
            <td style={{ padding: '12px 16px' }}><div style={{ fontWeight: 400, fontSize: 13 }}>{e.ownerName}</div><div className="caption">{e.ownerOrg}</div></td>
            <td style={{ padding: '12px 16px' }}>{e.dailyRate === 0 ? <span className="badge-ok">Gratis</span> : fmtRp(e.dailyRate)}</td>
            <td style={{ padding: '12px 16px' }}>
              <button className={`btn ${e.scope === 'SCOPE_INTERNAL' ? 'btn-ghost' : 'btn-primary'} btn-sm`} onClick={() => toggleScope(e.id)}>
                {e.scope === 'SCOPE_INTERNAL' ? <><Lock size={11} /> Internal</> : <><Unlock size={11} /> Terbuka</>}
              </button>
              <div className="caption" style={{ marginTop: 4 }}>{scopeLabel(e.scope)}</div>
            </td>
            <td style={{ padding: '12px 16px' }}>{e.lockedDates.length ? <span className="caption">{e.lockedDates.length} hari</span> : <span className="badge-ok">Bebas</span>}</td>
          </tr>)}
        </tbody>
      </table>
    </div>

    <div className="card" style={{ marginTop: 16, background: 'var(--surface-tint)', borderColor: 'var(--azure-100)' }}>
      <div className="h4" style={{ fontSize: 14, marginBottom: 6 }}>Aturan 3 Tingkat Lingkup (R-03)</div>
      <div className="row wrap" style={{ gap: 8 }}>
        <span className="lock-badge"><Lock size={11} /> Khusus Internal Ormawa, hanya anggota terdaftar</span>
        <span className="chip-light">Satu Kampus, semua NIM terverifikasi</span>
        <span className="chip-light">Klaster Terdekat, kampus tetangga sekitar</span>
      </div>
    </div>
  </DashboardLayout>;
}