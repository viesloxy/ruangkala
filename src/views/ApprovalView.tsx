import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { fmtRp, fmtDate } from '../utils';
import { Check, X, QrCode, Download } from 'lucide-react';

export function ApprovalView() {
  const { bookings, equipment, approve } = useApp();
  const waiting = bookings.filter(b => b.status !== 'COMPLETED' && b.status !== 'DISPUTED');
  return <DashboardLayout nav="approval">
    <div className="page-title">Approval Berlapis & LPJ</div>
    <div className="page-sub">Pengajuan sewa melewati 4 tahap: Ketua Pelaksana → Bendahara → BPI → Steering Committee.</div>

    <div className="stack">
      {waiting.map(b => {
        const eq = equipment.find(e => e.id === b.equipmentId);
        const allApproved = b.approvals.every(a => a.status === 'APPROVED');
        return <div key={b.id} className="card">
          <div className="between wrap" style={{ marginBottom: 14 }}>
            <div className="row" style={{ gap: 12 }}>
              <img className="sq" src={eq?.img} alt="" />
              <div>
                <div style={{ fontWeight: 400, fontSize: 15 }}>{eq?.name}</div>
                <div className="caption mono">{b.code} · {fmtDate(b.startDate)} s/d {fmtDate(b.endDate)} · {b.days} hari</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="price" style={{ fontSize: 16 }}>{fmtRp(b.total)}</div>
              {allApproved ? <span className="badge-ok"><Check size={11} /> Disetujui Semua</span> : <span className="badge-warn">{b.approvals.filter(a => a.status === 'APPROVED').length}/4 tahap</span>}
            </div>
          </div>

          {/* Pipeline 4 node */}
          <div className="row wrap" style={{ gap: 6, marginBottom: 14 }}>
            {b.approvals.map((a, i) => <div key={a.role} className="row" style={{ flex: 1, minWidth: 160 }}>
              <div style={{ textAlign: 'center', minWidth: 0, flex: 1 }}>
                <span className={`step-dot ${a.status === 'APPROVED' ? 'done' : a.status === 'REVISION' ? '' : 'active'}`} style={a.status === 'REVISION' ? { background: 'var(--danger)', color: '#fff' } : {}}>{a.status === 'APPROVED' ? '' : a.status === 'REVISION' ? '!' : i + 1}</span>
                <div style={{ fontSize: 10.5, fontWeight: 400, marginTop: 4 }}>{a.role}</div>
                <div className="caption" style={{ fontSize: 10 }}>{a.name || (a.status === 'PENDING' ? 'Menunggu' : 'Revisi')}</div>
              </div>
              {i < 3 && <span className={`step-line ${b.approvals[i].status === 'APPROVED' ? 'done' : ''}`} style={{ marginBottom: 28 }} />}
            </div>)}
          </div>

          {/* Aksi */}
          {!allApproved && <div className="row wrap" style={{ gap: 8 }}>
            {b.approvals.filter(a => a.status === 'PENDING').map(a => <div key={a.role} className="row" style={{ gap: 6, background: 'var(--surface-subtle)', padding: '8px 12px', borderRadius: 12 }}>
              <span className="caption" style={{ fontWeight: 400 }}>{a.role}:</span>
              <button className="btn btn-primary btn-sm" onClick={() => approve(b.id, a.role, true)}>Setujui</button>
              <button className="btn btn-ghost btn-sm" onClick={() => approve(b.id, a.role, false, 'Pertimbangkan opsi pinjam gratis')}>Revisi</button>
            </div>)}
          </div>}

          {allApproved && <div className="card-sm" style={{ background: 'var(--surface-tint)', borderColor: 'var(--azure-100)', display: 'flex', alignItems: 'center', gap: 14 }}>
            <QrCode size={48} color="var(--ink)" />
            <div style={{ flex: 1 }}>
              <div className="h4" style={{ fontSize: 13.5 }}>Bukti Konfirmasi & Kuitansi LPJ</div>
              <div className="caption">Nomor: <span className="mono">{b.code}</span> · 4 stempel waktu persetujuan lengkap</div>
            </div>
            <button className="btn btn-primary btn-sm"><Download size={12} /> Unduh PDF LPJ</button>
          </div>}
        </div>;
      })}
      {!waiting.length && <div className="empty">Semua pengajuan sudah selesai diproses.</div>}
    </div>
  </DashboardLayout>;
}