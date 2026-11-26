import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { fmtRp, fmtDate, scopeChipLabel } from '../utils';
import { MapPin, ShieldCheck, Clock, Lock, Check, AlertTriangle, Star } from 'lucide-react';

export function DetailView() {
  const { id } = useParams();
  const nav = useNavigate();
  const { equipment, book, user, notify } = useApp();
  const e = equipment.find(x => x.id === id);
  const [start, setStart] = useState('2026-11-17');
  const [end, setEnd] = useState('2026-11-19');
  if (!e) return <DashboardLayout nav="katalog"><div className="empty">Barang tidak ditemukan.</div></DashboardLayout>;

  const locked = e.scope === 'SCOPE_INTERNAL';
  const days = Math.max(1, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 864e5) + 1);
  const daysValid = days >= 1 && days <= 3;
  const fee = user.quota > 0 ? 0 : 1000;
  const total = e.dailyRate * days;

  const submit = () => {
    const r = book(e.id, start, end);
    notify(r.msg);
    if (r.ok && r.id) nav('/checkout/' + r.id);
  };

  return <DashboardLayout nav="katalog">
    <button className="btn btn-ghost btn-sm" style={{ marginBottom: 14 }} onClick={() => nav('/katalog')}> Kembali ke Katalog</button>
    <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 20 }} className="detail-grid">
      {/* Kiri */}
      <div className="stack">
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <img src={e.img} alt={e.name} style={{ width: '100%', height: 280, objectFit: 'cover' }} />
          <div style={{ padding: 20 }}>
            <div className="between wrap" style={{ marginBottom: 8 }}>
              <div className="h2">{e.name}</div>
              {e.dailyRate === 0 ? <span className="badge-ok">Gratis Rp0</span> : <div><span className="price">{fmtRp(e.dailyRate)}</span> <span className="price-muted">/hari</span></div>}
            </div>
            <div className="row wrap" style={{ gap: 6 }}>
              <span className="badge-ok"><ShieldCheck size={11} /> NIM Terverifikasi</span>
              <span className="chip-light">{scopeChipLabel(e.scope)}</span>
              <span className="chip-light">Kondisi {e.condition}%</span>
              <span className="chip-light"> {user.reputation} pemilik</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="h4" style={{ marginBottom: 10 }}>Kelengkapan Unit</div>
          <div className="row wrap" style={{ gap: 6 }}>{e.completeness.map(c => <span key={c} className="chip-light"><Check size={11} /> {c}</span>)}</div>
        </div>

        <div className="card">
          <div className="h4" style={{ marginBottom: 10 }}>Riwayat Kondisi Fisik</div>
          <div className="row" style={{ gap: 12 }}>
            <img src="https://picsum.photos/seed/rk-cond/600/400" alt="" style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover' }} />
            <div><div style={{ fontWeight: 400, fontSize: 13.5 }}>Baik, semua komponen lengkap</div><div className="caption">Dicek 10 Nov 2026 · NIM 4342410xx · Foto kondisi awal tersimpan</div></div>
          </div>
        </div>

        <div className="card">
          <div className="h4" style={{ marginBottom: 10 }}>Info Pengambilan</div>
          <div className="stack" style={{ gap: 8 }}>
            <div className="row" style={{ gap: 8 }}><MapPin size={15} color="var(--brand)" /><span style={{ fontSize: 13.5 }}>{e.location}</span></div>
            <div className="row" style={{ gap: 8 }}><Clock size={15} color="var(--brand)" /><span style={{ fontSize: 13.5 }}>Durasi peminjaman 13 hari</span></div>
            <div className="row" style={{ gap: 8 }}><ShieldCheck size={15} color="var(--brand)" /><span style={{ fontSize: 13.5 }}>Estimasi ganti rugi: {fmtRp(e.replacementValue)}</span></div>
          </div>
        </div>
      </div>

      {/* Kanan sticky */}
      <div>
        <div className="card" style={{ position: 'sticky', top: 90 }}>
          <div className="h4" style={{ marginBottom: 12 }}>Kunci Tanggal Acara</div>
          {locked ? <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <span className="lock-badge" style={{ fontSize: 13, padding: '8px 16px' }}><Lock size={14} /> Khusus Internal {e.ownerOrg}</span>
            <div className="caption" style={{ marginTop: 10 }}>Aturan R-03: inventaris ini hanya dapat dipinjam oleh anggota {e.ownerOrg}. Ajukan melalui pengurus jika keberatan.</div>
          </div> : <>
            <div className="row" style={{ gap: 8, marginBottom: 10 }}>
              <div className="field" style={{ flex: 1 }}><label>Mulai</label><input className="input" type="date" value={start} onChange={ev => setStart(ev.target.value)} /></div>
              <div className="field" style={{ flex: 1 }}><label>Selesai</label><input className="input" type="date" value={end} onChange={ev => setEnd(ev.target.value)} /></div>
            </div>
            {!daysValid && <div className="badge-danger" style={{ marginBottom: 10, display: 'inline-flex' }}><AlertTriangle size={11} /> Pilih rentang 13 hari</div>}
            <div className="divider" />
            <div className="between" style={{ marginBottom: 6 }}><span className="muted">Durasi</span><strong>{days} hari</strong></div>
            <div className="between" style={{ marginBottom: 6 }}><span className="muted">Biaya sewa</span><span>{fmtRp(total)}</span></div>
            <div className="between" style={{ marginBottom: 10 }}><span className="muted">Biaya platform</span><span>{fee === 0 ? <span className="badge-ok">Kuota Gratis · Rp0</span> : 'Rp1.000 (QRIS)'}</span></div>
            <div className="between" style={{ marginBottom: 14 }}><strong>Total</strong><strong className="price">{fmtRp(total + fee)}</strong></div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={!daysValid} onClick={submit}><Lock size={15} /> Ajukan Kunci Tanggal</button>
            <div className="caption" style={{ marginTop: 8, textAlign: 'center' }}>Begitu pemilik menyetujui, tanggal langsung terkunci.</div>
          </>}
        </div>
      </div>
    </div>
    <style>{`@media(max-width:1100px){.detail-grid{grid-template-columns:1fr!important}}`}</style>
  </DashboardLayout>;
}