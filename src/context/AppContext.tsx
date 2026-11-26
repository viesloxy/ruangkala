import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Booking, Equipment, Handover, Role, SpsItem, User, LedgerEntry, Expense, Campus } from '../types';
import { equipment as eq0, users } from '../data/mockData';
import { CAMPUSES } from '../data/universities';
import { initialBookings, initialHandovers, initialSps, initialLedger, initialExpenses } from '../data/mockData';

interface Ctx {
  role: Role;
  loginAs: (r: Role) => void;
  logout: () => void;
  user: User;
  users: User[];
  campuses: Campus[];
  kampus: string;
  setKampus: (k: string) => void;
  cluster: string;
  setCluster: (c: string) => void;
  clusterOn: boolean;
  toggleCluster: () => void;
  equipment: Equipment[];
  bookings: Booking[];
  sps: SpsItem[];
  handovers: Handover[];
  ledger: LedgerEntry[];
  expenses: Expense[];
  subPlan: 'TRIAL' | 'PROKER' | 'SEMESTER';
  subStatus: 'NONE' | 'ACTIVE';
  paidBookings: string[];
  payBooking: (bookingId: string) => void;
  buyPlan: (plan: 'TRIAL' | 'PROKER' | 'SEMESTER') => void;
  setBookingStatus: (bookingId: string, status: Booking['status']) => void;
  verifyDoc: 'VERIFIED' | 'PENDING' | 'NONE';
  setVerifyDoc: (s: 'VERIFIED' | 'PENDING' | 'NONE') => void;
  resetDemo: () => void;
  addEquipment: (e: Omit<Equipment, 'id' | 'ownerName' | 'ownerNim' | 'ownerOrg' | 'lockedDates'>) => void;
  updateEquipment: (id: string, patch: Partial<Equipment>) => void;
  deleteEquipment: (id: string) => void;
  addExpense: (e: Omit<Expense, 'id'>) => void;
  verifyAccount: (nim: string, ok: boolean) => void;
  verifyQueue: { nim: string; name: string; type: string; img: string }[];
  addCampus: (name: string, cluster: string) => void;
  resolveDispute: (bookingId: string, blacklist: boolean) => void;
  book: (equipmentId: string, start: string, end: string) => { ok: boolean; msg: string; id?: string };
  approve: (bookingId: string, role: string, ok: boolean, notes?: string) => void;
  toggleSps: (id: string) => void;
  addSps: (i: Omit<SpsItem, 'id'>) => void;
  toggleScope: (id: string) => void;
  toggleHandover: (bookingId: string, field: 'checkoutPhoto' | 'checkinPhoto' | 'completenessOk') => void;
  rate: (bookingId: string, r: number) => void;
  dispute: (bookingId: string) => void;
  toast: string;
  notify: (m: string) => void;
}

const C = createContext<Ctx | null>(null);

function daysBetween(s: string, e: string) {
  const a = new Date(s).getTime(), b = new Date(e).getTime();
  return isNaN(a) || isNaN(b) || b < a ? 0 : Math.round((b - a) / 864e5) + 1;
}

const LS_KEY = 'ruangkala-demo-v1';
function loadState<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return fallback;
    const obj = JSON.parse(raw);
    return (obj[key] as T) ?? fallback;
  } catch { return fallback; }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('GUEST');
  const [kampus, setKampusRaw] = useState('UNAIR');
  const [cluster, setCluster] = useState('Surabaya & Sekitarnya');
  const [clusterOn, setClusterOn] = useState(true);
  const [equipment, setEquipment] = useState<Equipment[]>(() => loadState('equipment', eq0));
  const [bookings, setBookings] = useState<Booking[]>(() => loadState('bookings', initialBookings));
  const [sps, setSps] = useState<SpsItem[]>(() => loadState('sps', initialSps));
  const [handovers, setHandovers] = useState<Handover[]>(() => loadState('handovers', initialHandovers));
  const [ledger, setLedger] = useState<LedgerEntry[]>(() => loadState('ledger', initialLedger));
  const [expenses, setExpenses] = useState<Expense[]>(() => loadState('expenses', initialExpenses));
  const [campuses, setCampuses] = useState<Campus[]>(CAMPUSES);
  const [verifyQueue, setVerifyQueue] = useState(() => loadState('verifyQueue', [
    { nim: '434241068', name: 'Naisya Gina', type: 'KTM Mahasiswa', img: 'https://picsum.photos/seed/rk-ktm-1/600/400' },
    { nim: 'SK-2026-011', name: 'Hima D3 TI', type: 'SK Ormawa', img: 'https://picsum.photos/seed/rk-ktm-2/600/400' },
    { nim: '434241200', name: 'Rian Hermawan', type: 'KTM Mahasiswa', img: 'https://picsum.photos/seed/rk-ktm-3/600/400' },
  ]));
  const [toast, setToast] = useState('');
  const [subPlan, setSubPlan] = useState<'TRIAL' | 'PROKER' | 'SEMESTER'>(() => loadState('subPlan', 'TRIAL'));
  const [subStatus, setSubStatus] = useState<'NONE' | 'ACTIVE'>(() => loadState('subStatus', 'NONE'));
  const [paidBookings, setPaidBookings] = useState<string[]>(() => loadState('paidBookings', []));
  const [verifyDoc, setVerifyDoc] = useState<'VERIFIED' | 'PENDING' | 'NONE'>(() => loadState('verifyDoc', 'VERIFIED'));

  // Persist ke localStorage tiap perubahan
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ equipment, bookings, sps, handovers, ledger, expenses, verifyQueue, subPlan, subStatus, paidBookings, verifyDoc }));
    } catch { /* ignore quota */ }
  }, [equipment, bookings, sps, handovers, ledger, expenses, verifyQueue, subPlan, subStatus, paidBookings, verifyDoc]);

  const user = users.find(u => u.role === role) || users[0];
  const notify = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2600); };
  const loginAs = (r: Role) => { setRole(r); notify(`Masuk sebagai ${users.find(u => u.role === r)?.roleLabel}`); };
  const logout = () => setRole('GUEST');
  // Pilih kampus + sinkronkan klaster wilayahnya
  const setKampus = (k: string) => {
    setKampusRaw(k);
    const c = campuses.find(x => x.name === k) || CAMPUSES.find(x => x.name === k);
    if (c) setCluster(c.cluster);
  };

  const book = (equipmentId: string, start: string, end: string): { ok: boolean; msg: string; id?: string } => {
    const eq = equipment.find(e => e.id === equipmentId);
    if (!eq) return { ok: false, msg: 'Barang tidak ditemukan.' };
    if (role === 'GUEST') return { ok: false, msg: 'Masuk dulu untuk mengajukan pinjam.' };
    const days = daysBetween(start, end);
    if (days <= 0 || days > 3) return { ok: false, msg: 'Pilih rentang 1–3 hari.' };
    const range = Array.from({ length: days }, (_, i) => { const x = new Date(start); x.setDate(x.getDate() + i); return x.toISOString().slice(0, 10); });
    if (range.some(r => eq.lockedDates.includes(r))) return { ok: false, msg: 'Tanggal bentrok: sebagian slot sudah terkunci. (Klik "Reset Data Demo" di sidebar untuk mengulang.)' };
    if (eq.scope === 'SCOPE_INTERNAL') return { ok: false, msg: `Khusus Internal ${eq.ownerOrg} (R-03).` };
    const fee = user.quota > 0 ? 0 : 1000;
    const code = `RK-2026-${String(100 + bookings.length + 1).padStart(3, '0')}`;
    const b: Booking = {
      id: `b-${Date.now()}`, code, equipmentId, borrowerId: user.id,
      startDate: start, endDate: end, days,
      rentalCost: eq.dailyRate * days, platformFee: fee, total: eq.dailyRate * days + fee,
      status: 'PENDING_OWNER',
      approvals: [
        { role: 'Ketua Pelaksana', status: 'PENDING' },
        { role: 'Bendahara', status: 'PENDING' },
        { role: 'BPI', status: 'PENDING' },
        { role: 'SC', status: 'PENDING' },
      ],
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setBookings(p => [b, ...p]);
    setEquipment(p => p.map(e => e.id === equipmentId ? { ...e, lockedDates: Array.from(new Set([...e.lockedDates, ...range])).sort() } : e));
    setHandovers(p => [...p, { id: `h-${Date.now()}`, bookingId: b.id, checkoutPhoto: false, checkinPhoto: false, completenessOk: false, rating: 0, disputed: false }]);
    if (fee > 0) setLedger(p => [{ id: `l-${Date.now()}`, date: new Date().toISOString().slice(0, 10), source: 'TRANSACTION_FEE', label: `Biaya layanan ${code}`, amount: fee, status: 'PENDING' }, ...p]);
    return { ok: true, msg: `Pengajuan ${code} terkirim. Menunggu persetujuan pemilik.`, id: b.id };
  };

  const setBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(p => p.map(b => b.id === bookingId ? { ...b, status } : b));
  };

  const approve = (bookingId: string, r: string, ok: boolean, notes?: string) => {
    setBookings(p => p.map(b => b.id !== bookingId ? b : {
      ...b,
      approvals: b.approvals.map(a => a.role === r ? { ...a, status: ok ? 'APPROVED' : 'REVISION', name: user.name, time: new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), notes } : a),
    }));
    notify(ok ? 'Tahap disetujui.' : 'Revisi diminta.');
  };

  const toggleSps = (id: string) => setSps(p => p.map(s => s.id === id ? { ...s, fulfilled: !s.fulfilled } : s));
  const addSps = (i: Omit<SpsItem, 'id'>) => setSps(p => [...p, { ...i, id: `s-${Date.now()}` }]);
  const toggleScope = (id: string) => { setEquipment(p => p.map(e => e.id === id ? { ...e, scope: e.scope === 'SCOPE_INTERNAL' ? 'SCOPE_CAMPUS' : 'SCOPE_INTERNAL' } : e)); notify('Lingkup akses diubah.'); };
  const toggleHandover = (bookingId: string, field: 'checkoutPhoto' | 'checkinPhoto' | 'completenessOk') => setHandovers(p => p.map(h => h.bookingId === bookingId ? { ...h, [field]: !h[field] } : h));
  const rate = (bookingId: string, r: number) => setHandovers(p => p.map(h => h.bookingId === bookingId ? { ...h, rating: r } : h));
  const dispute = (bookingId: string) => { setBookings(p => p.map(b => b.id === bookingId ? { ...b, status: 'DISPUTED' } : b)); setHandovers(p => p.map(h => h.bookingId === bookingId ? { ...h, disputed: true } : h)); notify('Sengketa dilaporkan ke Admin.'); };

  const addEquipment = (e: Omit<Equipment, 'id' | 'ownerName' | 'ownerNim' | 'ownerOrg' | 'lockedDates'>) => {
    setEquipment(p => [{ ...e, id: `e-${Date.now()}`, ownerName: user.name, ownerNim: user.nim, ownerOrg: 'Pribadi', lockedDates: [] }, ...p]);
    notify('Barang berhasil diupload. Gratis 100%.');
  };
  const updateEquipment = (id: string, patch: Partial<Equipment>) => { setEquipment(p => p.map(e => e.id === id ? { ...e, ...patch } : e)); notify('Perubahan barang disimpan.'); };
  const deleteEquipment = (id: string) => { setEquipment(p => p.filter(e => e.id !== id)); notify('Barang dihapus dari katalog.'); };
  const addExpense = (e: Omit<Expense, 'id'>) => { setExpenses(p => [{ ...e, id: `x-${Date.now()}` }, ...p]); notify('Biaya operasional dicatat.'); };
  const verifyAccount = (nim: string, ok: boolean) => { setVerifyQueue(p => p.filter(q => q.nim !== nim)); notify(ok ? `Akun ${nim} diverifikasi.` : `Akun ${nim} ditolak. Minta unggah ulang.`); };
  const addCampus = (name: string, cluster: string) => { setCampuses(p => [...p, { id: `c-${Date.now()}`, name, cluster }]); notify(`Kampus ${name} ditambahkan.`); };
  const resolveDispute = (bookingId: string, blacklist: boolean) => { setBookings(p => p.map(b => b.id === bookingId ? { ...b, status: blacklist ? 'DISPUTED' : 'COMPLETED' } : b)); setHandovers(p => p.map(h => h.bookingId === bookingId ? { ...h, disputed: blacklist } : h)); notify(blacklist ? 'NIM di-blacklist dari seluruh kampus.' : 'Sengketa diselesaikan. Ganti rugi terkonfirmasi.'); };

  const payBooking = (bookingId: string) => {
    const b = bookings.find(x => x.id === bookingId);
    if (!b) return;
    setPaidBookings(p => [...p, bookingId]);
    setBookings(p => p.map(x => x.id === bookingId ? { ...x, status: 'CONFIRMED_READY' } : x));
    if (b.platformFee > 0) setLedger(p => p.map(l => l.label.includes(b.code) && l.status === 'PENDING' ? { ...l, status: 'PAID' } : l));
    notify('Pembayaran berhasil. Tiket serah-terima terbit.');
  };
  const buyPlan = (plan: 'TRIAL' | 'PROKER' | 'SEMESTER') => {
    setSubPlan(plan); setSubStatus('ACTIVE');
    const amount = plan === 'SEMESTER' ? 99000 : plan === 'PROKER' ? 25000 : 0;
    if (amount > 0) setLedger(p => [{ id: `l-${Date.now()}`, date: new Date().toISOString().slice(0, 10), source: plan === 'SEMESTER' ? 'ORMAWA_SUBSCRIPTION' : 'PROKER_PACKAGE', label: plan === 'SEMESTER' ? 'Langganan Ormawa (Semester)' : 'Paket Proker', amount, status: 'PAID' }, ...p]);
    notify(plan === 'TRIAL' ? 'Trial 1 acara gratis aktif.' : plan === 'SEMESTER' ? 'Langganan semester aktif. Rp99.000.' : 'Paket proker aktif. Rp25.000.');
  };

  const resetDemo = () => {
    setEquipment(eq0); setBookings(initialBookings); setSps(initialSps); setHandovers(initialHandovers);
    setLedger(initialLedger); setExpenses(initialExpenses); setCampuses(CAMPUSES); setCluster('Surabaya & Sekitarnya'); setKampusRaw('UNAIR');
    setVerifyQueue([
      { nim: '434241068', name: 'Naisya Gina', type: 'KTM Mahasiswa', img: 'https://picsum.photos/seed/rk-ktm-1/600/400' },
      { nim: 'SK-2026-011', name: 'Hima D3 TI', type: 'SK Ormawa', img: 'https://picsum.photos/seed/rk-ktm-2/600/400' },
      { nim: '434241200', name: 'Rian Hermawan', type: 'KTM Mahasiswa', img: 'https://picsum.photos/seed/rk-ktm-3/600/400' },
    ]);
    setSubPlan('TRIAL'); setSubStatus('NONE'); setPaidBookings([]); setVerifyDoc('VERIFIED');
    notify('Data demo direset ke kondisi awal.');
  };

  const val = useMemo<Ctx>(() => ({ role, loginAs, logout, user, users, campuses, kampus, setKampus, cluster, setCluster, clusterOn, toggleCluster: () => setClusterOn(c => !c), equipment, bookings, sps, handovers, ledger, expenses, subPlan, subStatus, paidBookings, addEquipment, updateEquipment, deleteEquipment, addExpense, verifyAccount, verifyQueue, addCampus, resolveDispute, payBooking, buyPlan, book, approve, toggleSps, addSps, toggleScope, toggleHandover, rate, dispute, resetDemo, setBookingStatus, verifyDoc, setVerifyDoc, toast, notify }),
    [role, user, kampus, cluster, clusterOn, equipment, bookings, sps, handovers, ledger, expenses, verifyQueue, subPlan, subStatus, paidBookings, verifyDoc, toast]);
  return <C.Provider value={val}>{children}</C.Provider>;
}

export function useApp() {
  const c = useContext(C);
  if (!c) throw new Error('useApp harus dipakai di dalam AppProvider');
  return c;
}