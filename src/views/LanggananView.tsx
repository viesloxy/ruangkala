import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { fmtRp } from '../utils';
import { Check, Building2, CalendarClock, Package, ArrowRight } from 'lucide-react';

const plans = [
  { key: 'TRIAL' as const, icon: CalendarClock, name: 'Trial 1 Acara', price: 'Gratis', unit: '', desc: 'Coba dulu tanpa biaya untuk 1 acara.', feats: ['1 acara gratis', 'Akses katalog penuh', 'SPS + LPJ'] },
  { key: 'PROKER' as const, icon: Package, name: 'Paket Proker', price: 'Rp25.000', unit: '/acara', desc: 'Bayar per acara, tanpa komitmen semester.', feats: ['Per acara', 'Tanpa kontrak', 'Cocok untuk kepanitiaan kecil'] },
  { key: 'SEMESTER' as const, icon: Building2, name: 'Langganan Semester', price: 'Rp99.000', unit: '/semester', desc: 'Paling hemat & mudah diprediksi.', feats: ['Semester penuh', 'Biaya platform Rp0', 'Prioritas kunci tanggal'] },
];

export function LanggananView() {
  const nav = useNavigate();
  const { subPlan, subStatus, buyPlan, ledger, user } = useApp();
  const active = subStatus === 'ACTIVE';
  return <DashboardLayout nav="langganan">
    <div className="page-title">Paket & Langganan Ormawa</div>
    <div className="page-sub">Status langganan {user.roleLabel}. Pilih paket sesuai kebutuhan kepanitiaan.</div>

    {active && <div className="card" style={{ marginBottom: 20, borderColor: 'var(--ok)', background: 'var(--surface-tint)' }}>
      <div className="between wrap">
        <div className="row" style={{ gap: 10 }}>
          <Check size={20} color="var(--ok)" />
          <div><div style={{ fontSize: 14 }}>Paket aktif: {subPlan === 'SEMESTER' ? 'Langganan Semester (Rp99.000)' : subPlan === 'PROKER' ? 'Paket Proker (Rp25.000)' : 'Trial 1 Acara (Gratis)'}</div>
          <div className="caption">Biaya platform Rp0. Tinggal bayar sewa ke pemilik.</div></div>
        </div>
        <span className="badge-ok">Aktif</span>
      </div>
    </div>}

    <div className="grid g3" style={{ marginBottom: 20 }}>
      {plans.map(p => {
        const isActive = active && subPlan === p.key;
        return <div key={p.key} className="card" style={{ display: 'flex', flexDirection: 'column', borderColor: isActive ? 'var(--brand)' : undefined }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--surface-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><p.icon size={20} color="var(--brand)" /></div>
          <div className="h4" style={{ marginBottom: 4 }}>{p.name}</div>
          <div style={{ marginBottom: 8 }}><span className="price" style={{ fontSize: 22 }}>{p.price}</span> <span className="price-muted">{p.unit}</span></div>
          <div className="caption" style={{ marginBottom: 14, minHeight: 36 }}>{p.desc}</div>
          <div className="stack" style={{ gap: 6, marginBottom: 16, flex: 1 }}>
            {p.feats.map(f => <div key={f} className="row" style={{ gap: 8 }}><Check size={13} color="var(--ok)" /><span style={{ fontSize: 12.5 }}>{f}</span></div>)}
          </div>
          <button className={`btn ${isActive ? 'btn-ghost' : 'btn-primary'}`} disabled={isActive} onClick={() => buyPlan(p.key)}>
            {isActive ? 'Paket Aktif' : <>Pilih Paket <ArrowRight size={13} /></>}
          </button>
        </div>;
      })}
    </div>

    <div className="card">
      <div className="h4" style={{ marginBottom: 10 }}>Riwayat Pembayaran Langganan</div>
      {ledger.filter(l => l.source === 'ORMAWA_SUBSCRIPTION' || l.source === 'PROKER_PACKAGE').length ? (
        <div className="stack">
          {ledger.filter(l => l.source === 'ORMAWA_SUBSCRIPTION' || l.source === 'PROKER_PACKAGE').map(l => (
            <div key={l.id} className="between" style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <div><div style={{ fontSize: 13 }}>{l.label}</div><div className="caption">{l.source === 'ORMAWA_SUBSCRIPTION' ? 'Langganan Ormawa' : 'Paket Proker'}</div></div>
              <div className="row" style={{ gap: 10 }}><span className="mono" style={{ fontSize: 13 }}>{fmtRp(l.amount)}</span><span className={l.status === 'PAID' ? 'badge-ok' : 'badge-warn'}>{l.status === 'PAID' ? 'Lunas' : 'Menunggu'}</span></div>
            </div>
          ))}
        </div>
      ) : <div className="caption">Belum ada pembayaran paket.</div>}
    </div>
  </DashboardLayout>;
}