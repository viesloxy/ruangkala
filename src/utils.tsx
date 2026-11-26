export const fmtRp = (n: number) => 'Rp ' + n.toLocaleString('id-ID');
export const fmtDate = (iso: string) => { const d = new Date(iso + 'T00:00:00'); return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }); };
export const scopeLabel = (s: string) => s === 'SCOPE_INTERNAL' ? 'Khusus Internal' : s === 'SCOPE_CAMPUS' ? 'Satu Kampus' : 'Klaster Terdekat';
export const scopeChipLabel = (s: string) => s === 'SCOPE_INTERNAL' ? 'Internal Ormawa' : s === 'SCOPE_CAMPUS' ? '1 Kampus' : 'Klaster';
export const statusLabel: Record<string, string> = {
  PENDING_OWNER: 'Menunggu Pemilik',
  LOCKED_AWAITING_PAY: 'Menunggu Persetujuan',
  CONFIRMED_READY: 'Siap Diambil',
  ON_LOAN: 'Sedang Dipinjam',
  COMPLETED: 'Selesai',
  DISPUTED: 'Sengketa',
};
export const sourceLabel: Record<string, string> = {
  PERSONAL_PANITIA: 'Bawa Pribadi',
  ORMAWA_FREE: 'Inventaris Gratis',
  CATALOG_RENT: 'Sewa Katalog',
  BUY_NEW: 'Beli Baru',
};
export function StatusBadge({ s }: { s: string }) {
  const cls = s === 'COMPLETED' || s === 'CONFIRMED_READY' ? 'badge-ok' : s === 'DISPUTED' ? 'badge-danger' : 'badge-warn';
  return <span className={cls}>{statusLabel[s] || s}</span>;
}