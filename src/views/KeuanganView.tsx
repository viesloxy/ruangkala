import { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { fmtRp, fmtDate } from '../utils';
import { Wallet, TrendingUp, TrendingDown, Plus, Download, Receipt, Users, Package } from 'lucide-react';

const sourceLabel: Record<string, string> = {
  TRANSACTION_FEE: 'Biaya Transaksi',
  ORMAWA_SUBSCRIPTION: 'Langganan Ormawa',
  PROKER_PACKAGE: 'Paket Proker',
};

export function KeuanganView() {
  const { ledger, expenses, addExpense, notify } = useApp();
  const [showExpense, setShowExpense] = useState(false);
  const [fLabel, setFLabel] = useState('');
  const [fCat, setFCat] = useState('Hosting');
  const [fAmt, setFAmt] = useState('');

  const paid = ledger.filter(l => l.status === 'PAID');
  const pending = ledger.filter(l => l.status === 'PENDING');
  const income = paid.reduce((s, l) => s + l.amount, 0);
  const pendingAmt = pending.reduce((s, l) => s + l.amount, 0);
  const cost = expenses.reduce((s, e) => s + e.amount, 0);
  const profit = income - cost;

  const bySource = (src: string) => paid.filter(l => l.source === src).reduce((s, l) => s + l.amount, 0);
  const txCount = paid.filter(l => l.source === 'TRANSACTION_FEE').length;
  const subCount = paid.filter(l => l.source === 'ORMAWA_SUBSCRIPTION').length;
  const prokerCount = paid.filter(l => l.source === 'PROKER_PACKAGE').length;

  const saveExpense = () => {
    const amt = parseInt(fAmt, 10);
    if (!fLabel.trim() || !amt || amt <= 0) { notify('Isi nama & nominal biaya dengan benar.'); return; }
    addExpense({ date: new Date().toISOString().slice(0, 10), label: fLabel.trim(), category: fCat, amount: amt });
    setFLabel(''); setFAmt(''); setShowExpense(false);
  };

  const downloadReport = () => {
    const rows = [
      ['RUANGKALA · LAPORAN KEUANGAN', ''],
      ['Ringkasan', 'Nominal'],
      ['Pendapatan (PAID)', String(income)],
      ['Menunggu (PENDING)', String(pendingAmt)],
      ['Total Biaya Operasional', String(cost)],
      ['Laba Bersih', String(profit)],
      ['', ''],
      ['Ledger Pemasukan', ''],
      ...ledger.map(l => [l.date + ' · ' + l.label, l.status === 'PAID' ? String(l.amount) : 'PENDING']),
      ['', ''],
      ['Biaya Operasional', ''],
      ...expenses.map(e => [e.date + ' · ' + e.label, String(e.amount)]),
    ];
    const csv = rows.map(r => r.map(c => '"' + c.replace(/"/g, '""') + '"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Laporan-Keuangan-RuangKala.csv'; a.click();
    URL.revokeObjectURL(url);
    notify('Laporan keuangan diunduh (CSV).');
  };

  return <DashboardLayout nav="keuangan">
    <div className="between wrap" style={{ marginBottom: 20 }}>
      <div><div className="page-title">Keuangan Platform</div><div className="page-sub">Pendapatan, biaya operasional, dan laba bersih RuangKala.</div></div>
      <div className="row" style={{ gap: 8 }}>
        <button className="btn btn-ghost" onClick={downloadReport}><Download size={14} /> Unduh Laporan</button>
        <button className="btn btn-primary" onClick={() => setShowExpense(s => !s)}><Plus size={14} /> Catat Biaya</button>
      </div>
    </div>

    {/* Ringkasan 3 kartu */}
    <div className="grid g3" style={{ marginBottom: 20 }}>
      <div className="card">
        <div className="row between"><TrendingUp size={18} color="var(--ok)" /><span className="caption">Total Pendapatan</span></div>
        <div className="price" style={{ marginTop: 8 }}>{fmtRp(income)}</div>
        <div className="caption">{txCount} trx · {subCount} langganan · {prokerCount} proker</div>
      </div>
      <div className="card">
        <div className="row between"><TrendingDown size={18} color="var(--warn)" /><span className="caption">Biaya Operasional</span></div>
        <div className="price" style={{ marginTop: 8 }}>{fmtRp(cost)}</div>
        <div className="caption">Hosting, domain, notifikasi</div>
      </div>
      <div className="card" style={{ borderColor: profit >= 0 ? 'var(--ok)' : 'var(--danger)', background: profit >= 0 ? 'var(--surface-tint)' : '#fff' }}>
        <div className="row between"><Wallet size={18} color={profit >= 0 ? 'var(--ok)' : 'var(--danger)'} /><span className="caption">Laba Bersih</span></div>
        <div className="price" style={{ marginTop: 8, color: profit >= 0 ? 'var(--ok)' : 'var(--danger)' }}>{fmtRp(profit)}</div>
        <div className="caption">{pendingAmt > 0 ? `+ ${fmtRp(pendingAmt)} menunggu` : 'Semua lunas'}</div>
      </div>
    </div>

    {/* Rincian 3 sumber pendapatan + BEP */}
    <div className="grid g2" style={{ marginBottom: 20 }}>
      <div className="card">
        <div className="h4" style={{ marginBottom: 12 }}>3 Sumber Pendapatan</div>
        {[
          { k: 'TRANSACTION_FEE', icon: Receipt, n: `${txCount} transaksi × Rp1.000` },
          { k: 'ORMAWA_SUBSCRIPTION', icon: Users, n: `${subCount} Ormawa × Rp99.000/sem` },
          { k: 'PROKER_PACKAGE', icon: Package, n: `${prokerCount} proker × Rp25.000` },
        ].map(r => (
          <div key={r.k} className="between" style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
            <div className="row" style={{ gap: 10 }}><r.icon size={16} color="var(--brand)" /><div><div style={{ fontSize: 13.5 }}>{sourceLabel[r.k]}</div><div className="caption">{r.n}</div></div></div>
            <div className="price" style={{ fontSize: 15 }}>{fmtRp(bySource(r.k))}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="h4" style={{ marginBottom: 12 }}>Proyeksi BEP (Break-Even Point)</div>
        <div className="caption" style={{ marginBottom: 12 }}>Biaya tetap ~Rp500.000/semester. Cukup 12 dari 20 Ormawa berlangganan untuk BEP.</div>
        {[
          { t: 'Langganan Saja', d: '12/20 ormawa × Rp99rb', l: 'Rp688.000/sem', ok: true },
          { t: 'Transaksi Saja', d: '60 trx/bln × Rp1.000', l: '-Rp140.000 (Rugi)', ok: false },
          { t: 'Hybrid (Rekomendasi)', d: '12 langganan + 30 trx/bln', l: 'Rp868.000/sem', ok: true },
        ].map(b => (
          <div key={b.t} className="between" style={{ padding: '8px 0' }}>
            <div><div style={{ fontSize: 13 }}>{b.t}</div><div className="caption">{b.d}</div></div>
            <span className={b.ok ? 'badge-ok' : 'badge-danger'}>{b.l}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Form catat biaya */}
    {showExpense && <div className="card" style={{ marginBottom: 20, borderColor: 'var(--azure-200)' }}>
      <div className="h4" style={{ marginBottom: 12 }}>Catat Biaya Operasional</div>
      <div className="grid g3">
        <div className="field"><label>Nama Biaya</label><input className="input" placeholder="Hosting Vercel bulan Des" value={fLabel} onChange={e => setFLabel(e.target.value)} /></div>
        <div className="field"><label>Kategori</label><select className="select" value={fCat} onChange={e => setFCat(e.target.value)}>{['Hosting', 'Domain', 'Notifikasi', 'Lainnya'].map(c => <option key={c}>{c}</option>)}</select></div>
        <div className="field"><label>Nominal (Rp)</label><input className="input" type="number" placeholder="50000" value={fAmt} onChange={e => setFAmt(e.target.value)} /></div>
      </div>
      <div className="row" style={{ gap: 8, marginTop: 4 }}>
        <button className="btn btn-primary btn-sm" onClick={saveExpense}>Simpan Biaya</button>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowExpense(false)}>Batal</button>
      </div>
    </div>}

    {/* Tabel ledger */}
    <div className="h4" style={{ marginBottom: 10 }}>Ledger Pemasukan ({ledger.length})</div>
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ textAlign: 'left', background: 'var(--surface-subtle)' }}>
            <th style={{ padding: '10px 14px', fontWeight: 400 }}>Tanggal</th>
            <th style={{ padding: '10px 14px', fontWeight: 400 }}>Sumber</th>
            <th style={{ padding: '10px 14px', fontWeight: 400 }}>Keterangan</th>
            <th style={{ padding: '10px 14px', fontWeight: 400, textAlign: 'right' }}>Nominal</th>
            <th style={{ padding: '10px 14px', fontWeight: 400 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {ledger.map(l => (
            <tr key={l.id} style={{ borderTop: '1px solid var(--border)' }}>
              <td style={{ padding: '10px 14px' }} className="mono">{fmtDate(l.date)}</td>
              <td style={{ padding: '10px 14px' }}>{sourceLabel[l.source]}</td>
              <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{l.label}</td>
              <td style={{ padding: '10px 14px', textAlign: 'right' }} className="mono">{fmtRp(l.amount)}</td>
              <td style={{ padding: '10px 14px' }}><span className={l.status === 'PAID' ? 'badge-ok' : 'badge-warn'}>{l.status === 'PAID' ? 'Lunas' : 'Menunggu'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </DashboardLayout>;
}