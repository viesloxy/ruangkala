import { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Camera, Check, Clock, Upload, GraduationCap, Building2, MapPin, AlertCircle } from 'lucide-react';

export function ProfilView() {
  const { user, role, verifyDoc, setVerifyDoc, notify } = useApp();
  const [name, setName] = useState(user.name);
  const docName = role === 'ORMAWA' ? 'SK Ormawa' : 'KTM';
  const isAdmin = role === 'ADMIN';
  const badge = verifyDoc === 'VERIFIED' ? { cls: 'badge-ok', t: 'Terverifikasi', icon: Check }
    : verifyDoc === 'PENDING' ? { cls: 'badge-warn', t: 'Menunggu Verifikasi', icon: Clock }
    : { cls: 'badge-danger', t: 'Belum Diunggah', icon: AlertCircle };
  const BadgeIcon = badge.icon;

  return <DashboardLayout nav="profil">
    <div className="page-title">Profil & Verifikasi</div>
    <div className="page-sub">Status akun, verifikasi identitas, dan data profil {user.roleLabel}.</div>

    <div className="grid g2" style={{ marginBottom: 20 }}>
      {/* Kartu identitas */}
      <div className="card" style={{ textAlign: 'center' }}>
        <img className="avatar" src={user.avatar} alt="" style={{ width: 78, height: 78, margin: '0 auto 10px' }} />
        <div className="h4">{user.name}</div>
        <div className="caption mono" style={{ marginBottom: 10 }}>{user.nim}</div>
        <div className="row wrap" style={{ justifyContent: 'center', gap: 6, marginBottom: 10 }}>
          {isAdmin ? <span className="badge-ok"><ShieldCheck size={11} /> {user.roleLabel}</span>
            : <span className={badge.cls}><BadgeIcon size={11} /> {docName} {badge.t}</span>}
          <span className="chip-light">{user.roleLabel}</span>
        </div>
        <div className="row" style={{ justifyContent: 'center', gap: 8, marginBottom: 10 }}>
          <span className="chip-light"><MapPin size={11} /> {user.kampus}</span>
        </div>
        <div className="divider" />
        <div className="row" style={{ justifyContent: 'center', gap: 20 }}>
          <div><div className="price" style={{ fontSize: 16 }}>★ {user.reputation}</div><div className="caption">Reputasi</div></div>
          {role === 'MAHASISWA' ? <div><div className="price" style={{ fontSize: 16 }}>{user.quota}/3</div><div className="caption">Kuota Gratis</div></div>
            : <div><div className="price" style={{ fontSize: 16 }}>{role === 'ORMAWA' ? 'Ormawa' : 'Admin'}</div><div className="caption">Peran</div></div>}
        </div>
      </div>

      {/* Data diri */}
      <div className="card">
        <div className="h4" style={{ marginBottom: 12 }}>Data Diri</div>
        <div className="stack">
          <div className="field"><label>Nama Lengkap</label><input className="input" value={name} onChange={e => setName(e.target.value)} /></div>
          <div className="row" style={{ gap: 8 }}>
            <div className="field" style={{ flex: 1 }}><label>{role === 'ORMAWA' ? 'NIM Penanggung Jawab' : 'NIM'}</label><input className="input mono" defaultValue={user.nim} disabled style={{ background: 'var(--surface-subtle)' }} /></div>
            <div className="field" style={{ flex: 1 }}><label>{role === 'ORMAWA' ? 'Kampus Asal' : 'Kampus'}</label><input className="input" defaultValue={user.kampus} disabled style={{ background: 'var(--surface-subtle)' }} /></div>
          </div>
          <div className="field"><label>{role === 'ORMAWA' ? 'Bidang / Jabatan' : 'Program Studi'}</label><input className="input" defaultValue={user.prodi} disabled style={{ background: 'var(--surface-subtle)' }} /></div>
          <button className="btn btn-primary" onClick={() => notify('Profil tersimpan.')}>Simpan Perubahan</button>
        </div>
      </div>
    </div>

    {/* Verifikasi dokumen */}
    {isAdmin ? <div className="card">
      <div className="row" style={{ gap: 12 }}>
        <ShieldCheck size={22} color="var(--brand)" />
        <div><div className="h4" style={{ fontSize: 14 }}>Akun Admin Platform</div>
          <div className="caption">Admin tidak memerlukan verifikasi KTM/SK. Akses penuh moderasi platform.</div></div>
      </div>
    </div> : <div className="card">
      <div className="between wrap" style={{ marginBottom: 12 }}>
        <div className="row" style={{ gap: 10 }}>
          {role === 'ORMAWA' ? <Building2 size={20} color="var(--brand)" /> : <GraduationCap size={20} color="var(--brand)" />}
          <div><div className="h4" style={{ fontSize: 14 }}>Verifikasi {docName}</div>
            <div className="caption">{role === 'ORMAWA' ? 'Unggah SK organisasi untuk verifikasi akun Ormawa.' : 'Unggah foto KTM untuk verifikasi identitas mahasiswa.'}</div></div>
        </div>
        <span className={badge.cls}><BadgeIcon size={11} /> {badge.t}</span>
      </div>

      <div className="grid g2" style={{ marginBottom: 14 }}>
        {/* Preview dokumen */}
        <div style={{ border: '1px solid #D6E9FF', borderRadius: 16, background: '#F8FBFF', padding: 16, textAlign: 'center' }}>
          {verifyDoc !== 'NONE' ? <img src="https://picsum.photos/seed/rk-ktm/600/380" alt={docName} style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 10 }} />
            : <><Camera size={36} color="var(--brand)" style={{ margin: '24px auto 8px' }} /><div className="caption">Belum ada dokumen terunggah</div></>}
        </div>
        {/* Langkah */}
        <div className="stack" style={{ gap: 10, justifyContent: 'center' }}>
          {[
            { t: `Unggah ${docName}`, done: verifyDoc !== 'NONE' },
            { t: 'Dicocokkan oleh Admin', done: verifyDoc === 'VERIFIED' },
            { t: 'Akun terverifikasi', done: verifyDoc === 'VERIFIED' },
          ].map((s, i) => <div key={i} className="row" style={{ gap: 10 }}>
            <span className={`step-dot ${s.done ? 'done' : ''}`} style={{ width: 26, height: 26 }}>{s.done ? <Check size={13} /> : i + 1}</span>
            <span style={{ fontSize: 13.5, color: s.done ? 'var(--ink)' : 'var(--muted)' }}>{s.t}</span>
          </div>)}
        </div>
      </div>

      <div className="row wrap" style={{ gap: 8 }}>
        {verifyDoc !== 'PENDING' && <button className="btn btn-primary btn-sm" onClick={() => { setVerifyDoc('PENDING'); notify(`${docName} diunggah. Menunggu verifikasi Admin.`); }}>
          <Upload size={13} /> {verifyDoc === 'VERIFIED' ? 'Perbarui' : 'Unggah'} {docName}
        </button>}
        {verifyDoc === 'PENDING' && <>
          <button className="btn btn-primary btn-sm" onClick={() => { setVerifyDoc('VERIFIED'); notify(`Verifikasi ${docName} disetujui (simulasi Admin).`); }}><Check size={13} /> Simulasi Admin Setujui</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setVerifyDoc('NONE'); notify('Unggahan dibatalkan.'); }}>Batalkan</button>
        </>}
      </div>
      {verifyDoc === 'PENDING' && <div className="caption" style={{ marginTop: 10 }}>Dokumen sedang ditinjau Admin. Setelah disetujui, badge berubah menjadi "Terverifikasi".</div>}
    </div>}
  </DashboardLayout>;
}