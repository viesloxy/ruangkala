import { useNavigate, useParams } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { fmtRp, fmtDate } from '../utils';
import { Camera, Check, AlertTriangle, Star, ShieldCheck, Package, PackageCheck } from 'lucide-react';

export function SerahTerimaView() {
  const { id } = useParams();
  const nav = useNavigate();
  const { bookings, equipment, handovers, toggleHandover, rate, dispute, user, setBookingStatus, notify } = useApp();
  const b = bookings.find(x => x.id === id) || bookings.find(x => x.equipmentId === id);
  const eq = equipment.find(e => e.id === b?.equipmentId);
  const h = handovers.find(x => x.bookingId === b?.id);
  if (!b || !eq) return <DashboardLayout nav="dash"><div className="empty">Tidak ditemukan.</div></DashboardLayout>;
  const rated = (h?.rating || 0) > 0;
  const status = b.status;

  const confirmCheckout = () => {
    if (!h?.checkoutPhoto) { notify('Unggah foto kondisi awal dulu.'); return; }
    setBookingStatus(b.id, 'ON_LOAN');
    notify('Barang diserahkan. Status jadi Sedang Dipinjam.');
  };
  const confirmReturn = () => {
    if (!h?.checkinPhoto) { notify('Unggah foto kondisi akhir dulu.'); return; }
    if (!h?.completenessOk) { notify('Centang kelengkapan komponen dulu.'); return; }
    setBookingStatus(b.id, 'COMPLETED');
    notify('Barang dikembalikan. Transaksi selesai.');
  };

  return <DashboardLayout nav="dash">
    <button className="btn btn-ghost btn-sm" style={{ marginBottom: 14 }} onClick={() => nav(`/checkout/${b.id}`)}>← Kembali ke Status</button>
    <div className="page-title">Serah-Terima Fisik</div>
    <div className="page-sub">Dokumentasikan kondisi barang sebelum & sesudah dipakai.</div>

    <div className="card" style={{ marginBottom: 16 }}>
      <div className="row" style={{ gap: 14 }}>
        <img className="sq" src={eq.img} alt="" style={{ width: 56, height: 56 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 400, fontSize: 15 }}>{eq.name}</div>
          <div className="caption mono">{b.code} · {fmtDate(b.startDate)} – {fmtDate(b.endDate)}</div>
        </div>
        <div style={{ textAlign: 'right' }}><div className="price" style={{ fontSize: 15 }}>{fmtRp(b.total)}</div>
          <span className={status === 'COMPLETED' ? 'badge-ok' : status === 'ON_LOAN' ? 'badge-warn' : 'badge-ok'}>{status === 'COMPLETED' ? 'Selesai' : status === 'ON_LOAN' ? 'Sedang Dipinjam' : 'Siap Diambil'}</span></div>
      </div>
    </div>

    {/* Foto Before/After */}
    <div className="grid g2" style={{ marginBottom: 16 }}>
      {[
        { label: 'Foto Kondisi Awal (Check-Out)', field: 'checkoutPhoto' as const, img: 'https://picsum.photos/seed/rk-ktm/600/400', done: h?.checkoutPhoto },
        { label: 'Foto Kondisi Akhir (Check-In)', field: 'checkinPhoto' as const, img: 'https://picsum.photos/seed/rk-ktm/600/400', done: h?.checkinPhoto },
      ].map(f => <div key={f.field} className="card">
        <div className="h4" style={{ fontSize: 14, marginBottom: 10 }}>{f.label}</div>
        <div style={{ border: '1px solid #D6E9FF', borderRadius: 16, background: '#F8FBFF', padding: 14, textAlign: 'center' }}>
          {f.done ? <img src={f.img} alt="" style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 10 }} /> : <>
            <Camera size={32} color="var(--brand)" style={{ margin: '12px auto 6px' }} />
            <div className="caption">Ambil foto kondisi barang</div>
          </>}
          <button className={`btn ${f.done ? 'btn-ghost' : 'btn-primary'} btn-sm`} style={{ marginTop: 10 }} onClick={() => toggleHandover(b.id, f.field)}>
            {f.done ? <><Check size={12} /> Terunggah, ganti</> : <><Camera size={12} /> Unggah Foto (Simulasi)</>}
          </button>
        </div>
      </div>)}
    </div>

    {/* Checklist + Rating */}
    <div className="grid g2" style={{ marginBottom: 16 }}>
      <div className="card">
        <div className="h4" style={{ fontSize: 14, marginBottom: 10 }}>Cek Kelengkapan & Identitas</div>
        <label className="row" style={{ gap: 8, marginBottom: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={h?.completenessOk || false} onChange={() => toggleHandover(b.id, 'completenessOk')} />
          <span style={{ fontSize: 13.5 }}>Semua komponen lengkap ({eq.completeness.join(', ')})</span>
        </label>
        <div className="row" style={{ gap: 8 }}><ShieldCheck size={14} color="var(--ok)" /><span className="caption">KTM/NIM {user.name} telah dicocokkan</span></div>
      </div>
      <div className="card" style={{ textAlign: 'center' }}>
        <div className="h4" style={{ fontSize: 14, marginBottom: 10 }}>Rating Reputasi NIM</div>
        <div className="row" style={{ justifyContent: 'center', gap: 6 }}>
          {[1, 2, 3, 4, 5].map(s => <button key={s} onClick={() => { rate(b.id, s); }}>
            <Star size={30} color={s <= (h?.rating || 0) ? '#167EFB' : '#E2E8F0'} fill={s <= (h?.rating || 0) ? '#167EFB' : 'none'} />
          </button>)}
        </div>
        {rated && <div className="badge-ok" style={{ marginTop: 8, display: 'inline-flex' }}><Check size={11} /> Rating {h?.rating} bintang diberikan</div>}
      </div>
    </div>

    {/* Aksi sesuai status */}
    <div className="card" style={{ background: status === 'COMPLETED' ? 'var(--surface-tint)' : '#fff', borderColor: status === 'COMPLETED' ? 'var(--azure-100)' : 'var(--border)' }}>
      {status === 'CONFIRMED_READY' && <>
        <div className="h4" style={{ fontSize: 14, marginBottom: 6 }}>Langkah 1: Barang Diserahkan</div>
        <div className="caption" style={{ marginBottom: 12 }}>Setelah foto kondisi awal diunggah & kelengkapan dicentang, konfirmasi penyerahan barang ke peminjam.</div>
        <div className="row wrap" style={{ gap: 10 }}>
          <button className="btn btn-primary" onClick={confirmCheckout}><Package size={14} /> Konfirmasi Barang Diserahkan</button>
          <button className="btn btn-danger" onClick={() => dispute(b.id)}><AlertTriangle size={14} /> Laporkan Masalah</button>
        </div>
      </>}
      {status === 'ON_LOAN' && <>
        <div className="h4" style={{ fontSize: 14, marginBottom: 6 }}>Langkah 2: Barang Dikembalikan</div>
        <div className="caption" style={{ marginBottom: 12 }}>Barang sedang dipinjam. Setelah foto kondisi akhir diunggah & kelengkapan dicentang, konfirmasi pengembalian.</div>
        <div className="row wrap" style={{ gap: 10 }}>
          <button className="btn btn-primary" onClick={confirmReturn}><PackageCheck size={14} /> Konfirmasi Barang Dikembalikan</button>
          <button className="btn btn-danger" onClick={() => dispute(b.id)}><AlertTriangle size={14} /> Laporkan Kerusakan</button>
        </div>
      </>}
      {status === 'COMPLETED' && <>
        <div className="h4" style={{ fontSize: 14, marginBottom: 6 }}><Check size={15} color="var(--ok)" /> Transaksi Selesai</div>
        <div className="caption" style={{ marginBottom: 12 }}>Barang telah dikembalikan & transaksi tercatat. Reputasi NIM sudah diperbarui.</div>
        <button className="btn btn-ghost" onClick={() => nav('/pinjaman-saya')}>Lihat Riwayat Pinjaman</button>
      </>}
      {h?.disputed && <div className="badge-danger" style={{ marginTop: 10, display: 'inline-flex' }}>Tiket sengketa dibuat. Admin meninjau foto Before/After</div>}
    </div>
  </DashboardLayout>;
}