import { useNavigate, useParams } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { fmtRp, fmtDate } from '../utils';
import { QrCode, Check, Clock, MapPin, Wallet, Building2, GraduationCap, CreditCard, ArrowRight, ClipboardList, Package, Star } from 'lucide-react';

const STAGES = [
  { t: 'Diajukan', icon: ClipboardList },
  { t: 'Disetujui', icon: Check },
  { t: 'Dibayar', icon: CreditCard },
  { t: 'Diserahkan', icon: Package },
  { t: 'Selesai', icon: Star },
];
const stageIndex: Record<string, number> = {
  PENDING_OWNER: 1, LOCKED_AWAITING_PAY: 2, CONFIRMED_READY: 3, ON_LOAN: 4, COMPLETED: 5,
};

export function CheckoutView() {
  const { id } = useParams();
  const nav = useNavigate();
  const { equipment, user, bookings, role, subStatus, subPlan, payBooking, buyPlan, setBookingStatus } = useApp();
  const b = bookings.find(x => x.id === id) || bookings.find(x => x.equipmentId === id);
  const eq = equipment.find(e => e.id === b?.equipmentId) || equipment.find(e => e.id === id);
  if (!eq) return <DashboardLayout nav="katalog"><div className="empty">Tidak ditemukan.</div></DashboardLayout>;

  const status = b?.status || 'PENDING_OWNER';
  const cur = stageIndex[status] ?? 0;
  const isOrmawa = role === 'ORMAWA';
  const quotaLeft = user.quota;
  const activeSub = subStatus === 'ACTIVE' && (subPlan === 'SEMESTER' || subPlan === 'PROKER');

  let fee = 0, feeLabel = '', feeNote = '', scenario = '';
  if (isOrmawa) {
    scenario = 'Ormawa / Kepanitiaan';
    if (activeSub) { fee = 0; feeLabel = 'Langganan Aktif · Rp0'; feeNote = 'Biaya platform gratis selama langganan aktif. Bayar sewa langsung ke pemilik.'; }
    else { fee = 0; feeLabel = 'Trial 1 Acara · Rp0'; feeNote = 'Sesi trial gratis. Habis itu pilih Rp25.000/proker atau Rp99.000/semester.'; }
  } else if (quotaLeft > 0) {
    scenario = 'Mahasiswa (Kuota Aktif)';
    fee = 0; feeLabel = `Kuota Gratis · Rp0 (sisa ${quotaLeft})`; feeNote = '3 transaksi pertama gratis. Habis itu Rp1.000/transaksi via QRIS.';
  } else {
    scenario = 'Mahasiswa (Kuota Habis)';
    fee = 1000; feeLabel = 'Rp1.000 (QRIS)'; feeNote = 'Kuota gratis habis. Biaya layanan Rp1.000/transaksi via QRIS.';
  }

  const payFee = b ? b.platformFee : fee;
  const rental = b ? b.rentalCost : eq.dailyRate * 3;
  const total = b ? b.total : rental + fee;

  return <DashboardLayout nav="katalog">
    <button className="btn btn-ghost btn-sm" style={{ marginBottom: 14 }} onClick={() => nav(`/katalog/${eq.id}`)}>← Kembali</button>
    <div className="page-title">Status Pengajuan {b?.code}</div>
    <div className="page-sub">Pantau alur dari pengajuan sampai barang kembali, semua di satu halaman.</div>

    {/* FLOW VISUAL */}
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="flow-steps">
        {STAGES.map((s, i) => (
          <div key={s.t} className={`flow-step ${i < cur ? 'done' : i === cur ? 'active' : ''}`}>
            <div className="fs-icon"><s.icon size={20} /></div>
            <div className="fs-label">{s.t}</div>
          </div>
        ))}
      </div>
      <div className="caption" style={{ textAlign: 'center', marginTop: 14 }}>
        {status === 'PENDING_OWNER' && 'Menunggu persetujuan pemilik. Setelah disetujui, tanggal terkunci & lanjut ke pembayaran.'}
        {status === 'LOCKED_AWAITING_PAY' && 'Disetujui! Tanggal terkunci. Selesaikan pembayaran (atau lanjut jika gratis).'}
        {status === 'CONFIRMED_READY' && 'Lunas. Barang siap diambil. Buka halaman serah-terima untuk konfirmasi penyerahan.'}
        {status === 'ON_LOAN' && 'Barang sedang dipinjam. Buka serah-terima untuk konfirmasi saat barang dikembalikan.'}
        {status === 'COMPLETED' && 'Transaksi selesai. Barang telah dikembalikan & tercatat.'}
      </div>
    </div>

    {/* Badge skenario role */}
    <div className="card" style={{ marginBottom: 16, background: 'var(--surface-tint)', borderColor: 'var(--azure-200)' }}>
      <div className="row" style={{ gap: 10 }}>
        {isOrmawa ? <Building2 size={20} color="var(--brand)" /> : <GraduationCap size={20} color="var(--brand)" />}
        <div><div style={{ fontSize: 14 }}>Skenario Pembayaran: {scenario}</div><div className="caption">{feeNote}</div></div>
      </div>
    </div>
    {/* PLACEHOLDER_GRID */}
    <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 20 }} className="detail-grid">
      <div className="stack">
        <div className="card">
          <div className="h4" style={{ marginBottom: 10 }}>Rincian Booking</div>
          <div className="row" style={{ gap: 12, marginBottom: 10 }}><img className="sq" src={eq.img} alt="" /><div><div style={{ fontWeight: 400, fontSize: 14 }}>{eq.name}</div><div className="caption mono">{b?.code}</div></div></div>
          <div className="divider" />
          <div className="between" style={{ marginBottom: 6 }}><span className="muted">Durasi</span><span>{b?.days || 3} hari ({b ? fmtDate(b.startDate) : ''} – {b ? fmtDate(b.endDate) : ''})</span></div>
          <div className="between" style={{ marginBottom: 6 }}><span className="muted">Biaya sewa (→ pemilik)</span><span>{fmtRp(rental)}</span></div>
          <div className="between"><span className="muted">Biaya platform (→ RuangKala)</span><span className={payFee === 0 ? 'badge-ok' : 'badge-warn'}>{payFee === 0 ? feeLabel : 'Rp1.000 (QRIS)'}</span></div>
          <div className="divider" style={{ margin: '10px 0' }} />
          <div className="between"><strong>Total</strong><strong className="price">{fmtRp(total)}</strong></div>
          <div className="caption" style={{ marginTop: 8 }}>Pembayaran platform dilakukan <b>di awal</b> sebelum barang diambil. Biaya sewa dibayar langsung ke pemilik saat serah-terima (COD).</div>
        </div>
        {/* ACTION PANEL */}
        <div className="card">
          {status === 'PENDING_OWNER' && <>
            <div className="h4" style={{ marginBottom: 8 }}>Menunggu Persetujuan Pemilik</div>
            <div className="badge-warn" style={{ marginBottom: 12, display: 'inline-flex' }}><Clock size={12} /> Menunggu persetujuan pemilik</div>
            <div className="caption" style={{ marginBottom: 12 }}>Pemilik akan menerima notifikasi & menyetujui pengajuan. Tanggal baru terkunci setelah disetujui.</div>
            <button className="btn btn-primary" onClick={() => { setBookingStatus(b!.id, 'LOCKED_AWAITING_PAY'); }}><Check size={14} /> Simulasi: Pemilik Setujui</button>
          </>}
          {status === 'LOCKED_AWAITING_PAY' && (payFee > 0 ? <>
            <div className="h4" style={{ marginBottom: 12 }}><QrCode size={16} style={{ verticalAlign: 'middle' }} /> Bayar via QRIS</div>
            <div style={{ textAlign: 'center' }}>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=RuangKala|${b?.code}|Rp${total}`} alt="QRIS" style={{ width: 200, height: 200, margin: '0 auto 10px', borderRadius: 12 }} />
              <div className="between" style={{ maxWidth: 280, margin: '0 auto 10px' }}><span className="muted">Total bayar</span><strong className="price">{fmtRp(total)}</strong></div>
              <div className="badge-warn" style={{ display: 'inline-flex' }}><Clock size={12} /> Berlaku 15 menit</div>
              <div className="caption" style={{ margin: '8px 0 12px' }}>MDR 0% untuk nominal ≤ Rp100.000. Scan QR dengan aplikasi bank/e-wallet apa pun.</div>
              <button className="btn btn-primary" style={{ width: '100%', maxWidth: 280 }} onClick={() => payBooking(b!.id)}><Check size={14} /> Simulasi Bayar Berhasil</button>
            </div>
          </> : <>
            <div className="h4" style={{ marginBottom: 8 }}>Tidak Ada Biaya Platform</div>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--surface-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}><Check size={30} color="var(--ok)" /></div>
            <div className="caption" style={{ marginBottom: 12 }}>{isOrmawa ? 'Biaya platform Rp0. ' + (activeSub ? 'Langganan aktif.' : 'Trial gratis.') : `Kuota gratis masih tersisa ${quotaLeft}.`} Sewa {fmtRp(rental)} dibayar ke pemilik saat serah-terima.</div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => payBooking(b!.id)}><Check size={14} /> Konfirmasi & Lanjut (Gratis)</button>
            {isOrmawa && !activeSub && <button className="btn btn-ghost btn-sm" style={{ marginTop: 8 }} onClick={() => buyPlan('SEMESTER')}><CreditCard size={13} /> Ambil Langganan Rp99rb/sem</button>}
          </>)}
          {(status === 'CONFIRMED_READY' || status === 'ON_LOAN') && <>
            <div className="h4" style={{ marginBottom: 8 }}>{status === 'CONFIRMED_READY' ? 'Siap Diambil' : 'Sedang Dipinjam'}</div>
            <div className={status === 'CONFIRMED_READY' ? 'badge-ok' : 'badge-warn'} style={{ marginBottom: 12, display: 'inline-flex' }}><Check size={12} /> {status === 'CONFIRMED_READY' ? 'Lunas, siap diambil' : 'Barang sedang dipinjam'}</div>
            <div className="caption" style={{ marginBottom: 12 }}>{status === 'CONFIRMED_READY' ? 'Buka halaman serah-terima untuk foto kondisi awal & konfirmasi barang diserahkan.' : 'Sudah diserahkan. Buka serah-terima untuk foto kondisi akhir saat barang dikembalikan.'}</div>
            <button className="btn btn-primary" onClick={() => nav(`/serah-terima/${b?.id}`)}>Buka Halaman Serah-Terima <ArrowRight size={14} /></button>
          </>}
          {status === 'COMPLETED' && <>
            <div className="h4" style={{ marginBottom: 8 }}>Transaksi Selesai</div>
            <div className="badge-ok" style={{ marginBottom: 12, display: 'inline-flex' }}><Star size={12} /> Barang dikembalikan</div>
            <div className="caption">Terima kasih! Reputasi NIM diperbarui. Kamu bisa mengajukan pinjaman baru.</div>
            <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={() => nav('/pinjaman-saya')}>Lihat Riwayat Pinjaman</button>
          </>}
        </div>
      </div>

      {/* TIKET */}
      <div className="card" style={{ position: 'sticky', top: 90, height: 'fit-content' }}>
        <div className="h4" style={{ marginBottom: 10 }}>Tiket Serah-Terima</div>
        {(status === 'CONFIRMED_READY' || status === 'ON_LOAN' || status === 'COMPLETED') ? <>
          <div className="badge-ok" style={{ marginBottom: 12, display: 'inline-flex' }}><Check size={12} /> {status === 'COMPLETED' ? 'Selesai' : status === 'ON_LOAN' ? 'Dipinjam' : 'Siap Diambil'}</div>
          <div className="divider" />
          <div className="row" style={{ gap: 8, marginBottom: 6 }}><MapPin size={14} color="var(--brand)" /><span style={{ fontSize: 13 }}>{eq.location}</span></div>
          <div className="row" style={{ gap: 8, marginBottom: 6 }}><Wallet size={14} color="var(--brand)" /><span style={{ fontSize: 13 }}>Sewa {fmtRp(rental)} ke pemilik (COD)</span></div>
          <div className="row" style={{ gap: 8, marginBottom: 12 }}><Wallet size={14} color="var(--brand)" /><span style={{ fontSize: 13 }}>Platform {payFee === 0 ? 'Rp0' : fmtRp(payFee)} (lunas)</span></div>
          {status !== 'COMPLETED' && <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => nav(`/serah-terima/${b?.id}`)}>Buka Halaman Serah-Terima</button>}
        </> : <>
          <div className="badge-warn" style={{ marginBottom: 12, display: 'inline-flex' }}>{status === 'PENDING_OWNER' ? 'Menunggu persetujuan' : 'Menunggu pembayaran'}</div>
          <div className="divider" />
          <div className="between" style={{ marginBottom: 6 }}><span className="muted">Total</span><strong className="price">{fmtRp(total)}</strong></div>
          <div className="caption" style={{ marginBottom: 12 }}>{status === 'PENDING_OWNER' ? 'Tiket terbit setelah pemilik menyetujui & pembayaran selesai.' : 'Selesaikan pembayaran di panel kiri, lalu tiket terbit otomatis.'}</div>
          <button className="btn btn-ghost" style={{ width: '100%' }} disabled>Tiket belum aktif</button>
        </>}
      </div>
    </div>
    <style>{`@media(max-width:1100px){.detail-grid{grid-template-columns:1fr!important}}`}</style>
  </DashboardLayout>;
}