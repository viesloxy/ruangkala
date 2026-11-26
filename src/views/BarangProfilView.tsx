import { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { fmtRp, fmtDate } from '../utils';
import type { Equipment, Scope } from '../types';
import { Plus, Check, X, ShieldCheck, Pencil, Trash2, Upload } from 'lucide-react';

const emptyForm = { name: '', category: 'Dekorasi & Pompa', dailyRate: '', replacementValue: '', condition: '95', location: '', scope: 'SCOPE_CLUSTER' as Scope, completeness: '' };

export function BarangSayaView() {
  const { user, equipment, bookings, addEquipment, updateEquipment, deleteEquipment, notify, setBookingStatus } = useApp();
  const mine = equipment.filter(e => e.ownerNim === user.nim);
  const requests = bookings.filter(b => b.status === 'PENDING_OWNER');
  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setOpen(true); };
  const openEdit = (e: Equipment) => {
    setForm({ name: e.name, category: e.category, dailyRate: String(e.dailyRate), replacementValue: String(e.replacementValue), condition: String(e.condition), location: e.location, scope: e.scope, completeness: e.completeness.join(', ') });
    setEditId(e.id); setOpen(true);
  };
  const save = () => {
    if (!form.name.trim()) { notify('Nama barang wajib diisi.'); return; }
    const payload = {
      name: form.name.trim(), category: form.category,
      dailyRate: parseInt(form.dailyRate, 10) || 0,
      replacementValue: parseInt(form.replacementValue, 10) || 0,
      condition: parseInt(form.condition, 10) || 0,
      location: form.location.trim(), scope: form.scope,
      completeness: form.completeness.split(',').map(s => s.trim()).filter(Boolean),
      img: editId ? (equipment.find(e => e.id === editId)?.img || '') : `https://picsum.photos/seed/${Date.now()}/600/400`,
    };
    if (editId) updateEquipment(editId, payload); else addEquipment(payload);
    setOpen(false);
  };

  return <DashboardLayout nav="barang">
    <div className="between wrap" style={{ marginBottom: 20 }}>
      <div><div className="page-title">Barang Saya</div><div className="page-sub">Mode Pemilik Pribadi. Kelola barang yang kamu sewakan & permintaan masuk.</div></div>
      <button className="btn btn-primary" onClick={openAdd}><Plus size={14} /> Upload Barang (Gratis)</button>
    </div>

    {open && <div className="card" style={{ marginBottom: 20, borderColor: 'var(--azure-200)' }}>
      <div className="between" style={{ marginBottom: 12 }}>
        <div className="h4">{editId ? 'Edit Barang' : 'Upload Barang Baru'}</div>
        <button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}><X size={14} /> Tutup</button>
      </div>
      <div className="grid g2">
        <div className="field"><label>Nama Barang</label><input className="input" placeholder="Pompa Balon Elektrik 600W" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
        <div className="field"><label>Kategori</label><select className="select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>{['Dekorasi & Pompa', 'HT & Komunikasi', 'Proyektor', 'Sound & Mic', 'Kamera', 'Listrik', 'Lainnya'].map(c => <option key={c}>{c}</option>)}</select></div>
        <div className="field"><label>Tarif Sewa / Hari (Rp, 0 = Gratis)</label><input className="input" type="number" placeholder="25000" value={form.dailyRate} onChange={e => setForm(f => ({ ...f, dailyRate: e.target.value }))} /></div>
        <div className="field"><label>Nilai Pengganti (Rp)</label><input className="input" type="number" placeholder="350000" value={form.replacementValue} onChange={e => setForm(f => ({ ...f, replacementValue: e.target.value }))} /></div>
        <div className="field"><label>Kondisi (%)</label><input className="input" type="number" placeholder="95" value={form.condition} onChange={e => setForm(f => ({ ...f, condition: e.target.value }))} /></div>
        <div className="field"><label>Lokasi Ambil</label><input className="input" placeholder="Gedung A Vokasi UNAIR" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
        <div className="field"><label>Lingkup Akses (R-03)</label><select className="select" value={form.scope} onChange={e => setForm(f => ({ ...f, scope: e.target.value as Scope }))}><option value="SCOPE_CLUSTER">Klaster Terdekat</option><option value="SCOPE_CAMPUS">1 Kampus</option><option value="SCOPE_INTERNAL">Khusus Internal</option></select></div>
        <div className="field"><label>Lampiran (pisahkan koma)</label><input className="input" placeholder="Dual Nozzle, Kabel 1.5m" value={form.completeness} onChange={e => setForm(f => ({ ...f, completeness: e.target.value }))} /></div>
      </div>
      <div className="row" style={{ gap: 8, marginTop: 4 }}>
        <button className="btn btn-primary btn-sm" onClick={save}><Upload size={12} /> {editId ? 'Simpan Perubahan' : 'Upload Barang'}</button>
        <button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>Batal</button>
      </div>
      <div className="caption" style={{ marginTop: 8 }}>Listing barang pribadi 100% gratis. Foto contoh otomatis (prototype).</div>
    </div>}
    {/* Permintaan Masuk (UC-09) */}
    <div className="h4" style={{ marginBottom: 10 }}>Permintaan Masuk {requests.length > 0 && <span className="badge-warn" style={{ marginLeft: 6 }}>{requests.length} menunggu</span>}</div>
    <div className="stack" style={{ marginBottom: 20 }}>
      {requests.map(b => { const eq = equipment.find(e => e.id === b.equipmentId); return (
        <div key={b.id} className="card" style={{ borderColor: 'var(--azure-200)', background: 'var(--surface-tint)' }}>
          <div className="between wrap">
            <div className="row" style={{ gap: 12 }}>
              <img className="sq" src={eq?.img} alt="" />
              <div>
                <div style={{ fontWeight: 400, fontSize: 14 }}>{eq?.name}</div>
                <div className="caption">{fmtDate(b.startDate)}–{fmtDate(b.endDate)} · {b.days} hari</div>
              </div>
            </div>
            <div className="row" style={{ gap: 8 }}>
              <button className="btn btn-primary btn-sm" onClick={() => { setBookingStatus(b.id, 'LOCKED_AWAITING_PAY'); notify('Disetujui. Tanggal terkunci, peminjam lanjut bayar.'); }}><Check size={12} /> Setujui & Kunci</button>
              <button className="btn btn-ghost btn-sm" onClick={() => { setBookingStatus(b.id, 'DISPUTED'); notify('Permintaan ditolak. Peminjam diberi notifikasi.'); }}><X size={12} /> Tolak</button>
            </div>
          </div>
        </div>
      ); })}
      {!requests.length && <div className="card-sm caption" style={{ textAlign: 'center' }}>Tidak ada permintaan masuk saat ini.</div>}
    </div>

    <div className="h4" style={{ marginBottom: 10 }}>Barang Terdaftar ({mine.length})</div>
    <div className="grid g3">
      {mine.map(e => <div key={e.id} className="eq-card">
        <img className="eq-img" src={e.img} alt={e.name} />
        <div className="eq-body">
          <div className="eq-title">{e.name}</div>
          <div className="row wrap" style={{ gap: 4 }}><span className="chip-light">{e.category}</span><span className="chip-light">Kondisi {e.condition}%</span></div>
          <div className="between">
            <div><span className="price" style={{ fontSize: 15 }}>{e.dailyRate === 0 ? 'Gratis' : fmtRp(e.dailyRate)}</span> <span className="price-muted">/hari</span></div>
            <div className="row" style={{ gap: 4 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => openEdit(e)}><Pencil size={12} /> Edit</button>
              <button className="btn btn-ghost btn-sm" onClick={() => { if (confirm(`Hapus ${e.name}?`)) deleteEquipment(e.id); }}><Trash2 size={12} /></button>
            </div>
          </div>
        </div>
      </div>)}
      {!mine.length && <div className="empty">Belum ada barang. Upload barang pribadi pertamamu, 100% gratis.</div>}
    </div>
  </DashboardLayout>;
}